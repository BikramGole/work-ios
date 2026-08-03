import { useEffect, useRef, useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="currentColor" aria-hidden="true">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
            </svg>
            <span className="text-sm font-semibold text-foreground">iPhone Engineering</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1.5">
            {chapters.map((ch) => (
              <Tooltip key={ch.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onChapterClick(ch.id)}
                    aria-current={activeChapter === ch.id ? 'true' : undefined}
                    aria-label={`Chapter ${ch.label}: ${ch.title}`}
                    className={`py-1.5 px-2 text-xs font-medium transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      activeChapter === ch.id
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    }`}
                  >
                    {ch.label}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{ch.title}</TooltipContent>
              </Tooltip>
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
