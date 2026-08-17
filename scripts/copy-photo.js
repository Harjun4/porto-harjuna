const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const imageSrcDir = path.join(rootDir, 'image');
const publicImageDir = path.join(publicDir, 'image');

try {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (!fs.existsSync(publicImageDir)) {
    fs.mkdirSync(publicImageDir, { recursive: true });
  }

  // Copy all files from image/ to public/image/ and public/
  if (fs.existsSync(imageSrcDir)) {
    const files = fs.readdirSync(imageSrcDir);
    files.forEach((file) => {
      const srcFile = path.join(imageSrcDir, file);
      if (fs.statSync(srcFile).isFile()) {
        fs.copyFileSync(srcFile, path.join(publicImageDir, file));
        fs.copyFileSync(srcFile, path.join(publicDir, file));
        console.log(`[Asset Setup] Copied ${file} to public/ & public/image/`);
      }
    });
  }

  // Set favicon from HRJN Logo.jpg
  const logoFile = path.join(imageSrcDir, 'HRJN Logo.jpg');
  if (fs.existsSync(logoFile)) {
    fs.copyFileSync(logoFile, path.join(publicDir, 'favicon.ico'));
  }
} catch (err) {
  console.error('[Asset Setup Error]', err);
}

