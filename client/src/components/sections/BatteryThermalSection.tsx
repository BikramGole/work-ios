import { motion } from 'framer-motion';
import { Zap, Thermometer } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function BatteryThermalSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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
          <h2 className="text-4xl md:text-5xl font-bold">Battery & Thermal Management</h2>
          <p className="text-lg text-muted-foreground">
            Intelligent battery and thermal design for sustained performance without throttling.
          </p>
        </motion.div>

        {/* Key Components */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-8">Core Technologies</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'Advanced Li-Ion Chemistry', desc: 'Custom L-shaped cells' },
              { icon: Thermometer, title: 'Power Management IC', desc: 'Intelligent distribution' },
              { icon: Thermometer, title: 'Thermal Dissipation', desc: 'Multi-layered graphite' },
            ].map((comp, idx) => {
              const Icon = comp.icon;
              return (
                <motion.div key={idx} whileHover={{ borderColor: 'var(--color-primary)' }}>
                  <div className="p-6 bg-card border border-border rounded transition-colors duration-200">
                    <Icon className="w-6 h-6 text-primary mb-3" strokeWidth={1.5} />
                    <h4 className="font-semibold mb-2">{comp.title}</h4>
                    <p className="text-sm text-muted-foreground">{comp.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Battery Performance */}
        <motion.div variants={itemVariants} className="bg-card border border-border rounded p-8">
          <h3 className="text-xl font-bold mb-8">Battery Performance</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <AnimatedCounter end={1000} suffix="+" label="Cycle Life" />
            <AnimatedCounter end={33} suffix="hr" label="Video Playback" />
            <AnimatedCounter end={25} suffix="W" label="Wireless Charging" />
            <AnimatedCounter end={50} suffix="%" label="Charge in 30 min" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-primary mb-4">Battery Health</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Cycle Life</span>
                    <span className="text-sm font-bold">1000+ Cycles</span>
                  </div>
                  <div className="h-2 bg-secondary rounded">
                    <div className="h-full bg-primary rounded" style={{ width: '95%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Charge Speed</span>
                    <span className="text-sm font-bold">Fast Charging</span>
                  </div>
                  <div className="h-2 bg-secondary rounded">
                    <div className="h-full bg-primary rounded" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-4">Thermal Management</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Heat Dissipation</span>
                    <span className="text-sm font-bold">Excellent</span>
                  </div>
                  <div className="h-2 bg-secondary rounded">
                    <div className="h-full bg-primary rounded" style={{ width: '92%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Sustained Performance</span>
                    <span className="text-sm font-bold">No Throttling</span>
                  </div>
                  <div className="h-2 bg-secondary rounded">
                    <div className="h-full bg-primary rounded" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Power Distribution */}
        <motion.div variants={itemVariants} className="bg-card border border-border rounded p-8">
          <h3 className="text-xl font-bold mb-6">Intelligent Power Distribution</h3>
          <div className="space-y-4">
            {[
              { label: 'SoC (Apple Silicon)', percent: 45 },
              { label: 'Display', percent: 35 },
              { label: 'Radios & Sensors', percent: 20 },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-sm">{item.label}</span>
                  <span className="text-sm text-muted-foreground">{item.percent}%</span>
                </div>
                <div className="h-2 bg-secondary rounded">
                  <div className="h-full bg-primary rounded" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
