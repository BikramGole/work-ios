import { useTheme } from '@/contexts/ThemeContext';

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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <rect x="7.5" y="7.5" width="9" height="9" rx="2.5" />
                <path d="M12 3v4.5M12 16.5V21M3 12h4.5M16.5 12H21" strokeLinecap="round" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
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
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
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
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Interactive 3D Model
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('touch')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Touch Simulation
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('silicon')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Chip Anatomy
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('display')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  OLED Pixel Lab
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} iPhone Engineering — An educational interactive experience.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with React, Three.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
