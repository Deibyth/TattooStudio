import { readdir } from "node:fs/promises";
import path from "node:path";
import { categories, type PortfolioCategory } from "@/data/portfolio";

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function isImage(file: string) {
  return IMAGE_EXTS.has(path.extname(file).toLowerCase());
}

/** Convierte "IMG_20250804_181032.jpg" en "IMG 20250804 181032". */
function humanize(file: string) {
  return file
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

/** Codifica cada segmento de la ruta para soportar espacios y símbolos. */
function toPublicUrl(folder: string, file: string) {
  return `/portfolio/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}

export type PortfolioApiItem = {
  id: string;
  src: string;
  title: string;
  category: PortfolioCategory;
};

export type PortfolioApiGroup = {
  id: PortfolioCategory;
  label: string;
  items: PortfolioApiItem[];
};

// Re-leer los directorios en cada request para que las imágenes nuevas
// aparezcan sin necesidad de rebuild ni reiniciar.
export const dynamic = "force-dynamic";

export async function GET() {
  const base = path.join(process.cwd(), "public", "portfolio");

  const groups: PortfolioApiGroup[] = await Promise.all(
    categories.map(async (cat) => {
      let files: string[] = [];
      try {
        files = await readdir(path.join(base, cat.folder));
      } catch {
        // La carpeta no existe aún -> categoría vacía.
      }

      const items = files
        .filter(isImage)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map<PortfolioApiItem>((file) => ({
          id: `${cat.id}-${file}`,
          src: toPublicUrl(cat.folder, file),
          title: humanize(file),
          category: cat.id,
        }));

      return { id: cat.id, label: cat.label, items };
    }),
  );

  // Solo devolvemos categorías que efectivamente tengan fotos, preservando
  // el orden definido en `categories`.
  return Response.json({ groups: groups.filter((g) => g.items.length > 0) });
}
