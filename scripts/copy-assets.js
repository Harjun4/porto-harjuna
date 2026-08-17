const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'Foto.jpeg');
const destDir = path.join(__dirname, '..', 'public');
const dest = path.join(destDir, 'Foto.jpeg');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('Successfully copied Foto.jpeg to public/Foto.jpeg');
}
