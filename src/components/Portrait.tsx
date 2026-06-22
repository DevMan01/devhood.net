import { useEffect, useState } from 'react';

type Props = {
  src: string;
  alt: string;
  // CSS object-position value used to align the face inside the circular crop.
  // The default targets the eyes/glasses for /profile.jpeg.
  focal?: string;
};

// Soft fade-in on mount, mirroring the original site's hero entrance.
export default function Portrait({ src, alt, focal = '50% 28%' }: Props) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      className={`
        relative
        h-32 w-32
        sm:h-40 sm:w-40
        rounded-full
        overflow-hidden
        ring-1 ring-white/20
        shadow-2xl
        transition-opacity duration-[1200ms] ease-out
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        className="h-full w-full object-cover"
        style={{ objectPosition: focal }}
      />
    </div>
  );
}
