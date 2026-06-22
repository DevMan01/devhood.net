#!/usr/bin/env node
/**
 * Gallery image pipeline — Box Elder Peak album.
 *
 * Sources:  image_temp/   (high-res originals, not committed to build)
 * Outputs:  public/gallery/  (web-optimised AVIF + WebP + JPEG at 2 widths)
 *
 * Each image gets a subtle SVG watermark burned into the bottom-right corner
 * before encoding so the copyright travels with every derivative.
 *
 * Run:  node scripts/process-gallery.mjs
 * Auto: hooked into the existing prebuild via package.json (add if desired).
 */

import { existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = dirname(__dirname);
const srcDir = join(root, 'image_temp');
const outDir = join(root, 'public', 'gallery');

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

// ─── Photo manifest ───────────────────────────────────────────────────────────
// One album: Box Elder Peak — a predawn-to-summit sequence.
// Filenames must match exactly what lives in image_temp/.
const photos = [
  { source: 'Box Elder Peak 1.jpg',  slug: 'box-elder-peak-1'   },
  { source: 'IMG_1641.jpeg',         slug: 'predawn-alpenglow'   },
  { source: 'IMG_1646.jpeg',         slug: 'sunrise-over-wasatch' },
  { source: 'IMG_1650.jpeg',         slug: 'summit-approach'     },
  { source: 'IMG_1652.jpeg',         slug: 'summit-ridge'        },
  { source: 'Lone Peak Range 1.jpg', slug: 'lone-peak-range'     },
  { source: 'Silver Lake 1.jpg',     slug: 'silver-lake'         },
];

// Two widths: thumb (used in the grid) + full (used in the lightbox).
const widths = [
  { name: 'thumb', px: 900  },
  { name: 'full',  px: 2400 },
];

const formats = [
  { format: 'avif', ext: 'avif', opts: { quality: 58, effort: 6 } },
  { format: 'webp', ext: 'webp', opts: { quality: 80, effort: 5 } },
  { format: 'jpeg', ext: 'jpg',  opts: { quality: 85, mozjpeg: true, progressive: true } },
];

// ─── Watermark ────────────────────────────────────────────────────────────────
// Builds an SVG overlay sized to the output image.
// The text is right-aligned, bottom-right, with a subtle dark shadow for
// legibility across both light skies and dark rock.
function buildWatermarkSvg(width, height) {
  const fontSize = Math.round(Math.max(width * 0.013, 14));
  const padX     = Math.round(width  * 0.022);
  const padY     = Math.round(height * 0.030);
  const x        = width  - padX;
  const y        = height - padY;

  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <style>
    text {
      font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif;
      font-size: ${fontSize}px;
      fill: rgba(255,255,255,0.72);
      letter-spacing: 0.06em;
    }
  </style>
  <!-- shadow pass -->
  <text x="${x + 1}" y="${y + 1}" text-anchor="end"
        fill="rgba(0,0,0,0.55)" font-size="${fontSize}px"
        font-family="-apple-system,'Helvetica Neue',Arial,sans-serif"
        letter-spacing="0.06em">© Tim Chaffin</text>
  <!-- main text -->
  <text x="${x}" y="${y}" text-anchor="end">© Tim Chaffin</text>
</svg>`);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function newer(a, b) {
  try { return statSync(a).mtimeMs > statSync(b).mtimeMs; }
  catch { return true; }
}

// ─── Processing ───────────────────────────────────────────────────────────────
async function processPhoto(photo) {
  const src = join(srcDir, photo.source);
  if (!existsSync(src)) {
    console.warn(`  ⚠  missing: ${photo.source} — skipping`);
    return;
  }

  const tasks = [];

  for (const w of widths) {
    for (const fmt of formats) {
      const out = join(outDir, `${photo.slug}-${w.name}.${fmt.ext}`);
      if (!newer(src, out)) continue;

      tasks.push((async () => {
        // 1. Resize (honour EXIF orientation first)
        const resized = await sharp(src)
          .rotate()
          .resize({ width: w.px, withoutEnlargement: true })
          .toBuffer({ resolveWithObject: true });

        const { width: rw, height: rh } = resized.info;

        // 2. Composite watermark SVG
        const watermark = buildWatermarkSvg(rw, rh);

        const info = await sharp(resized.data)
          .composite([{ input: watermark, blend: 'over' }])
          .toFormat(fmt.format, fmt.opts)
          .toFile(out);

        const kb = (info.size / 1024).toFixed(1);
        console.log(`  ${photo.slug}-${w.name}.${fmt.ext}  ${rw}×${rh}  ${kb} KB`);
      })());
    }
  }

  if (tasks.length === 0) {
    console.log(`  ${photo.slug}: up to date`);
    return;
  }
  await Promise.all(tasks);
}

console.log('process-gallery: encoding album "Box Elder Peak"…\n');
for (const photo of photos) {
  console.log(`▸ ${photo.slug}`);
  await processPhoto(photo);
}
console.log('\nprocess-gallery: done');
