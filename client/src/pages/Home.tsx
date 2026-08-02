import { useEffect, useState, lazy, Suspense } from 'react';
import { ChevronDown } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import Navigation from '@/components/Navigation';
import ProgressIndicator from '@/components/ProgressIndicator';
import BackToTop from '@/components/BackToTop';
import Footer from '@/components/Footer';

const SystemArchitectureSection = lazy(() => import('@/components/sections/SystemArchitectureSection'));
const AppleSiliconSection = lazy(() => import('@/components/sections/AppleSiliconSection'));
const NeuralEngineSection = lazy(() => import('@/components/sections/NeuralEngineSection'));
const MultiTouchSection = lazy(() => import('@/components/sections/MultiTouchSection'));
const DisplayTechnologySection = lazy(() => import('@/components/sections/DisplayTechnologySection'));
const ComputationalPhotographySection = lazy(() => import('@/components/sections/ComputationalPhotographySection'));
const BatteryThermalSection = lazy(() => import('@/components/sections/BatteryThermalSection'));
const IOSSoftwareSection = lazy(() => import('@/components/sections/iOSSoftwareSection'));
const SecuritySection = lazy(() => import('@/components/sections/SecuritySection'));
const NetworkingSection = lazy(() => import('@/components/sections/NetworkingSection'));
const FutureSection = lazy(() => import('@/components/sections/FutureSection'));

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

function SectionSkeleton() {
  return (
    <div className="flex items-center justify-center h-64 text-muted-foreground text-sm animate-pulse">
      Loading…
    </div>
  );
}

export default function Home() {
  const [activeChapter, setActiveChapter] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);

      // Update active chapter based on scroll position
      const sections = chapters.map(ch => ({
        id: ch.id,
        element: document.getElementById(ch.id),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].element;
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveChapter(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProgressIndicator progress={scrollProgress} />
      <Navigation activeChapter={activeChapter} chapters={chapters} onChapterClick={scrollToSection} />

      <main>
        <section id="hero" className="min-h-screen">
          <HeroSection />
        </section>

        <section id="architecture" className="min-h-screen py-20">
          <Suspense fallback={<SectionSkeleton />}>
            <SystemArchitectureSection />
          </Suspense>
        </section>

        <section id="silicon" className="min-h-screen py-20">
          <Suspense fallback={<SectionSkeleton />}>
            <AppleSiliconSection />
          </Suspense>
        </section>

        <section id="neural" className="min-h-screen py-20">
          <Suspense fallback={<SectionSkeleton />}>
            <NeuralEngineSection />
          </Suspense>
        </section>

        <section id="touch" className="min-h-screen py-20">
          <Suspense fallback={<SectionSkeleton />}>
            <MultiTouchSection />
          </Suspense>
        </section>

        <section id="display" className="min-h-screen py-20">
          <Suspense fallback={<SectionSkeleton />}>
            <DisplayTechnologySection />
          </Suspense>
        </section>

        <section id="photography" className="min-h-screen py-20">
          <Suspense fallback={<SectionSkeleton />}>
            <ComputationalPhotographySection />
          </Suspense>
        </section>

        <section id="battery" className="min-h-screen py-20">
          <Suspense fallback={<SectionSkeleton />}>
            <BatteryThermalSection />
          </Suspense>
        </section>

        <section id="software" className="min-h-screen py-20">
          <Suspense fallback={<SectionSkeleton />}>
            <IOSSoftwareSection />
          </Suspense>
        </section>

        <section id="security" className="min-h-screen py-20">
          <Suspense fallback={<SectionSkeleton />}>
            <SecuritySection />
          </Suspense>
        </section>

        <section id="networking" className="min-h-screen py-20">
          <Suspense fallback={<SectionSkeleton />}>
            <NetworkingSection />
          </Suspense>
        </section>

        <section id="future" className="min-h-screen py-20">
          <Suspense fallback={<SectionSkeleton />}>
            <FutureSection />
          </Suspense>
        </section>
      </main>

      <Footer />

      {/* Scroll indicator at bottom */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="animate-bounce text-accent">
          <ChevronDown size={32} />
        </div>
      </div>

      <BackToTop />
    </div>
  );
}
