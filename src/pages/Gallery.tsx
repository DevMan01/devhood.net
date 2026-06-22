import { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import { albums, type Album, type Photo } from '../data/gallery';

// ─── Responsive <picture> helper ─────────────────────────────────────────────
function GalleryPicture({
  slug,
  size,
  alt,
  className = '',
}: {
  slug: string;
  size: 'thumb' | 'full';
  alt: string;
  className?: string;
}) {
  const base = `/gallery/${slug}-${size}`;
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}.avif`} />
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img src={`${base}.jpg`} alt={alt} className={className} loading="lazy" decoding="async" />
    </picture>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  photo,
  album,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  photo: Photo;
  album: Album;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { if (expanded) setExpanded(false); else onClose(); }
      if (e.key === 'ArrowLeft'  && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'f') setExpanded(v => !v);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext, hasPrev, hasNext, expanded]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Hide nav when fully expanded
  useEffect(() => {
    if (expanded) {
      document.body.setAttribute('data-lightbox-expanded', '');
    } else {
      document.body.removeAttribute('data-lightbox-expanded');
    }
    return () => { document.body.removeAttribute('data-lightbox-expanded'); };
  }, [expanded]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={() => { if (expanded) setExpanded(false); else onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
    >
      {/* Stop propagation on the inner panel so clicking image/meta doesn't close */}
      <div
        className={`flex flex-col items-center w-full transition-all duration-300 ${
          expanded ? 'max-w-none px-0' : 'max-w-4xl px-4 sm:px-8'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Image wrapper — controls anchored to the image */}
        <div className="relative w-full">
          {/* × — top-right corner */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/75 text-xl leading-none select-none transition-colors"
            aria-label="Close"
          >
            ×
          </button>

          {/* Expand / Collapse pill — bottom-centre of the image */}
          <button
            onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/75 text-xs uppercase tracking-widest select-none transition-colors"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? (
              <><span>⤡</span><span>Collapse</span></>
            ) : (
              <><span>⤢</span><span>Expand</span></>
            )}
          </button>

          {/* Prev / Next */}
          {hasPrev && (
            <button
              onClick={e => { e.stopPropagation(); onPrev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/75 text-2xl leading-none select-none transition-colors"
              aria-label="Previous photo"
            >
              ‹
            </button>
          )}
          {hasNext && (
            <button
              onClick={e => { e.stopPropagation(); onNext(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/75 text-2xl leading-none select-none transition-colors"
              aria-label="Next photo"
            >
              ›
            </button>
          )}

          <div className={`w-full shadow-2xl overflow-hidden transition-all duration-300 ${expanded ? 'rounded-none' : 'rounded-xl'}`}>
            <GalleryPicture
              slug={photo.slug}
              size="full"
              alt={photo.title}
              className={`w-full h-auto object-contain transition-all duration-300 ${
                expanded ? 'max-h-screen' : 'max-h-[70vh]'
              }`}
            />
          </div>
        </div>

        {/* Metadata panel — hidden in fullscreen */}
        {!expanded && (
          <div className="mt-5 glass-card rounded-2xl px-6 py-5 w-full max-w-2xl text-left">
            <h2 className="text-lg sm:text-xl font-medium tracking-tight text-white">
              {photo.title}
            </h2>
            <p className="mt-1 text-sm text-white/55">{photo.date}</p>

            <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <MetaRow label="Location" value={photo.location} />
              <MetaRow label="Camera"   value={photo.camera}   />
              <MetaRow label="Lens"     value={photo.lens}     />
              <MetaRow label="Settings" value={photo.settings} />
            </dl>

            <p className="mt-4 text-xs text-white/30 tracking-widest uppercase">
              {album.title} — {album.subtitle}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-white/40 uppercase tracking-widest text-[10px] mb-0.5">{label}</dt>
      <dd className="text-white/80">{value}</dd>
    </div>
  );
}



// ─── Album card (the "floating glass square" on the main gallery page) ────────
function AlbumCard({ album, onOpen }: { album: Album; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="
        group glass-card rounded-2xl overflow-hidden
        w-full text-left
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
      "
    >
      {/* Cover photo */}
      <div className="relative overflow-hidden">
        <GalleryPicture
          slug={album.coverSlug}
          size="thumb"
          alt={album.title}
          className="
            w-full aspect-[4/3] object-cover
            transition-transform duration-700 ease-out
            group-hover:scale-105
          "
        />
        {/* Bottom gradient — tall enough to give text solid contrast */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 px-5 pb-4">
          <p className="text-xs text-white/75 uppercase tracking-widest mb-0.5">
            {album.photos.length} photographs
          </p>
          <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-white leading-tight">
            {album.title}
          </h2>
          <p className="text-sm text-white/65 mt-0.5">{album.subtitle}</p>
        </div>
      </div>

      {/* Blurb */}
      <div className="px-5 py-4">
        <p className="text-sm text-white/60 leading-relaxed line-clamp-3">{album.blurb}</p>
        <p className="mt-3 text-xs text-white/35 uppercase tracking-widest group-hover:text-white/60 transition-colors">
          View collection →
        </p>
      </div>
    </button>
  );
}

// ─── Open album view (photo grid) ─────────────────────────────────────────────
function AlbumView({
  album,
  onBack,
}: {
  album: Album;
  onBack: () => void;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openPhoto = useCallback((i: number) => setLightboxIndex(i), []);
  const closePhoto = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(() => setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i)), []);
  const nextPhoto = useCallback(
    () => setLightboxIndex(i => (i !== null && i < album.photos.length - 1 ? i + 1 : i)),
    [album.photos.length],
  );

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-20">
      {/* Back + album header */}
      <div className="mb-10">
        <button
          onClick={onBack}
          className="text-white/45 hover:text-white/80 text-sm uppercase tracking-widest mb-6 flex items-center gap-2 transition-colors"
        >
          ← Gallery
        </button>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-white">
          {album.title}
        </h1>
        <p className="mt-1 text-white/55">{album.subtitle}</p>
        <p className="mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-white/90 glass-card rounded-xl px-5 py-4">
          {album.blurb}
        </p>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {album.photos.map((photo, i) => (
          <button
            key={photo.slug}
            onClick={() => openPhoto(i)}
            className="
              group glass-card rounded-xl overflow-hidden
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
              text-left
            "
          >
            <div className="relative overflow-hidden">
              <GalleryPicture
                slug={photo.slug}
                size="thumb"
                alt={photo.title}
                className="
                  w-full aspect-[3/2] object-cover
                  transition-transform duration-500 ease-out
                  group-hover:scale-105
                "
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-white/90">{photo.title}</p>
              <p className="text-xs text-white/45 mt-0.5 truncate">{photo.location.split('•')[0].trim()}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photo={album.photos[lightboxIndex]}
          album={album}
          onClose={closePhoto}
          onPrev={prevPhoto}
          onNext={nextPhoto}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < album.photos.length - 1}
        />
      )}
    </section>
  );
}

// ─── Gallery page root ────────────────────────────────────────────────────────
export default function Gallery() {
  const [openAlbumId, setOpenAlbumId] = useState<string | null>(null);
  const openAlbum = albums.find(a => a.id === openAlbumId) ?? null;

  return (
    <Layout>
      {openAlbum ? (
        <AlbumView album={openAlbum} onBack={() => setOpenAlbumId(null)} />
      ) : (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-32 pb-20">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-white">
              Gallery
            </h1>
            <p className="mt-2 text-white/55 text-sm sm:text-base max-w-xl">
              A curated collection of personal photography projects.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {albums.map(album => (
              <AlbumCard
                key={album.id}
                album={album}
                onOpen={() => setOpenAlbumId(album.id)}
              />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}
