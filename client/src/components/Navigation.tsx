import { useEffect, useRef, useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface NavigationProps {
  activeChapter: string;
  chapters: Array<{ id: string; title: string; label: string }>;
  onChapterClick: (id: string) => void;
}

export default function Navigation({ activeChapter, chapters, onChapterClick }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme, switchable } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close on Escape, restore focus to the toggle on close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  // Move focus to the first menu item when opened
  useEffect(() => {
    if (isOpen) {
      const firstItem = menuRef.current?.querySelector<HTMLButtonElement>('[data-menu-item]');
      firstItem?.focus();
    }
  }, [isOpen]);

  const handleSelect = (id: string) => {
    onChapterClick(id);
    setIsOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        aria-label="Chapters"
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border"
      >
        <div className="container flex items-center justify-between h-14">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onChapterClick('hero');
            }}
            className="flex items-center gap-2 py-1.5 pr-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <rect x="7.5" y="7.5" width="9" height="9" rx="2.5" />
              <path d="M12 3v4.5M12 16.5V21M3 12h4.5M16.5 12H21" strokeLinecap="round" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            <span className="text-sm font-semibold text-foreground">iPhone Engineering</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {chapters.slice(0, 6).map((ch) => (
              <button
                key={ch.id}
                onClick={() => onChapterClick(ch.id)}
                aria-current={activeChapter === ch.id ? 'true' : undefined}
                aria-label={`Chapter ${ch.label}: ${ch.title}`}
                className={`py-1.5 px-1.5 text-xs font-medium transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  activeChapter === ch.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {ch.label}
              </button>
            ))}
            <div className="w-px h-4 bg-border" aria-hidden="true" />
            {chapters.slice(6).map((ch) => (
              <button
                key={ch.id}
                onClick={() => onChapterClick(ch.id)}
                aria-current={activeChapter === ch.id ? 'true' : undefined}
                aria-label={`Chapter ${ch.label}: ${ch.title}`}
                className={`py-1.5 px-1.5 text-xs font-medium transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
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
          <div className="flex items-center gap-2">
            {switchable && toggleTheme && (
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="p-2.5 min-w-10 min-h-10 flex items-center justify-center hover:bg-secondary rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <button
              ref={toggleRef}
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="mobile-chapter-menu"
              aria-label={isOpen ? 'Close chapter menu' : 'Open chapter menu'}
              className="md:hidden p-2.5 min-w-10 min-h-10 flex items-center justify-center hover:bg-secondary rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            id="mobile-chapter-menu"
            ref={menuRef}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm"
          >
            <div className="container py-3 grid grid-cols-4 gap-2">
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  data-menu-item
                  onClick={() => handleSelect(ch.id)}
                  aria-current={activeChapter === ch.id ? 'true' : undefined}
                  className={`px-2 py-2.5 rounded text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
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
