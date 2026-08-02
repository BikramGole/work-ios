import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const bundledPublic = path.resolve(__dirname, "public");
  const workspacePublic = path.resolve(__dirname, "..", "dist", "public");
  const staticPath = process.env.NODE_ENV === "production"
    ? bundledPublic
    : (await import("node:fs")).existsSync(bundledPublic) ? bundledPublic : workspacePublic;

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (req, res, next) => {
    if (req.path.includes(".")) {
      return next();
    }
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
