import sharp from "sharp";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

const ICONS_DIR = join(process.cwd(), "public", "icons");
const SVG_PATH = join(ICONS_DIR, "logo.svg");

const sizes = [
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
];

async function generateIcons() {
  const svgBuffer = await sharp(SVG_PATH).toBuffer();

  for (const { name, size } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(ICONS_DIR, name));
    console.log(`Generated ${name} (${size}x${size})`);
  }

  console.log("All icons generated successfully!");
}

generateIcons().catch(console.error);