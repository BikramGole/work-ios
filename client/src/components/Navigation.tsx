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
            <img src="/manus-storage/iphone-logo-mark_f31e7db7.png" alt="Logo" className="w-6 h-6" />
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
