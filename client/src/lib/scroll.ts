/** Scroll to an element by id, honoring the user's reduced-motion preference. */
export function scrollToId(id: string): void {
  const element = document.getElementById(id);
  if (!element) return;
  const prefersReduced =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  element.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
}
