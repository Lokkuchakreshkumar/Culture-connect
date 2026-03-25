import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dances = [
  { name: "kuchipudi", id: "0LGRK2Pm-jU" },
  { name: "bharatanatyam", id: "Ud7IBiO5VEE" },
  { name: "kathakali", id: "C5aHZmTnB3I" },
  { name: "kathak", id: "CsJr49YW-IM" },
  { name: "odissi", id: "LCoFqdyNhRs" },
  { name: "manipuri", id: "Lk5Xu-Zl8kc" },
  { name: "sattriya", id: "bis5fXDR1VA" },
  { name: "garba", id: "6MkllyTuDUg" },
  { name: "bhangra", id: "DLHP-lokgJY" },
  { name: "lavani", id: "qbaQoJnmwzE" },
  { name: "ghoomar", id: "YWU-NIqot54" },
  { name: "bihu", id: "57e6xbb1S9M" },
  { name: "yakshagana", id: "CcDZnE6Ng-0" },
  { name: "chhau", id: "YMSgo33L-os" },
  { name: "cheraw", id: "afKNUWXKSt8" },
  { name: "rouf", id: "cgymZErBRWE" },
  { name: "bardo_chham", id: "XN1XImKSeH4" },
  { name: "bidesiya", id: "YTEj-9pUH_k" },
  { name: "karma_naach", id: "XS-Tw0YwPDQ" },
  { name: "fugdi", id: "jB1cHoj_ECQ" },
  { name: "phag_dance", id: "v9yw1mzo-C0" },
  { name: "nati", id: "m4eA6c2wsNU" },
  { name: "matki_dance", id: "h0e4dMpphbk" },
  { name: "laho", id: "SzVfJkiuVu0" },
  { name: "chang_lo", id: "bFjz13YM30g" },
  { name: "singhi_chham", id: "tNOw8fk6Pj0" },
  { name: "perini", id: "97ujp7Oetlw" },
  { name: "hojagiri", id: "e8j0P8V5kNM" },
  { name: "choliya", id: "_MNAn2htMUk" },
  { name: "shondol", id: "PE-OBpbwYb8" }
];

const targetDir = path.join(__dirname, '../public/images/dances');

// Create directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Remove existing images
console.log('Cleaning existing images...');
const files = fs.readdirSync(targetDir);
for (const file of files) {
  fs.unlinkSync(path.join(targetDir, file));
}

async function downloadImage(name, id) {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1000`;
  const filePath = path.join(targetDir, `${name}.jpg`);
  
  console.log(`Downloading ${name} (${id})...`);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    console.log(`Saved ${name}.jpg`);
  } catch (error) {
    console.error(`Error downloading ${name}:`, error.message);
  }
}

async function main() {
  for (const dance of dances) {
    await downloadImage(dance.name, dance.id);
  }
  console.log('All downloads complete!');
}

main();
