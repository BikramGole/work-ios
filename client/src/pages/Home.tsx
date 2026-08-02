import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import SystemArchitectureSection from '@/components/sections/SystemArchitectureSection';
import AppleSiliconSection from '@/components/sections/AppleSiliconSection';
import NeuralEngineSection from '@/components/sections/NeuralEngineSection';
import MultiTouchSection from '@/components/sections/MultiTouchSection';
import DisplayTechnologySection from '@/components/sections/DisplayTechnologySection';
import ComputationalPhotographySection from '@/components/sections/ComputationalPhotographySection';
import BatteryThermalSection from '@/components/sections/BatteryThermalSection';
import IOSSoftwareSection from '@/components/sections/iOSSoftwareSection';
import SecuritySection from '@/components/sections/SecuritySection';
import NetworkingSection from '@/components/sections/NetworkingSection';
import FutureSection from '@/components/sections/FutureSection';
import Navigation from '@/components/Navigation';
import ProgressIndicator from '@/components/ProgressIndicator';
import BackToTop from '@/components/BackToTop';

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
          <SystemArchitectureSection />
        </section>

        <section id="silicon" className="min-h-screen py-20">
          <AppleSiliconSection />
        </section>

        <section id="neural" className="min-h-screen py-20">
          <NeuralEngineSection />
        </section>

        <section id="touch" className="min-h-screen py-20">
          <MultiTouchSection />
        </section>

        <section id="display" className="min-h-screen py-20">
          <DisplayTechnologySection />
        </section>

        <section id="photography" className="min-h-screen py-20">
          <ComputationalPhotographySection />
        </section>

        <section id="battery" className="min-h-screen py-20">
          <BatteryThermalSection />
        </section>

        <section id="software" className="min-h-screen py-20">
          <IOSSoftwareSection />
        </section>

        <section id="security" className="min-h-screen py-20">
          <SecuritySection />
        </section>

        <section id="networking" className="min-h-screen py-20">
          <NetworkingSection />
        </section>

        <section id="future" className="min-h-screen py-20">
          <FutureSection />
        </section>
      </main>

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
