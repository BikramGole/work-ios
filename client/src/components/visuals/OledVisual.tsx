import { motion, useReducedMotion } from 'framer-motion';

interface OledVisualProps {
  refreshRate: number;
}

export default function OledVisual({ refreshRate }: OledVisualProps) {
  const reducedMotion = useReducedMotion();
  const cells = 12;
  const rows = 8;
  const cell = 36;
  const spacing = 8;

  return (
    <div className="relative overflow-hidden rounded-lg border border-border/60 bg-background/40 p-4">
      <svg
        viewBox={`0 0 ${cells * (cell + spacing) + spacing} ${rows * (cell + spacing) + spacing}`}
        className="w-full h-auto"
        role="img"
        aria-label="OLED pixel grid simulating self-illuminating sub-pixels with a refresh rate meter"
      >
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cells }).map((_, c) => {
            const x = spacing + c * (cell + spacing);
            const y = spacing + r * (cell + spacing);
            const isLit = (r * 3 + c) % 4 === 0;
            return (
              <motion.rect
                key={`${r}-${c}`}
                x={x}
                y={y}
                width={cell}
                height={cell}
                rx="6"
                fill={isLit ? 'var(--color-primary)' : 'var(--color-card)'}
                stroke="var(--color-border)"
                strokeWidth="1"
                animate={
                  reducedMotion
                    ? { opacity: isLit ? 1 : 0.6 }
                    : {
                        opacity: isLit ? [0.35, 1, 0.35] : [1, 0.6, 1],
                      }
                }
                transition={
                  reducedMotion
                    ? undefined
                    : {
                        duration: isLit ? 60 / refreshRate / 1000 * 2 + 0.5 : 2,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: ((r * cells + c) % 10) * 0.05,
                      }
                }
              />
            );
          })
        )}
      </svg>

      {/* Refresh rate meter */}
      <div className="flex items-center justify-between mt-4 px-2">
        <span className="text-xs text-muted-foreground">Pixel refresh simulation</span>
        <span className="text-xs font-semibold text-primary">{refreshRate}Hz</span>
      </div>
      <div className="h-1.5 bg-secondary rounded mt-1 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          animate={{ width: `${(refreshRate / 120) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
