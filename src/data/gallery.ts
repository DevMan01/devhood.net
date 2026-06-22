export interface Photo {
  slug: string;
  title: string;
  location: string;
  camera: string;
  lens: string;
  settings: string;
  date: string;
}

export interface Album {
  id: string;
  title: string;
  subtitle: string;
  blurb: string;
  coverSlug: string;
  photos: Photo[];
}

export const albums: Album[] = [
  {
    id: 'box-elder-peak',
    title: 'Box Elder Peak',
    subtitle: 'Wasatch Range, Utah',
    blurb:
      'Twelve hours, solo. I left the trailhead at 5 AM with a headlamp, finally reaching the summit of Box Elder Peak, 11,101 ft, just before noon. The final hour of ascent was the hardest. But the peak was worth it. I sat with it for a while, enjoyed the view and some memories that mean most to me.',
    coverSlug: 'sunrise-over-wasatch',
    photos: [
      {
        slug: 'predawn-alpenglow',
        title: 'Predawn Alpenglow',
        location: 'Box Elder Peak Trail, Alpine, UT  •  ~9,400 ft',
        camera: 'Apple iPhone 16 Pro',
        lens: 'Triple-camera system — wide, f/1.78',
        settings: 'ISO 160  ·  1/15 s  ·  f/1.78  ·  6.765 mm',
        date: 'August 17, 2025',
      },
      {
        slug: 'sunrise-over-wasatch',
        title: 'Sunrise Over the Wasatch',
        location: 'Box Elder Peak West Ridge, Alpine, UT  •  ~10,200 ft',
        camera: 'Apple iPhone 16 Pro',
        lens: 'Triple-camera system — wide, f/1.78',
        settings: 'ISO 32  ·  1/1000 s  ·  f/1.78  ·  6.765 mm',
        date: 'August 17, 2025',
      },
      {
        slug: 'summit-approach',
        title: 'Summit Approach',
        location: 'Box Elder Peak East Face, Alpine, UT  •  ~10,900 ft',
        camera: 'Apple iPhone 16 Pro',
        lens: 'Triple-camera system — wide, f/1.78',
        settings: 'ISO 50  ·  1/2000 s  ·  f/1.78  ·  6.765 mm',
        date: 'August 17, 2025',
      },
      {
        slug: 'summit-ridge',
        title: 'Summit Ridge',
        location: 'Box Elder Peak Trail, Alpine, UT',
        camera: 'Apple iPhone 16 Pro',
        lens: 'Triple-camera system — wide, f/1.78',
        settings: 'ISO 50  ·  1/3000 s  ·  f/1.78  ·  6.765 mm',
        date: 'August 17, 2025',
      },
      {
        slug: 'box-elder-peak-1',
        title: 'Box Elder Peak',
        location: 'Box Elder Peak Trail, Alpine, UT',
        camera: 'Sony α6000',
        lens: 'Rokinon 12mm f/2.0 CS  ·  12 mm',
        settings: 'ISO 100  ·  1/500 s  ·  f/8',
        date: 'August 2025',
      },
      {
        slug: 'lone-peak-range',
        title: 'Viewing Lone Peak Range',
        location: 'Box Elder Peak Trail, Alpine, UT  •  ~10,200 ft',
        camera: 'Sony α6000',
        lens: 'Sony E 55–210mm f/4.5–6.3 OSS  ·  ~100 mm',
        settings: 'ISO 100  ·  1/640 s  ·  f/11',
        date: 'August 2025',
      },
      {
        slug: 'silver-lake',
        title: 'Silver Lake',
        location: 'Box Elder Peak Trail, Alpine, UT',
        camera: 'Sony α6000',
        lens: 'Rokinon 12mm f/2.0 CS  ·  12 mm',
        settings: 'ISO 100  ·  1/250 s  ·  f/8',
        date: 'August 2025',
      },
    ],
  },
];
