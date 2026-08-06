import { readdir } from "node:fs/promises";
import path from "node:path";
import { portfolioItems } from "@/data/portfolio";

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function isImage(file: string) {
  return IMAGE_EXTS.has(path.extname(file).toLowerCase());
}

/** Convierte "mascara-num-01.jpg" en "mascara num 01". */
function humanize(file: string) {
  return file
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

// Re-leer el directorio en cada request para que las imágenes nuevas
// aparezcan sin necesidad de rebuild ni reiniciar.
export const dynamic = "force-dynamic";

export async function GET() {
  const dir = path.join(process.cwd(), "public", "portfolio");

  let files: string[] = [];
  try {
    files = await readdir(dir);
  } catch {
    // carpeta no existe aún -> caemos a los placeholders
  }

  const images = files
    .filter(isImage)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  // Si todavía no hay fotos reales, mostramos los placeholders actuales
  // para que el carrusel no quede vacío. En cuanto cargues imágenes,
  // reemplaza automáticamente.
  if (images.length === 0) {
    return Response.json({
      items: portfolioItems.map((p) => ({
        id: p.id,
        src: p.src,
        title: p.title,
        placeholderFilter: p.placeholderFilter,
      })),
    });
  }

  return Response.json({
    items: images.map((f, i) => ({
      id: `${i}-${f}`,
      src: `/portfolio/${f}`,
      title: humanize(f),
    })),
  });
}