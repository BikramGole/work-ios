import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { createBrotliCompress, createGzip, constants, type BrotliOptions, type ZlibOptions } from "zlib";
import type { RequestHandler, Request, Response, NextFunction } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPRESSIBLE_TYPES = /^(text\/|application\/(json|javascript|xml|xhtml\+xml|wasm)|font\/|image\/svg\+xml)/;
const MIN_SIZE_BYTES = 1024;

/**
 * Content-negotiated Brotli/Gzip middleware built on Node's zlib (zero deps).
 *
 * Modeled after the `compression` package: res.write/res.end are patched so
 * they force writeHead() before the first body byte. writeHead is patched to
 * run the compression decision *before* headers are actually sent, so
 * Content-Encoding/Length stay consistent even for express.static/sendFile
 * (which otherwise flush headers with Content-Length on their first write).
 */
function compressionMiddleware(): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const accept = req.headers["accept-encoding"] ?? "";
    const encoding: "br" | "gzip" | null = accept.includes("br")
      ? "br"
      : accept.includes("gzip")
        ? "gzip"
        : null;

    if (!encoding || req.method === "HEAD" || req.headers.range) {
      return next();
    }
    const contentEncoding: "br" | "gzip" = encoding;

    const originalWrite = res.write.bind(res);
    const originalEnd = res.end.bind(res);
    let stream: ReturnType<typeof createGzip> | null = null;
    let finalized = false;

    res.setHeader("Vary", "Accept-Encoding");

    function finalize(): void {
      if (finalized) return;
      finalized = true;

      const type = res.getHeader("content-type") as string | undefined;
      const status = res.statusCode;
      const length = Number(res.getHeader("content-length")) || 0;
      const shouldCompress =
        !!type &&
        COMPRESSIBLE_TYPES.test(type) &&
        (length >= MIN_SIZE_BYTES || length === 0) &&
        status !== 204 &&
        status !== 206 &&
        status !== 304;

      if (!shouldCompress) return;

      res.setHeader("Content-Encoding", contentEncoding);
      res.removeHeader("Content-Length");
      stream =
        contentEncoding === "br"
          ? createBrotliCompress({
              params: { [constants.BROTLI_PARAM_QUALITY]: 5 },
            } satisfies BrotliOptions)
          : createGzip({ level: 9 } satisfies ZlibOptions);

      stream.on("error", () => originalEnd());
      // Compressed output goes through the ORIGINAL res.write/end only
      console.error("[trace] stream created, encoding=", contentEncoding);
      stream.on("data", (chunk: Buffer) => {
        const ok = originalWrite(chunk);
        console.error("[trace] data chunk", chunk.length, "wrote", ok);
        if (ok === false) {
          console.error("[trace] pause, waiting drain");
          stream?.pause();
          res.once("drain", () => { console.error("[trace] drain -> resume"); stream?.resume(); });
        }
      });
      stream.on("end", () => { console.error("[trace] stream end -> originalEnd"); originalEnd(); });
    }

    // Fire the compression decision when headers are about to be sent
    const originalWriteHead = res.writeHead.bind(res);
    res.writeHead = ((status: number, ...args: unknown[]) => {
      finalize();
      return (originalWriteHead as unknown as (...a: unknown[]) => void)(status, ...args);
    }) as Response["writeHead"];

    res.write = ((chunk: unknown, ...rest: unknown[]) => {
      if (!res.headersSent) {
        res.writeHead(res.statusCode || 200);
      }
      if (!stream) {
        return originalWrite(chunk as Buffer, ...(rest as []));
      }
      // zlib buffers output until flush/end, so its write() return value
      // (its own highWaterMark) must never pause the caller's source stream,
      // or pipe() would wait for a 'drain' that never fires.
      const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk));
      stream.write(buf, ...(rest as []));
      return true;
    }) as Response["write"];

    res.end = ((chunk?: unknown, ...rest: unknown[]) => {
      if (!res.headersSent) {
        res.writeHead(res.statusCode || 200);
      }
      if (!stream) {
        if (chunk === undefined || chunk === null) {
          return originalEnd();
        }
        return originalEnd(chunk as Buffer, ...(rest as []));
      }
      if (chunk !== undefined && chunk !== null) {
        stream.write(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
      }
      stream.end();
    }) as Response["end"];

    // Premature connection close: stop the compressor instead of leaking it
    res.on("close", () => {
      if (stream && !stream.writableEnded) {
        stream.end();
      }
    });

    next();
  };
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const bundledPublic = path.resolve(__dirname, "public");
  const workspacePublic = path.resolve(__dirname, "..", "dist", "public");
  const staticPath =
    process.env.NODE_ENV === "production"
      ? bundledPublic
      : (await import("node:fs")).existsSync(bundledPublic)
        ? bundledPublic
        : workspacePublic;

  // Hashed assets (e.g. index-abc123.js) are immutable; everything else revalidates.
  const setHeaders = (res: Response, filePath: string) => {
    const basename = path.basename(filePath);
    if (/[.-][A-Za-z0-9_-]{8,}\.(js|css|woff2?|wasm)$/.test(basename)) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    } else if (filePath.endsWith(".glb")) {
      res.setHeader("Cache-Control", "public, max-age=86400");
    } else if (filePath.endsWith("index.html")) {
      res.setHeader("Cache-Control", "no-cache");
    } else {
      res.setHeader("Cache-Control", "public, max-age=3600");
    }
  };

  // Compression must be installed before static serving streams files
  app.use(compressionMiddleware());

  app.use(
    express.static(staticPath, {
      setHeaders,
      fallthrough: true,
    })
  );

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (req, res, next) => {
    if (req.path.includes(".")) {
      return next();
    }
    res.sendFile(path.join(staticPath, "index.html"), {
      headers: { "Cache-Control": "no-cache" },
    });
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
