/**
 * Zips ./out into ./site.zip for manual upload to Hostinger.
 *
 * hPanel's File Manager can extract a zip in place, which is far faster and
 * far more reliable than dragging ~200 loose files over FTP.
 *
 * The one thing that matters here is that **.htaccess is included**. It is a
 * dotfile, and the naive `Compress-Archive -Path out\*` on Windows silently
 * skips dotfiles — which would ship the site without its redirects, caching
 * and HTTPS rules. Both branches below force hidden files in.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const OUT = join(ROOT, 'out');
const ZIP = join(ROOT, 'site.zip');

if (!existsSync(OUT)) {
  console.error('[package] ./out not found — run `npm run build` first.');
  process.exit(1);
}
if (!existsSync(join(OUT, '.htaccess'))) {
  console.error('[package] out/.htaccess missing — run `npm run build`, not `next build`.');
  process.exit(1);
}

if (existsSync(ZIP)) rmSync(ZIP);

try {
  if (process.platform === 'win32') {
    // -Force makes Get-ChildItem return dotfiles such as .htaccess.
    execFileSync(
      'powershell',
      [
        '-NoProfile',
        '-NonInteractive',
        '-Command',
        `Compress-Archive -Path (Get-ChildItem -LiteralPath '${OUT}' -Force | ForEach-Object { $_.FullName }) -DestinationPath '${ZIP}' -Force`,
      ],
      { stdio: 'inherit' }
    );
  } else {
    execFileSync('zip', ['-r', '-q', ZIP, '.', '-x', '.DS_Store'], {
      cwd: OUT,
      stdio: 'inherit',
    });
  }
} catch (err) {
  console.error('[package] zip failed:', err.message);
  process.exit(1);
}

const mb = (statSync(ZIP).size / 1024 / 1024).toFixed(2);
console.log(`\n[package] wrote site.zip (${mb} MB)`);
console.log('\nUpload it in hPanel:');
console.log('  Files > File Manager > public_html');
console.log('  Upload site.zip, right-click it, Extract, then delete the zip.');
console.log('\nThen confirm .htaccess is present — turn on "Show hidden files" in the');
console.log('File Manager settings menu, or the redirects and caching will be missing.');
