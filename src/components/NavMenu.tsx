import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

type NavItem = {
  to: string;
  label: string;
};

// Single source of truth for the overlay menu. Add new routes here and they
// appear in the menu automatically — no other file needs to change.
const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
  { to: '/gallery', label: 'Gallery' },
];

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Every dismissal path (X, backdrop, Escape, nav link click) goes through
  // this one function so the close behavior is consistent. We deliberately
  // do NOT close on `location.pathname` change — that was unreliable because
  // clicking the link for the page you're already on does not change the
  // pathname, so the overlay would stay open (bug #2).
  const close = useCallback(() => {
    setOpen(false);
  }, []);

  // Close on Escape; lock body scroll while open; restore focus to trigger on close.
  useEffect(() => {
    if (!open) {
      return;
    }
    // Capture refs at effect-setup time so the cleanup uses the same nodes
    // that were live when the effect ran (satisfies react-hooks/exhaustive-deps).
    const triggerEl = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', onKey);

    // Focus the first menu link when the overlay opens.
    firstLinkRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      triggerEl?.focus();
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        data-testid="nav-trigger"
        className="
          fixed top-4 right-4 sm:top-6 sm:right-6
          z-40
          inline-flex items-center justify-center
          h-10 w-10 sm:h-11 sm:w-11
          rounded-full
          bg-ink/40 backdrop-blur-md
          ring-1 ring-white/15
          text-white/90 hover:text-white
          hover:bg-ink/55
          transition-colors duration-tesla ease-tesla
          focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
        "
      >
        {/* Hamburger glyph */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        >
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          data-testid="nav-overlay"
          className="fixed inset-0 z-50"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            tabIndex={-1}
            className="
              absolute inset-0
              bg-ink/70 backdrop-blur-xl
              animate-[fadeIn_220ms_ease-out]
            "
          />

          {/* Close button — z-10 keeps it above the backdrop sibling and
              stopPropagation guards against any future overlay-wide handlers. */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close menu"
            data-testid="nav-close"
            className="
              absolute top-4 right-4 sm:top-6 sm:right-6
              z-10
              inline-flex items-center justify-center
              h-10 w-10 sm:h-11 sm:w-11
              rounded-full
              ring-1 ring-white/20
              text-white/90 hover:text-white
              hover:bg-white/10
              transition-colors duration-tesla ease-tesla
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
            "
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>

          {/* Menu items — pointer-events-none on the nav so taps "between"
              the list items fall through to the backdrop, while the <ul>
              re-enables pointer events for the actual links. */}
          <nav
            aria-label="Primary"
            className="
              relative h-full w-full
              flex flex-col items-center justify-center
              gap-2 sm:gap-3
              px-6
              pointer-events-none
            "
          >
            <ul className="flex flex-col items-center gap-1 sm:gap-2 pointer-events-auto">
              {NAV_ITEMS.map((item, i) => {
                const isActive = location.pathname === item.to;
                return (
                  <li key={item.to}>
                    <Link
                      ref={i === 0 ? firstLinkRef : undefined}
                      to={item.to}
                      onClick={close}
                      data-testid={`nav-link-${item.label.toLowerCase()}`}
                      className={`
                        block px-6 py-3
                        text-2xl sm:text-3xl font-light tracking-tight
                        transition-colors duration-tesla ease-tesla
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
                        rounded-tesla
                        ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}
                      `}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
