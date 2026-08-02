import { motion } from 'framer-motion';
import { useState } from 'react';
import { Zap, Hand } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function MultiTouchSection() {
  const [touchPoint, setTouchPoint] = useState<{ x: number; y: number } | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTouchPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="space-y-16"
      >
        <motion.div variants={itemVariants} className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold">Multi-Touch Display</h2>
          <p className="text-lg text-muted-foreground">
            Advanced capacitive sensing technology for precise interaction.
          </p>
        </motion.div>

        {/* Interactive Touch Simulation */}
        <motion.div variants={itemVariants}>
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTouchPoint(null)}
            className="relative bg-card border border-border rounded p-12 h-80 cursor-crosshair overflow-hidden"
          >
            {/* Grid background */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
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
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full blur-lg" />
                <div className="absolute inset-2 w-8 h-8 bg-primary rounded-full" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
              </motion.div>
            )}

            <div className="relative z-10 h-full flex items-center justify-center text-center">
              <p className="text-muted-foreground">Move your mouse to simulate touch sensing</p>
            </div>
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-8">Sensing Technologies</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Capacitive Sensing Grid', desc: 'Precise coordinate detection' },
              { title: 'Mutual Capacitance', desc: 'Sub-millimeter accuracy' },
              { title: 'Gesture Processing', desc: 'Real-time gesture recognition' },
            ].map((tech, idx) => (
              <motion.div key={idx} whileHover={{ borderColor: 'var(--color-primary)' }}>
                <div className="p-6 bg-card border border-border rounded transition-colors duration-200">
                  <Hand className="w-6 h-6 text-primary mb-3" strokeWidth={1.5} />
                  <h4 className="font-semibold mb-2">{tech.title}</h4>
                  <p className="text-sm text-muted-foreground">{tech.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance stats */}
        <motion.div variants={itemVariants} className="bg-card border border-border rounded p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter end={120} suffix="Hz" label="Touch Sampling" />
            <AnimatedCounter end={0.1} suffix="ms" label="Response Latency" decimals={1} />
            <AnimatedCounter end={16} label="Simultaneous Touches" />
            <AnimatedCounter end={99} suffix="%" label="Palm Rejection Accuracy" />
          </div>
        </motion.div>

        {/* Gesture Recognition */}
        <motion.div variants={itemVariants} className="bg-card border border-border rounded p-8">
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
