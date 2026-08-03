import { useState, lazy, Suspense, Component, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Cpu, Camera, Maximize2, AlertTriangle, Loader2 } from 'lucide-react';
import { HOTSPOTS, type HotspotDef } from './hotspotData';
import { scrollToId } from '@/lib/scroll';

const HeroModel = lazy(() => import('./HeroModel').then((m) => ({ default: m.default })));

function HotspotIcon({ icon }: { icon: HotspotDef['icon'] }) {
  switch (icon) {
    case 'display':
      return <Maximize2 size={18} className="text-primary" />;
    case 'camera':
      return <Camera size={18} className="text-primary" />;
    case 'logo':
      return <Cpu size={18} className="text-primary" />;
    default:
      return <Cpu size={18} className="text-primary" />;
  }
}

class SceneErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-center px-6">
            <AlertTriangle size={32} className="text-amber-500" />
            <p className="text-sm text-muted-foreground">
              3D view unavailable in this browser.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function HeroSection() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const selectHotspot = (id: string) => {
    setActiveHotspot((prev) => (prev === id ? null : id));
  };

  const selected = HOTSPOTS.find((h) => h.id === activeHotspot) ?? null;

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16">
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 container max-w-7xl mx-auto px-4 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center min-h-[calc(100vh-4rem)]">
        {/* Headline — first on mobile, left column on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="min-w-0 lg:order-1"
        >
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 text-xs font-medium text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Interactive 3D · iPhone 17 Pro
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              Understanding the Engineering Behind{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                iOS
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              Discover how Apple's hardware and software work together to deliver performance,
              efficiency, security, and intelligence.
            </p>
          </div>
        </motion.div>

        {/* 3D canvas — second on mobile, right column on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative h-[380px] sm:h-[440px] md:h-[560px] lg:h-[620px] w-full min-w-0 rounded-2xl overflow-hidden border border-border/60 bg-gradient-to-b from-card/40 to-transparent lg:order-2"
        >
          <SceneErrorBoundary>
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="animate-spin" size={28} aria-hidden="true" />
                    <span className="text-sm">Loading 3D model…</span>
                  </div>
                </div>
              }
            >
              <HeroModel
                activeHotspot={activeHotspot}
                onSelect={selectHotspot}
                autoRotate={autoRotate}
                onToggleRotate={() => setAutoRotate((r) => !r)}
              />
            </Suspense>
          </SceneErrorBoundary>
        </motion.div>


        {/* Chips + info + CTAs — third on mobile, left column under headline on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="space-y-8 min-w-0 lg:order-3"
        >
          {/* Hotspot selection chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {HOTSPOTS.map((h) => (
              <button
                key={h.id}
                onClick={() => selectHotspot(h.id)}
                aria-pressed={activeHotspot === h.id}
                className={`px-4 py-2.5 min-h-10 rounded-full border text-sm font-medium transition-all duration-200 inline-flex items-center ${
                  activeHotspot === h.id
                    ? 'border-primary bg-primary/15 text-primary shadow-[0_0_20px_rgba(59,130,246,0.25)]'
                    : 'border-border bg-card/60 text-muted-foreground hover:text-foreground hover:border-foreground/30'
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>

          {/* Info panel */}
          <div className="min-h-[120px]" aria-live="polite">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="p-5 rounded-xl border border-primary/30 bg-card/70 backdrop-blur-md"
              >
                <div className="flex items-center gap-3 mb-2">
                  <HotspotIcon icon={selected.icon} />
                  <h3 className="text-lg font-semibold">{selected.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p>
              </motion.div>
            ) : (
              <div className="p-5 rounded-xl border border-border/60 bg-card/40 backdrop-blur-md">
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">Explore the iPhone.</span> Click a
                  glowing hotspot or select a chip to learn how each subsystem works — then drag to
                  rotate the model, scroll to zoom.
                </p>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-4 flex items-center gap-4 flex-wrap"
          >
            <button
              onClick={() => setAutoRotate((r) => !r)}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors duration-200 inline-flex items-center gap-2"
            >
              <RotateCcw size={16} />
              {autoRotate ? 'Pause Rotation' : 'Resume Rotation'}
            </button>
            <button
              onClick={() => scrollToId('architecture')}
              className="px-8 py-3 border border-border text-foreground rounded-full font-semibold hover:border-primary/50 hover:text-primary transition-colors duration-200"
            >
              Explore the Chapters
            </button>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
