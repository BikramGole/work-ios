import { motion } from 'framer-motion';
import { Cpu, Zap, Link2 } from 'lucide-react';
import { GlowCard, SectionHeader } from '@/components/SectionHeader';

export default function SystemArchitectureSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const features = [
    {
      icon: Cpu,
      title: 'Unified Silicon Design',
      description: 'Apple designs the A-series SoC specifically for iOS, eliminating overhead found in generic modular architectures.',
    },
    {
      icon: Link2,
      title: 'Hardware-Software Synergy',
      description: 'iOS frameworks are optimized to leverage specific silicon instructions, resulting in higher efficiency.',
    },
    {
      icon: Zap,
      title: 'Power Efficiency First',
      description: 'Every component is designed to minimize power consumption through granular control and intelligent management.',
    },
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
        <SectionHeader
          badge="Chapter 01"
          title="System Architecture"
          description="Vertical integration drives performance by seamlessly connecting hardware and software."
        />

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div key={idx} variants={itemVariants}>
                <GlowCard>
                  <Icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>

        {/* Architecture Diagram */}
        <motion.div variants={itemVariants} className="mt-16">
          <div className="bg-card border border-border rounded p-12">
            <h3 className="text-2xl font-bold mb-12 text-center">Vertical Integration Stack</h3>
            <div className="space-y-3 max-w-md mx-auto">
              {[
                { label: 'iOS Apps', color: 'bg-primary/10 border-primary/30' },
                { label: 'iOS Frameworks', color: 'bg-accent/10 border-accent/30' },
                { label: 'XNU Kernel', color: 'bg-primary/10 border-primary/30' },
                { label: 'Apple Silicon', color: 'bg-accent/10 border-accent/30' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`h-14 ${item.color} border rounded flex items-center justify-center font-medium text-sm`}
                >
                  {item.label}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
