/**
 * Generates the raster icon set from public/icon.svg.
 *
 * The SVG alone is not enough. Chrome requests /favicon.ico whether or not
 * the page links one, and caches favicons per-domain for a long time — so a
 * missing .ico leaves whatever the domain served previously sitting in the
 * tab. iOS ignores SVG for apple-touch-icon entirely and needs a PNG.
 *
 * Run with: npm run icons
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const PUBLIC = join(process.cwd(), 'public');
const SOURCE = join(PUBLIC, 'icon.svg');

/** Sizes bundled into favicon.ico. 48 is used by Windows taskbar pins. */
const ICO_SIZES = [16, 32, 48];

const PNG_OUTPUTS = [
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
];

/**
 * Wraps PNG buffers in an ICO container.
 *
 * ICO entries may hold PNG data directly rather than BMP, which every
 * browser in use has supported for well over a decade and keeps the file
 * small. A size of 256 is written as 0, per the format.
 */
function buildIco(images) {
  const HEADER = 6;
  const ENTRY = 16;

  const header = Buffer.alloc(HEADER);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(images.length, 4);

  let offset = HEADER + ENTRY * images.length;

  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(ENTRY);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette size, 0 for truecolour
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

async function main() {
  const svg = readFileSync(SOURCE);

  // density lifts the rasteriser above the SVG's 120px viewBox so the small
  // sizes come out sharp rather than resampled from a 120px render.
  const render = (size) =>
    sharp(svg, { density: 384 }).resize(size, size, { fit: 'contain' }).png({ compressionLevel: 9 }).toBuffer();

  const icoImages = [];
  for (const size of ICO_SIZES) {
    icoImages.push({ size, data: await render(size) });
  }
  const ico = buildIco(icoImages);
  writeFileSync(join(PUBLIC, 'favicon.ico'), ico);
  console.log(`[icons] favicon.ico       ${ICO_SIZES.join('/')}px  ${ico.length} bytes`);

  for (const { size, name } of PNG_OUTPUTS) {
    const data = await render(size);
    writeFileSync(join(PUBLIC, name), data);
    console.log(`[icons] ${name.padEnd(20)} ${size}px  ${data.length} bytes`);
  }
}

main().catch((err) => {
  console.error('[icons] failed:', err.message);
  process.exit(1);
});
