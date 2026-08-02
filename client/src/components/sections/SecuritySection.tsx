import { motion } from 'framer-motion';
import { GlowCard, SectionHeader } from '@/components/SectionHeader';
import { Lock, Shield, Fingerprint, Key } from 'lucide-react';

export default function SecuritySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const features = [
    { icon: Lock, title: 'Secure Enclave', desc: 'Isolated processor with secure boot' },
    { icon: Key, title: 'Hardware AES Engine', desc: 'Dedicated encryption engine' },
    { icon: Fingerprint, title: 'Biometric Processing', desc: 'On-device biometric data' },
    { icon: Shield, title: 'Secure Boot', desc: 'Verified boot chain' },
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
          badge="Chapter 09"
          title="Security Architecture"
          description="Security by design. Hardware-backed protection for user data and privacy."
        />

        {/* Security Features */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-8">Core Security Features</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div key={idx} whileHover={{ borderColor: 'var(--color-primary)' }}>
                  <GlowCard>
                    <Icon className="w-6 h-6 text-primary mb-3" strokeWidth={1.5} />
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Security Layers */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-8">Defense in Depth</h3>
          <div className="bg-card border border-border rounded p-8">
            <div className="space-y-3">
              {[
                { label: 'Secure Enclave', desc: 'Isolated Processor' },
                { label: 'Hardware AES', desc: 'Encryption Engine' },
                { label: 'Secure Boot', desc: 'Verified Boot Chain' },
                { label: 'Biometric Auth', desc: 'On-Device Only' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="w-32 h-12 bg-secondary border border-primary/30 rounded flex items-center justify-center font-medium text-sm">
                    {item.label}
                  </div>
                  
                  <span className="text-sm text-muted-foreground">{item.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Privacy Promise */}
        <motion.div variants={itemVariants} className="bg-card border border-border rounded p-8">
          <h3 className="text-xl font-bold mb-4">Zero-Knowledge Architecture</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Biometric data (Face ID, Touch ID) never leaves the device or the Secure Enclave. Apple cannot access this data, and it is never transmitted to Apple servers. This zero-knowledge architecture ensures maximum privacy.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'On-Device', desc: 'All processing locally' },
              { title: 'Encrypted', desc: 'Data always encrypted' },
              { title: 'Private', desc: 'Never shared' },
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
