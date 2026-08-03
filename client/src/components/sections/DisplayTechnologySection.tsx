import { motion } from 'framer-motion';
import { GlowCard, SectionHeader, sectionContainerVariants, sectionItemVariants } from '@/components/SectionHeader';
import { useState } from 'react';
import { Zap, Eye } from 'lucide-react';
import OledVisual from '@/components/visuals/OledVisual';

export default function DisplayTechnologySection() {
  const [refreshRate, setRefreshRate] = useState(60);
const specs = [
    { label: 'Technology', value: 'Super Retina XDR OLED' },
    { label: 'Contrast Ratio', value: '2,000,000:1' },
    { label: 'Peak Brightness', value: '2000 Nits' },
    { label: 'Refresh Rate', value: '1-120Hz (ProMotion)' },
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
          badge="Chapter 05"
          title="Display Technology"
          description="Super Retina XDR: Precision at the pixel level with self-emissive OLED technology."
        />

        {/* Display Visualization */}
        <motion.div variants={sectionItemVariants}>
          <OledVisual refreshRate={refreshRate} />
        </motion.div>

        {/* Key Specifications */}
        <motion.div variants={sectionItemVariants}>
          <h3 className="text-2xl font-bold mb-8">Key Specifications</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {specs.map((spec, idx) => (
              <motion.div key={idx}>
                <GlowCard>
                  <p className="text-xs text-muted-foreground mb-2">{spec.label}</p>
                  <p className="text-2xl font-bold text-primary">{spec.value}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ProMotion Technology */}
        <motion.div variants={sectionItemVariants}>
          <h3 className="text-2xl font-bold mb-8">ProMotion: Adaptive Refresh Rate</h3>
          <div className="bg-card border border-border rounded p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-4">Refresh Rate: {refreshRate}Hz</label>
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={refreshRate}
                  onChange={(e) => setRefreshRate(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-secondary border border-border rounded">
                  <p className="text-xs text-muted-foreground mb-2">Battery Life</p>
                  <div className="text-2xl font-bold text-primary">{(100 - refreshRate / 1.2).toFixed(0)}%</div>
                </div>
                <div className="p-4 bg-secondary border border-border rounded">
                  <p className="text-xs text-muted-foreground mb-2">Smoothness</p>
                  <div className="text-2xl font-bold text-primary">{(refreshRate / 1.2).toFixed(0)}%</div>
                </div>
                <div className="p-4 bg-secondary border border-border rounded">
                  <p className="text-xs text-muted-foreground mb-2">Latency</p>
                  <div className="text-2xl font-bold text-primary">{(8.33 * (120 / refreshRate)).toFixed(2)}ms</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* OLED Benefits */}
        <motion.div variants={sectionItemVariants} className="bg-card border border-border rounded p-8">
          <h3 className="text-xl font-bold mb-6">Self-Emissive OLED Advantages</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-primary mb-3">Performance</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Instant pixel response</li>
                <li>True blacks (0 nits)</li>
                <li>Infinite contrast ratio</li>
                <li>No backlight needed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-3">Benefits</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Thinner display</li>
                <li>Better power efficiency</li>
                <li>Superior color accuracy</li>
                <li>Wide viewing angles</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
