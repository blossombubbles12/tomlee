import fs from "fs";
import path from "path";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const SLIDERS_DIR = path.join(process.cwd(), "public", "images", "sliders");
const SUPPORTED_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);

function readDir(dir: string): string[] {
  try {
    const files = fs.readdirSync(dir);
    return files
      .filter((f) => SUPPORTED_EXT.has(path.extname(f).toLowerCase()))
      .map((f) => `/images/${path.relative(IMAGES_DIR, path.join(dir, f)).replace(/\\/g, "/")}`);
  } catch {
    return [];
  }
}

export function getImages(): string[] {
  return readDir(IMAGES_DIR).filter((p) => !p.startsWith("/images/sliders/"));
}

export function pickImages(count: number): string[] {
  const images = getImages();
  return [...images].sort((a, b) => a.localeCompare(b)).slice(0, Math.min(count, images.length));
}

export function getSliderImages(): string[] {
  return readDir(SLIDERS_DIR);
}

export function pickSliderImages(count: number): string[] {
  const images = getSliderImages();
  return [...images].sort((a, b) => a.localeCompare(b)).slice(0, Math.min(count, images.length));
}
