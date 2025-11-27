const fs = require('fs');
const path = require('path');
const dist = path.resolve(__dirname, '..', 'dist');
const index = path.join(dist, 'index.html');
const four = path.join(dist, '404.html');

if (fs.existsSync(index)) {
  fs.copyFileSync(index, four);
  console.log('Created 404.html for GitHub Pages SPA fallback');
} else {
  console.warn('index.html not found in dist; skipping 404 copy');
}
