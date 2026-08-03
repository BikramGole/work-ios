import { motion } from 'framer-motion';
import { GlowCard, SectionHeader, sectionContainerVariants, sectionItemVariants } from '@/components/SectionHeader';
import { useState } from 'react';
import ChipDiagram from '@/components/visuals/ChipDiagram';

export default function AppleSiliconSection() {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  const components = [
    { id: 'cpu', name: 'CPU Cores', spec: '6-Core (2P + 4E)', desc: 'High-performance and efficiency cores' },
    { id: 'gpu', name: 'GPU Cores', spec: '6-Core Custom', desc: 'Custom graphics and ML processing' },
    { id: 'neural', name: 'Neural Engine', spec: '35 TOPS', desc: 'On-device AI acceleration' },
    { id: 'isp', name: 'Image Signal Processor', spec: 'ISP', desc: 'Computational photography' },
    { id: 'memory', name: 'Memory Controller', spec: 'Unified', desc: 'High-bandwidth memory pool' },
    { id: 'secure', name: 'Secure Enclave', spec: 'Isolated', desc: 'Security and biometrics' },
  ];
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
          badge="Chapter 02"
          title="Apple Silicon"
          description="The A18 Pro utilizes unified memory architecture for unprecedented mobile performance."
        />

        {/* Key Specs */}
        <motion.div variants={sectionItemVariants} className="grid md:grid-cols-3 gap-6">
          <GlowCard>
            <div className="text-3xl font-bold text-primary mb-2">3nm</div>
            <p className="text-sm text-muted-foreground">Process Technology</p>
          </GlowCard>
          <GlowCard>
            <div className="text-3xl font-bold text-primary mb-2">19B+</div>
            <p className="text-sm text-muted-foreground">Transistor Count</p>
          </GlowCard>
          <GlowCard>
            <div className="text-3xl font-bold text-primary mb-2">35</div>
            <p className="text-sm text-muted-foreground">TOPS (Neural Engine)</p>
          </GlowCard>
        </motion.div>

        {/* Chip Visualization */}
        <motion.div variants={sectionItemVariants}>
          <ChipDiagram />
        </motion.div>

        {/* Component Details */}
        <motion.div variants={sectionItemVariants}>
          <h3 className="text-2xl font-bold mb-8">Core Components</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((comp) => {
              const open = hoveredComponent === comp.id;
              return (
                <motion.div
                  key={comp.id}
                  onHoverStart={() => setHoveredComponent(comp.id)}
                  onHoverEnd={() => setHoveredComponent(null)}
                  onClick={() =>
                    setHoveredComponent((prev) => (prev === comp.id ? null : comp.id))
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setHoveredComponent((prev) => (prev === comp.id ? null : comp.id));
                    }
                  }}
                  whileHover={{ borderColor: 'var(--color-primary)' }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={open}
                  className={`p-6 bg-card border border-border rounded cursor-pointer transition-colors duration-200 ${
                    open ? 'border-primary/40' : ''
                  }`}
                >
                  <div className="text-sm font-semibold text-primary mb-1">{comp.spec}</div>
                  <h4 className="text-lg font-semibold mb-2">{comp.name}</h4>
                  {open && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-muted-foreground"
                    >
                      {comp.desc}
                    </motion.p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Unified Memory */}
        <motion.div variants={sectionItemVariants} className="bg-card border border-border rounded p-8">
          <h3 className="text-xl font-bold mb-4">Unified Memory Architecture</h3>
          <p className="text-muted-foreground leading-relaxed">
            The A18 Pro features a unified memory architecture, allowing the CPU and GPU to share a high-bandwidth, low-latency memory pool. This eliminates data copying between processors, resulting in unprecedented mobile performance and efficiency.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
