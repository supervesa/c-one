import fs from 'fs';

// 1. Luetaan nykyinen package.json
const pkgPath = './package.json';
const pkgInfo = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

// 2. Varmistetaan että dependencies-lohko on olemassa ja lisätään puuttuvat
pkgInfo.dependencies = pkgInfo.dependencies || {};
pkgInfo.dependencies['lucide-react'] = '^0.300.0';
pkgInfo.dependencies['react-router-dom'] = '^6.20.0';

// 3. Kirjoitetaan muutokset takaisin tiedostoon
fs.writeFileSync(pkgPath, JSON.stringify(pkgInfo, null, 2), 'utf8');

console.log('\\n[ ! ] Pakotettu injektio suoritettu: lucide-react ja react-router-dom lisätty package.json -tiedostoon.');
console.log('-> Jos olet StackBlitzissä, asennus alkaa nyt automaattisesti taustalla.');
console.log('-> Jos olet paikallisessa ympäristössä, aja vielä kerran komento: npm install');