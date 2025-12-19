const fs = require('fs');
const path = require('path');

// Copia recursivamente uma pasta
function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }

  fs.readdirSync(from).forEach(element => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);

    if (fs.lstatSync(fromPath).isFile()) {
      fs.copyFileSync(fromPath, toPath);
    } else {
      copyFolderSync(fromPath, toPath);
    }
  });
}

// Remove pasta public se existir
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  fs.rmSync(publicDir, { recursive: true, force: true });
}

// Copia frontend/dist para public
const sourceDir = path.join(__dirname, 'frontend', 'dist');
copyFolderSync(sourceDir, publicDir);

console.log('✅ Build copiado de frontend/dist para public/');
