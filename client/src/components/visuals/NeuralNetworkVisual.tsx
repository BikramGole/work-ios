import { motion } from 'framer-motion';

export default function NeuralNetworkVisual() {
  const layers = [
    { x: 60, count: 4 },
    { x: 200, count: 6 },
    { x: 340, count: 8 },
    { x: 480, count: 6 },
    { x: 620, count: 4 },
  ];

  const yFor = (total: number, i: number, h = 260) => h / 2 - ((total - 1) * 46) / 2 + i * 46;

  return (
    <div className="relative overflow-hidden rounded-lg border border-border/60 bg-background/40 p-4">
      <svg viewBox="0 0 700 300" className="w-full h-auto">
        {/* Connection lines */}
        {layers.slice(0, -1).map((layer, li) =>
          Array.from({ length: layer.count }).map((_, i) =>
            Array.from({ length: layers[li + 1].count }).map((_, j) => (
              <motion.line
                key={`${li}-${i}-${j}`}
                x1={layer.x}
                y1={yFor(layer.count, i)}
                x2={layers[li + 1].x}
                y2={yFor(layers[li + 1].count, j)}
                stroke="currentColor"
                strokeWidth="0.6"
                className="text-primary/15"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.5, 0.1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: (li * 3 + i * 0.6 + j * 0.25) % 3,
                  ease: 'easeInOut',
                }}
              />
            ))
          )
        )}

        {/* Layer nodes */}
        {layers.map((layer, li) =>
          Array.from({ length: layer.count }).map((_, i) => (
            <motion.circle
              key={`${li}-${i}`}
              cx={layer.x}
              cy={yFor(layer.count, i)}
              r="7"
              fill="var(--color-card)"
              stroke={li === 2 && i === 3 ? 'var(--color-accent)' : 'var(--color-primary)'}
              strokeWidth="1.5"
              className={li === 2 && i === 3 ? '' : 'text-primary'}
              initial={{ opacity: 0.4 }}
              animate={{
                opacity: [0.4, 1, 0.4],
                r: li === 2 && i === 3 ? [7, 9, 7] : 7,
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut',
              }}
            />
          ))
        )}

        {/* Pulses flowing along a path */}
        <motion.circle
          r="4"
          fill="var(--color-accent)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M60,130 C130,40 260,40 340,130 C420,220 560,220 620,130"
          />
        </motion.circle>
      </svg>

      <div className="flex items-center justify-between px-4 pb-2 text-xs text-muted-foreground">
        <span>Input layer</span>
        <span className="text-accent font-semibold">Neural Engine · 35 TOPS</span>
        <span>Output</span>
      </div>
    </div>
  );
}
