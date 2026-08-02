import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface FunFactProps {
  title: string;
  description: string;
}

export default function FunFact({ title, description }: FunFactProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 rounded p-6"
    >
      <div className="flex gap-4">
        <Lightbulb className="w-6 h-6 text-primary flex-shrink-0 mt-1" strokeWidth={1.5} />
        <div>
          <h4 className="font-semibold text-primary mb-2">{title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
