#!/usr/bin/env node
/**
 * Image optimization pipeline.
 *
 * Reads source images from `public/` (high-resolution masters checked into
 * the repo) and emits responsive variants into `public/img/` at three
 * widths × three formats. The site references the generated files via
 * <picture>/<source srcset>/<img> so each device downloads the smallest
 * suitable bytes.
 *
 * Run automatically as `prebuild`. Skips work when the output is newer
 * than the source so local rebuilds are fast.
 */

import { existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = dirname(__dirname);
// Source masters live OUTSIDE public/ so they are not copied verbatim into
// the production build by Vite. Generated variants land in public/img/ so
// Vite ships them as static assets.
const srcDir = join(root, 'images-src');
const outDir = join(root, 'public', 'img');

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

/**
 * @typedef {Object} ImageSpec
 * @property {string} source   - filename inside public/
 * @property {string} basename - basename used for output files
 * @property {number[]} widths - target widths in CSS px (we encode at 1x;
 *                               retina is covered by the larger widths)
 */

/** @type {ImageSpec[]} */
const images = [
  {
    source: 'homepage.jpg',
    basename: 'homepage',
    // Hero is full-bleed: cover mobile (~480 CSS px wide × 2dpr = 960),
    // tablet (~1024 × 2dpr = 2048), and desktop+retina (up to 2880).
    widths: [1024, 1920, 2880],
  },
  {
    source: 'profile.jpeg',
    basename: 'profile',
    // Portrait renders at h-32/h-40 (128/160 CSS px). 480 covers 3dpr.
    widths: [160, 320, 480],
  },
];

/** @type {{format: 'avif'|'webp'|'jpeg', ext: 'avif'|'webp'|'jpg', opts: object}[]} */
const formats = [
  { format: 'avif', ext: 'avif', opts: { quality: 55, effort: 6 } },
  { format: 'webp', ext: 'webp', opts: { quality: 78, effort: 6 } },
  { format: 'jpeg', ext: 'jpg', opts: { quality: 82, mozjpeg: true, progressive: true } },
];

function newer(a, b) {
  try {
    return statSync(a).mtimeMs > statSync(b).mtimeMs;
  } catch {
    return true; // missing destination ⇒ needs build
  }
}

async function processOne(spec) {
  const src = join(srcDir, spec.source);
  if (!existsSync(src)) {
    console.warn(`! missing source: ${src} — skipping`);
    return;
  }

  const tasks = [];
  for (const width of spec.widths) {
    for (const fmt of formats) {
      const out = join(outDir, `${spec.basename}-${width}.${fmt.ext}`);
      if (!newer(src, out)) {
        continue; // up to date
      }
      tasks.push(
        sharp(src)
          .rotate() // honor EXIF orientation
          .resize({ width, withoutEnlargement: true })
          .toFormat(fmt.format, fmt.opts)
          .toFile(out)
          .then((info) => {
            const kb = (info.size / 1024).toFixed(1);
            console.log(`  ${spec.basename}-${width}.${fmt.ext} — ${kb} KB`);
          }),
      );
    }
  }
  if (tasks.length === 0) {
    console.log(`  ${spec.basename}: already up to date`);
  }
  await Promise.all(tasks);
}

console.log('optimize-images: encoding responsive variants…');
for (const spec of images) {
  await processOne(spec);
}
console.log('optimize-images: done');
