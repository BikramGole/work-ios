import { motion } from 'framer-motion';
import { GlowCard, SectionHeader, sectionContainerVariants, sectionItemVariants } from '@/components/SectionHeader';
import { Wifi, Radio, Zap } from 'lucide-react';

export default function NetworkingSection() {
const technologies = [
    { icon: Radio, name: '5G Modem', spec: 'Sub-6GHz & mmWave', desc: 'AI-driven antenna tuning' },
    { icon: Wifi, name: 'Wi-Fi 6E', spec: '6GHz Band', desc: 'Lower latency, higher speeds' },
    { icon: Radio, name: 'Bluetooth 5.3', spec: 'Low Energy', desc: 'Reliable connections' },
    { icon: Zap, name: 'Ultra Wideband', spec: 'U2 Chip', desc: 'Spatial awareness' },
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
          badge="Chapter 10"
          title="Networking & Connectivity"
          description="High-speed networking with intelligent antenna design and seamless device integration."
        />

        {/* Connectivity Technologies */}
        <motion.div variants={sectionItemVariants}>
          <h3 className="text-2xl font-bold mb-8">Wireless Technologies</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {technologies.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <motion.div key={idx} whileHover={{ borderColor: 'var(--color-primary)' }}>
                  <GlowCard>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                        <div>
                          <h4 className="font-semibold">{tech.name}</h4>
                          <p className="text-xs text-muted-foreground">{tech.spec}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{tech.desc}</p>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Network Performance */}
        <motion.div variants={sectionItemVariants}>
          <h3 className="text-2xl font-bold mb-8">Performance Metrics</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <GlowCard>
              <h4 className="font-semibold text-primary mb-4">5G Speeds</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Download</span>
                    <span className="text-sm font-bold">1+ Gbps</span>
                  </div>
                  <div className="h-2 bg-secondary rounded">
                    
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Latency</span>
                    <span className="text-sm font-bold">&lt;20ms</span>
                  </div>
                  <div className="h-2 bg-secondary rounded">
                    
                  </div>
                </div>
              </div>
            </GlowCard>
            <GlowCard>
              <h4 className="font-semibold text-primary mb-4">Wi-Fi 6E</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Bandwidth</span>
                    <span className="text-sm font-bold">2.4/5/6 GHz</span>
                  </div>
                  <div className="h-2 bg-secondary rounded">
                    
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Range</span>
                    <span className="text-sm font-bold">Extended</span>
                  </div>
                  <div className="h-2 bg-secondary rounded">
                    
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
        </motion.div>

        {/* Antenna Design */}
        <motion.div variants={sectionItemVariants} className="bg-card border border-border rounded p-8">
          <h3 className="text-xl font-bold mb-4">AI-Driven Antenna Tuning</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The A18 Pro features advanced antenna design with AI-driven tuning that automatically optimizes signal strength and power efficiency based on network conditions. This intelligent system ensures optimal connectivity while minimizing power consumption.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Smart Tuning', desc: 'Real-time optimization' },
              { title: 'Power Efficient', desc: 'Minimal battery drain' },
              { title: 'Seamless Handoff', desc: 'Smooth transitions' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-secondary border border-border rounded">
                <p className="text-sm font-semibold text-primary mb-1">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
