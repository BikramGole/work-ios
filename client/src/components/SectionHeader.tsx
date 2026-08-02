import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionHeaderProps {
  badge: string;
  title: ReactNode;
  description?: ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function SectionHeader({ badge, title, description }: SectionHeaderProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="text-center space-y-4 max-w-2xl mx-auto"
    >
      <motion.span
        variants={itemVariants}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-xs font-semibold text-primary tracking-wider"
      >
        <span className="w-1 h-1 rounded-full bg-primary" />
        {badge}
      </motion.span>
      <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={itemVariants} className="text-lg text-muted-foreground">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

/** Card with hover glow used across sections */
export function GlowCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group relative p-6 bg-card border border-border rounded overflow-hidden transition-colors duration-300 hover:border-primary/40 ${className}`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,var(--primary)/8%,transparent_60%)]" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
