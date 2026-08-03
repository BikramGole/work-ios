import { motion } from 'framer-motion';
import { GlowCard, SectionHeader, sectionContainerVariants, sectionItemVariants } from '@/components/SectionHeader';
import { useState, useRef } from 'react';
import { Zap, Hand } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function MultiTouchSection() {
  const [touchPoint, setTouchPoint] = useState<{ x: number; y: number } | null>(null);
  const rafRef = useRef(0);
// rAF-throttled so mousemove never re-renders more than once per frame
  const updateTouchPoint = (clientX: number, clientY: number, currentTarget: HTMLDivElement) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = currentTarget.getBoundingClientRect();
      setTouchPoint({ x: clientX - rect.left, y: clientY - rect.top });
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateTouchPoint(e.clientX, e.clientY, e.currentTarget);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) {
      updateTouchPoint(touch.clientX, touch.clientY, e.currentTarget);
    }
  };

  const clearTouchPoint = () => {
    cancelAnimationFrame(rafRef.current);
    setTouchPoint(null);
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="space-y-16"
      >
        <SectionHeader
          badge="Chapter 04"
          title="Multi-Touch Display"
          description="Advanced capacitive sensing technology for precise interaction."
        />

        {/* Interactive Touch Simulation */}
        <motion.div variants={sectionItemVariants}>
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={clearTouchPoint}
            onTouchMove={handleTouchMove}
            onTouchEnd={clearTouchPoint}
            onKeyDown={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const step = 8;
              const next = touchPoint ?? { x: rect.width / 2, y: rect.height / 2 };
              const move = (dx: number, dy: number) => {
                e.preventDefault();
                setTouchPoint({
                  x: Math.min(rect.width - 8, Math.max(8, next.x + dx)),
                  y: Math.min(rect.height - 8, Math.max(8, next.y + dy)),
                });
              };
              if (e.key === 'ArrowUp') move(0, -step);
              else if (e.key === 'ArrowDown') move(0, step);
              else if (e.key === 'ArrowLeft') move(-step, 0);
              else if (e.key === 'ArrowRight') move(step, 0);
            }}
            className="relative bg-card border border-border rounded p-12 h-80 cursor-crosshair overflow-hidden touch-none"
            role="img"
            tabIndex={0}
            aria-label="Interactive touch sensing simulator. Move your pointer or finger across the surface, or use the arrow keys to move the touch point."
          >
            {/* Grid background */}
            <svg className="absolute inset-0 w-full h-full opacity-10" aria-hidden="true">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Touch point */}
            {touchPoint && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute pointer-events-none"
                style={{ left: touchPoint.x, top: touchPoint.y, transform: 'translate(-50%, -50%)' }}
                aria-hidden="true"
              >
                {/* Capacitance readout ring */}
                <div className="w-16 h-16 rounded-full border-2 border-primary/60 bg-primary/10 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.15, 0.5] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-full h-full rounded-full border border-accent/50"
                  />
                </div>
                {/* Finger contact point */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_2px_var(--color-accent)]" />
              </motion.div>
            )}

            <div className="relative z-10 h-full flex items-center justify-center text-center pointer-events-none">
              <p className="text-muted-foreground">Move your mouse — or touch the screen — to simulate touch sensing</p>
            </div>
          </div>
        </motion.div>

        {/* Sensing technologies */}
        <motion.div variants={sectionItemVariants}>
          <h3 className="text-2xl font-bold mb-8">Sensing Technologies</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Capacitive Sensing Grid', desc: 'Precise coordinate detection' },
              { title: 'Mutual Capacitance', desc: 'Sub-millimeter accuracy' },
              { title: 'Gesture Processing', desc: 'Real-time gesture recognition' },
            ].map((tech, idx) => (
              <motion.div key={idx}>
                <GlowCard>
                  <Hand className="w-6 h-6 text-primary mb-3" strokeWidth={1.5} />
                  <h4 className="font-semibold mb-2">{tech.title}</h4>
                  <p className="text-sm text-muted-foreground">{tech.desc}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance stats */}
        <motion.div variants={sectionItemVariants} className="bg-card border border-border rounded p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter end={120} suffix="Hz" label="Touch Sampling" />
            <AnimatedCounter end={0.1} suffix="ms" label="Response Latency" decimals={1} />
            <AnimatedCounter end={16} label="Simultaneous Touches" />
            <AnimatedCounter end={99} suffix="%" label="Palm Rejection Accuracy" />
          </div>
        </motion.div>

        {/* Gesture Recognition */}
        <motion.div variants={sectionItemVariants} className="bg-card border border-border rounded p-8">
          <h3 className="text-xl font-bold mb-6">Gesture Recognition</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-primary mb-3">Supported Gestures</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Pinch &amp; Zoom</li>
                <li>Swipe</li>
                <li>Rotate</li>
                <li>Palm Rejection</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-3">Performance</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>120Hz Sampling</li>
                <li>Sub-millisecond Latency</li>
                <li>Multi-touch Support</li>
                <li>Pressure Sensitivity</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
