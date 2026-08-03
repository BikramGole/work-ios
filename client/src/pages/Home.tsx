import { useEffect, useState, lazy, Suspense, memo } from 'react';
import { ChevronDown } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import Navigation from '@/components/Navigation';
import ProgressIndicator from '@/components/ProgressIndicator';
import BackToTop from '@/components/BackToTop';
import Footer from '@/components/Footer';
import { scrollToId } from '@/lib/scroll';

const SystemArchitectureSection = memo(lazy(() => import('@/components/sections/SystemArchitectureSection')));
const AppleSiliconSection = memo(lazy(() => import('@/components/sections/AppleSiliconSection')));
const NeuralEngineSection = memo(lazy(() => import('@/components/sections/NeuralEngineSection')));
const MultiTouchSection = memo(lazy(() => import('@/components/sections/MultiTouchSection')));
const DisplayTechnologySection = memo(lazy(() => import('@/components/sections/DisplayTechnologySection')));
const ComputationalPhotographySection = memo(lazy(() => import('@/components/sections/ComputationalPhotographySection')));
const BatteryThermalSection = memo(lazy(() => import('@/components/sections/BatteryThermalSection')));
const IOSSoftwareSection = memo(lazy(() => import('@/components/sections/iOSSoftwareSection')));
const SecuritySection = memo(lazy(() => import('@/components/sections/SecuritySection')));
const NetworkingSection = memo(lazy(() => import('@/components/sections/NetworkingSection')));
const FutureSection = memo(lazy(() => import('@/components/sections/FutureSection')));

const chapters = [
  { id: 'hero', title: 'Understanding iOS Engineering', label: 'Intro' },
  { id: 'architecture', title: 'System Architecture', label: '1' },
  { id: 'silicon', title: 'Apple Silicon', label: '2' },
  { id: 'neural', title: 'Neural Engine', label: '3' },
  { id: 'touch', title: 'Multi-Touch Display', label: '4' },
  { id: 'display', title: 'Display Technology', label: '5' },
  { id: 'photography', title: 'Computational Photography', label: '6' },
  { id: 'battery', title: 'Battery & Thermal', label: '7' },
  { id: 'software', title: 'iOS Software', label: '8' },
  { id: 'security', title: 'Security', label: '9' },
  { id: 'networking', title: 'Networking', label: '10' },
  { id: 'future', title: 'Future Technologies', label: '11' },
];

const sections = [
  { id: 'architecture', Component: SystemArchitectureSection },
  { id: 'silicon', Component: AppleSiliconSection },
  { id: 'neural', Component: NeuralEngineSection },
  { id: 'touch', Component: MultiTouchSection },
  { id: 'display', Component: DisplayTechnologySection },
  { id: 'photography', Component: ComputationalPhotographySection },
  { id: 'battery', Component: BatteryThermalSection },
  { id: 'software', Component: IOSSoftwareSection },
  { id: 'security', Component: SecuritySection },
  { id: 'networking', Component: NetworkingSection },
  { id: 'future', Component: FutureSection },
];

function SectionSkeleton() {
  return (
    <div className="container mx-auto px-4 py-24" aria-hidden="true">
      <div className="flex flex-col items-center gap-4 mb-16">
        <div className="h-6 w-36 rounded-full bg-muted animate-pulse" />
        <div className="h-10 md:h-12 w-64 md:w-80 rounded-lg bg-muted animate-pulse" />
        <div className="h-5 w-72 md:w-96 max-w-full rounded bg-muted animate-pulse" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-44 rounded-xl bg-muted/60 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeChapter, setActiveChapter] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);

  // Track the active chapter with an IntersectionObserver instead of
  // reading 12 bounding rects on every scroll event.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -75% 0px' }
    );

    for (const ch of chapters) {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Progress bar + scroll hint, rAF-throttled and passive.
  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
        setShowScrollHint(window.scrollY < window.innerHeight * 0.6);
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    scrollToId(id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="skip-link"
      >
        Skip to content
      </a>
      <ProgressIndicator progress={scrollProgress} />
      <Navigation activeChapter={activeChapter} chapters={chapters} onChapterClick={scrollToSection} />

      <main id="main" tabIndex={-1}>
        <section id="hero" className="min-h-screen">
          <HeroSection />
        </section>

        {sections.map(({ id, Component }) => (
          <section key={id} id={id} className="min-h-screen">
            <Suspense fallback={<SectionSkeleton />}>
              <Component />
            </Suspense>
          </section>
        ))}
      </main>

      <Footer />

      {/* Scroll hint — only visible while the hero is on screen */}
      {showScrollHint && (
        <div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none"
          aria-hidden="true"
        >
          <ChevronDown className="animate-bounce text-accent" size={32} />
        </div>
      )}

      <BackToTop />
    </div>
  );
}
