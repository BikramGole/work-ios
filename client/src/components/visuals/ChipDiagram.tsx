import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

interface ChipBlock {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  desc: string;
}

const BLOCKS: ChipBlock[] = [
  { id: 'cpu', name: 'CPU', x: 40, y: 40, w: 130, h: 90, color: 'var(--color-chart-1)', desc: '6-core (2P + 4E): high-performance & efficiency cores' },
  { id: 'gpu', name: 'GPU', x: 40, y: 150, w: 130, h: 110, color: 'var(--color-chart-2)', desc: '6-core custom GPU with hardware-accelerated ray tracing' },
  { id: 'neural', name: 'Neural Engine', x: 190, y: 40, w: 160, h: 90, color: 'var(--color-accent)', desc: '16-core, 35 TOPS, powers on-device AI' },
  { id: 'isp', name: 'ISP', x: 190, y: 150, w: 160, h: 60, color: 'var(--color-chart-4)', desc: 'Image Signal Processor for computational photography' },
  { id: 'memory', name: 'Memory', x: 190, y: 225, w: 160, h: 35, color: 'var(--color-chart-5)', desc: 'Unified memory, shared high-bandwidth pool' },
  { id: 'secure', name: 'Secure Enclave', x: 370, y: 40, w: 130, h: 90, color: 'var(--color-chart-3)', desc: 'Isolated security processor for biometrics & keys' },
  { id: 'pmic', name: 'PMIC', x: 370, y: 150, w: 130, h: 60, color: 'var(--color-primary)', desc: 'Power Management IC regulates voltage rails' },
  { id: 'io', name: 'I/O & Tiles', x: 370, y: 225, w: 130, h: 35, color: 'var(--color-secondary)', desc: 'Display, camera, and connectivity interface tiles' },
];

export default function ChipDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const active = BLOCKS.find((b) => b.id === hovered);

  return (
    <div className="rounded-lg border border-border/60 bg-background/40 p-4 relative">
      <svg viewBox="0 0 540 290" className="w-full h-auto" role="img" aria-label="A18 Pro chip die layout with selectable components">
        {/* Die substrate */}
        <motion.rect
          x="20"
          y="20"
          width="500"
          height="250"
          rx="16"
          fill="var(--color-card)"
          stroke="var(--color-primary)"
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />

        {/* Data-flow animation around the die */}
        <motion.path
          d="M20,145 L510,145"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeDasharray="8 8"
          fill="none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
        >
          {!reducedMotion && <animateMotion dur="3s" repeatCount="indefinite" path="M20,145 L510,145" />}
        </motion.path>

        {BLOCKS.map((block) => (
          <g
            key={block.id}
            onMouseEnter={() => setHovered(block.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(block.id)}
            onBlur={() => setHovered(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setHovered(block.id);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`${block.name}: ${block.desc}`}
            className="cursor-pointer focus-visible:outline-none"
          >
            <motion.rect
              x={block.x}
              y={block.y}
              width={block.w}
              height={block.h}
              rx="10"
              fill="var(--color-background)"
              stroke={hovered === block.id ? block.color : 'var(--color-border)'}
              strokeWidth={hovered === block.id ? 2 : 1}
              animate={{
                scale: hovered === block.id ? 1.02 : 1,
                strokeWidth: hovered === block.id ? 2 : 1,
              }}
              style={{ transformOrigin: `${block.x + block.w / 2}px ${block.y + block.h / 2}px` }}
              transition={{ duration: 0.2 }}
            />
            <motion.text
              x={block.x + block.w / 2}
              y={block.y + block.h / 2 + 5}
              textAnchor="middle"
              fontSize="13"
              fontWeight={600}
              fill={hovered === block.id ? block.color : 'var(--color-foreground)'}
            >
              {block.name}
            </motion.text>
          </g>
        ))}
      </svg>

      {/* Hover/focus description — announced via aria-live for keyboard & screen-reader users */}
      <div className="min-h-[40px] mt-2 px-2" aria-live="polite">
        {active ? (
          <motion.p
            key={active.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-muted-foreground text-center"
          >
            <span className="font-semibold text-foreground">{active.name}:</span>{' '}
            {active.desc}
          </motion.p>
        ) : (
          <p className="text-sm text-muted-foreground text-center opacity-60">
            Hover or tab to a block to explore the A18 Pro die
          </p>
        )}
      </div>
    </div>
  );
}
