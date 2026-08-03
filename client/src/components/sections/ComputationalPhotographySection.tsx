import { motion } from 'framer-motion';
import { GlowCard, SectionHeader, sectionContainerVariants, sectionItemVariants } from '@/components/SectionHeader';
import { Camera } from 'lucide-react';

export default function ComputationalPhotographySection() {
const pipeline = [
    'Capture',
    'Sensor Processing',
    'Neural Engine',
    'Deep Fusion',
    'Smart HDR',
    'Output',
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
          badge="Chapter 06"
          title="Computational Photography"
          description="Zero shutter lag. Photonic Engine. Deep Fusion. Smart HDR 5."
        />

        {/* Photography Pipeline */}
        <motion.div variants={sectionItemVariants}>
          <div className="space-y-3">
            {pipeline.map((stage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="flex items-center gap-4"
              >
                <div className="w-28 h-12 bg-card border border-primary/30 rounded flex items-center justify-center font-medium text-sm">
                  {stage}
                </div>
                
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Real-world results */}
        <motion.div variants={sectionItemVariants}>
          <h3 className="text-2xl font-bold mb-2">Real-World Results</h3>
          <p className="text-muted-foreground mb-6">
            Night Mode extends exposure while the Neural Engine fuses frames — scenes like these are captured hand-held, in one tap.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <figure className="group relative overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src="/images/night-mode.jpg"
                alt="City street at night photographed on a smartphone — the kind of low-light scene Night Mode and Deep Fusion are built for"
                className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
                width={1600}
                height={1067}
              />
              <figcaption className="px-4 py-3 text-xs text-muted-foreground border-t border-border">
                Low-light city scene — Night Mode, multi-frame fusion
              </figcaption>
            </figure>
            <figure className="group relative overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src="/images/camera-lenses.jpg"
                alt="Close-up of an iPhone camera module with three lenses visible"
                className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
                width={1600}
                height={1067}
              />
              <figcaption className="px-4 py-3 text-xs text-muted-foreground border-t border-border">
                The Pro camera array — wide, ultra-wide and telephoto
              </figcaption>
            </figure>
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div variants={sectionItemVariants}>
          <h3 className="text-2xl font-bold mb-8">Advanced Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Zero Shutter Lag', desc: 'Captures before shutter press' },
              { title: 'Deep Fusion', desc: 'Semantic segmentation optimization' },
              { title: 'Smart HDR 5', desc: 'Extreme dynamic range blending' },
            ].map((feature, idx) => (
              <motion.div key={idx}>
                <GlowCard>
                  <Camera className="w-6 h-6 text-primary mb-3" strokeWidth={1.5} />
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ISP Integration */}
        <motion.div variants={sectionItemVariants} className="bg-card border border-border rounded p-8">
          <h3 className="text-xl font-bold mb-4">Image Signal Processor (ISP)</h3>
          <p className="text-muted-foreground leading-relaxed">
            The dedicated ISP works in parallel with the Neural Engine to process raw sensor data in real-time. This hardware-software synergy enables professional-grade image processing directly on the device, supporting ProRes and ProRAW encoding.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
