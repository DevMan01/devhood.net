import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import NavMenu from './NavMenu';

type Props = {
  children: ReactNode;
  // When true, the layout omits the persistent wordmark header (used on the
  // landing page where the floating card is the entire visual statement). The
  // hamburger NavMenu is always rendered regardless of `bare` so every page
  // remains reachable from anywhere on the site.
  bare?: boolean;
};

export default function Layout({ children, bare = false }: Props) {
  // The hero background image + vignette live on <body> (see src/styles/index.css)
  // so this wrapper stays fully transparent. That avoids the negative-z-index
  // stacking-context bug where a fixed child with z-index: -10 inside a
  // positioned, opaquely-backgrounded parent renders behind the parent itself.
  return (
    <div className="relative min-h-dvh w-full overflow-x-hidden text-white">
      <NavMenu />

      {!bare && (
        <header className="absolute inset-x-0 top-0 z-10 px-6 py-5 sm:px-10">
          <nav className="flex items-center text-sm font-medium">
            <Link to="/" className="tracking-[0.25em] text-white/90 hover:text-white">
              DEVHOOD
            </Link>
          </nav>
        </header>
      )}

      <main className="relative z-0 min-h-dvh">{children}</main>
    </div>
  );
}
