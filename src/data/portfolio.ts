export type PortfolioCategory =
  | "blackwork"
  | "sombras"
  | "oriental"
  | "color"
  | "covers"
  | "fineline"
  | "flash";

/**
 * Categorías del portfolio en el orden exacto en que deben mostrarse,
 * tanto en los badges como en el auto-avance del carrusel.
 *
 * `folder` es el nombre real del directorio dentro de /public/portfolio.
 * Dos de ellos tienen nombres "sucios" (un guion final y un espacio) que
 * mapeamos acá a un `id`/`label` limpios para la UI y las URLs.
 */
export const categories: {
  id: PortfolioCategory;
  label: string;
  folder: string;
}[] = [
  { id: "blackwork", label: "Blackwork", folder: "blackwork" },
  { id: "sombras", label: "Sombras", folder: "sombras" },
  { id: "oriental", label: "Oriental", folder: "oriental" },
  { id: "color", label: "Color", folder: "color-" },
  { id: "covers", label: "Covers", folder: "covers" },
  { id: "fineline", label: "Fine Line", folder: "fine line" },
  { id: "flash", label: "Flash", folder: "flash" },
];

export const categoryOrder: PortfolioCategory[] = categories.map((c) => c.id);
