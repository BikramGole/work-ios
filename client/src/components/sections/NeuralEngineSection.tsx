import { motion } from 'framer-motion';
import { Brain, Zap, Mic, Languages } from 'lucide-react';

export default function NeuralEngineSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const applications = [
    { icon: Brain, title: 'Face ID', desc: 'Secure facial recognition' },
    { icon: Mic, title: 'Siri', desc: 'On-device voice processing' },
    { icon: Languages, title: 'Live Translation', desc: 'Real-time language translation' },
    { icon: Zap, title: 'Computational Photography', desc: 'Advanced image processing' },
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
          <h2 className="text-4xl md:text-5xl font-bold">Neural Engine</h2>
          <p className="text-lg text-muted-foreground">
            35 TRILLIONS OF OPERATIONS PER SECOND powering on-device AI and machine learning.
          </p>
        </motion.div>

        {/* Neural Network Visualization */}
        <motion.div variants={itemVariants} className="bg-card border border-border rounded p-8">
          <img
            src="/manus-storage/neural-engine-visualization_694d95ef.png"
            alt="Neural Engine"
            className="w-full rounded"
          />
        </motion.div>

        {/* Applications Grid */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-8">AI-Powered Features</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {applications.map((app, idx) => {
              const Icon = app.icon;
              return (
                <motion.div key={idx} whileHover={{ borderColor: 'var(--color-primary)' }}>
                  <div className="p-6 bg-card border border-border rounded transition-colors duration-200">
                    <Icon className="w-6 h-6 text-primary mb-3" strokeWidth={1.5} />
                    <h4 className="font-semibold mb-2">{app.title}</h4>
                    <p className="text-sm text-muted-foreground">{app.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Performance */}
        <motion.div variants={itemVariants} className="bg-card border border-border rounded p-8">
          <h3 className="text-xl font-bold mb-6">Performance Capabilities</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Processing Power</span>
                <span className="text-primary font-semibold">35 TOPS</span>
              </div>
              <div className="h-2 bg-secondary rounded">
                <div className="h-full bg-primary rounded" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
