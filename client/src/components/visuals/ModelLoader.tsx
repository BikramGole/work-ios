import { useProgress } from '@react-three/drei';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function ModelLoader() {
  const { active, progress } = useProgress();
  if (!active) return null;
  const pct = Math.min(100, Math.round(progress));
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <Loader2 className="animate-spin text-primary" size={36} />
        <p className="text-sm text-muted-foreground">Loading 3D model… {pct}%</p>
        <div className="w-48 h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </motion.div>
    </div>
  );
}
