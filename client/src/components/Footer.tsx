import { useTheme } from '@/contexts/ThemeContext';
import { scrollToId } from '@/lib/scroll';

const chapters = [
  { id: 'architecture', label: 'System Architecture' },
  { id: 'silicon', label: 'Apple Silicon' },
  { id: 'neural', label: 'Neural Engine' },
  { id: 'display', label: 'Display Technology' },
  { id: 'photography', label: 'Photography' },
  { id: 'battery', label: 'Battery & Thermal' },
  { id: 'security', label: 'Security' },
  { id: 'future', label: 'Future Technologies' },
];

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const scrollTo = (id: string) => {
    scrollToId(id);
  };

  return (
    <footer
      className={`border-t border-border ${
        isDark ? 'bg-card/40' : 'bg-muted/40'
      } backdrop-blur-sm`}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="currentColor" aria-hidden="true">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              <span className="font-semibold">iPhone Engineering</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              An interactive journey through the hardware and software engineering behind the iPhone.
            </p>
          </div>

          {/* Chapters */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Chapters</h4>
            <ul className="grid grid-cols-2 gap-2">
              {chapters.map((ch) => (
                <li key={ch.id}>
                  <button
                    onClick={() => scrollTo(ch.id)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left py-1.5 inline-block"
                  >
                    {ch.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollTo('hero')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block"
                >
                  Interactive 3D Model
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('touch')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block"
                >
                  Touch Simulation
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('silicon')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block"
                >
                  Chip Anatomy
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('display')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 inline-block"
                >
                  OLED Pixel Lab
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            3 Dev, 1 Bug
          </p>
          <p className="text-xs text-muted-foreground">
            Built with React, Three.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
