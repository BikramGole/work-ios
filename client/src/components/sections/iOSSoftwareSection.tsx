import { motion } from 'framer-motion';
import { Layers, Lock, Zap, Cpu } from 'lucide-react';

export default function IOSSoftwareSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const layers = [
    { name: 'Cocoa Touch', desc: 'SwiftUI & UIKit frameworks', icon: Layers },
    { name: 'Media Layer', desc: 'Metal graphics & Audio', icon: Zap },
    { name: 'Core Services', desc: 'Foundation framework', icon: Cpu },
    { name: 'Core OS', desc: 'XNU Kernel & system', icon: Lock },
  ];

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
          <h2 className="text-4xl md:text-5xl font-bold">iOS Software Architecture</h2>
          <p className="text-lg text-muted-foreground">
            A Unix-based foundation for stability, performance, and security.
          </p>
        </motion.div>

        {/* Layered Architecture */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-8">System Layers</h3>
          <div className="space-y-3 max-w-md mx-auto">
            {layers.map((layer, idx) => {
              const Icon = layer.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-40 h-14 bg-card border border-primary/30 rounded flex items-center gap-3 px-4">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    <span className="font-medium text-sm">{layer.name}</span>
                  </div>
                  <div className="flex-1 h-px bg-border" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Key Technologies */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-8">Core Technologies</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'XNU Kernel', desc: 'Hybrid kernel combining Mach and BSD' },
              { title: 'Automatic Reference Counting', desc: 'Safe memory management' },
              { title: 'Grand Central Dispatch', desc: 'Concurrent task management' },
              { title: 'Metal Graphics', desc: 'Low-level GPU access' },
            ].map((tech, idx) => (
              <motion.div key={idx} whileHover={{ borderColor: 'var(--color-primary)' }}>
                <div className="p-6 bg-card border border-border rounded transition-colors duration-200">
                  <h4 className="font-semibold mb-2">{tech.title}</h4>
                  <p className="text-sm text-muted-foreground">{tech.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Features */}
        <motion.div variants={itemVariants} className="bg-card border border-border rounded p-8">
          <h3 className="text-xl font-bold mb-6">Performance Features</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-primary mb-3">Memory Management</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Automatic Reference Counting</li>
                <li>Efficient memory allocation</li>
                <li>Predictable performance</li>
                <li>Low memory footprint</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-3">Concurrency</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Grand Central Dispatch</li>
                <li>Multi-core optimization</li>
                <li>Thread-safe operations</li>
                <li>Responsive UI</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
