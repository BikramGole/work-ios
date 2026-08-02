import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';
import { Sparkles, Zap, Eye, RotateCcw } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function FutureSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const futureTechs = [
    { icon: Sparkles, title: 'Apple Intelligence', desc: 'On-device AI for smarter experiences' },
    { icon: Eye, title: 'Spatial Computing', desc: 'Advanced AR capabilities' },
    { icon: Zap, title: 'Vision Pro Integration', desc: 'Seamless spatial device connection' },
    { icon: Eye, title: 'Advanced LiDAR', desc: 'Enhanced depth sensing' },
    { icon: Zap, title: 'Next-Gen Silicon', desc: 'Continued performance improvements' },
    { icon: Sparkles, title: 'Quantum-Ready', desc: 'Preparation for quantum era' },
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
          badge="Chapter 11"
          title="The Future of Mobile"
          description="Engineering a smarter world through continued innovation and integration."
        />

        {/* Future Technologies */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-8">Emerging Technologies</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureTechs.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <motion.div key={idx} whileHover={{ borderColor: 'var(--color-primary)' }}>
                  <div className="p-6 bg-card border border-border rounded transition-colors duration-200 h-full">
                    <Icon className="w-6 h-6 text-primary mb-3" strokeWidth={1.5} />
                    <h4 className="font-semibold mb-2">{tech.title}</h4>
                    <p className="text-sm text-muted-foreground">{tech.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Future stats */}
        <motion.div variants={itemVariants} className="bg-card border border-border rounded p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter end={35} suffix=" TOPS" label="Neural Engine" />
            <AnimatedCounter end={2.5} suffix="B" label="Transistors (A18 Pro)" decimals={1} />
            <AnimatedCounter end={6} suffix=" Gen" label="A-Series per Decade" />
            <AnimatedCounter end={120} suffix="Hz" label="ProMotion Display" />
          </div>
        </motion.div>

        {/* Vision Statement */}
        <motion.div variants={itemVariants} className="bg-card border border-border rounded p-8">
          <h3 className="text-xl font-bold mb-6">Engineering Philosophy</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-primary mb-3">Hardware-Software Synergy</h4>
              <p className="text-muted-foreground leading-relaxed">
                The core of iPhone's success lies in the vertical integration that optimizes every interaction. By controlling both hardware and software, Apple can create experiences that are impossible on modular platforms.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-3">Silicon Leadership</h4>
              <p className="text-muted-foreground leading-relaxed">
                Apple Silicon continues to push the boundaries of performance and efficiency with each generation. The A-series chips set the standard for mobile processors, delivering desktop-class performance in a mobile form factor.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-3">Spatial Computing</h4>
              <p className="text-muted-foreground leading-relaxed">
                Technologies like LiDAR and advanced AI are paving the way for the next era of augmented reality. The iPhone will continue to be the bridge between the digital and physical worlds.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center">
          <h3 className="text-2xl font-bold mb-4">The Journey Continues</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Every component, every line of code, every design decision is made with one goal in mind: to create the most advanced smartphone in the world.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-primary text-primary-foreground rounded font-semibold hover:bg-primary/90 transition-colors duration-200 inline-flex items-center gap-2"
          >
            <RotateCcw size={16} />
            Start the Journey Again
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
