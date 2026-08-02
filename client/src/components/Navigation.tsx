import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  activeChapter: string;
  chapters: Array<{ id: string; title: string; label: string }>;
  onChapterClick: (id: string) => void;
}

export default function Navigation({ activeChapter, chapters, onChapterClick }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <rect x="7.5" y="7.5" width="9" height="9" rx="2.5" />
              <path d="M12 3v4.5M12 16.5V21M3 12h4.5M16.5 12H21" strokeLinecap="round" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            <span className="text-sm font-semibold text-foreground">iPhone Engineering</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {chapters.slice(0, 6).map((ch) => (
              <button
                key={ch.id}
                onClick={() => onChapterClick(ch.id)}
                className={`text-xs font-medium transition-colors duration-200 ${
                  activeChapter === ch.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {ch.label}
              </button>
            ))}
            <div className="w-px h-4 bg-border" />
            {chapters.slice(6).map((ch) => (
              <button
                key={ch.id}
                onClick={() => onChapterClick(ch.id)}
                className={`text-xs font-medium transition-colors duration-200 ${
                  activeChapter === ch.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {ch.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="container py-3 grid grid-cols-4 gap-2">
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    onChapterClick(ch.id);
                    setIsOpen(false);
                  }}
                  className={`px-2 py-2 rounded text-xs font-medium transition-colors ${
                    activeChapter === ch.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-14" />
    </>
  );
}
