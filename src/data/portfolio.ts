export type PortfolioCategory =
  | "mascaras"
  | "fauna"
  | "blackwork"
  | "flash";

export const categories: { id: PortfolioCategory; label: string }[] = [
  { id: "mascaras", label: "Máscaras & Mitología" },
  { id: "fauna", label: "Fauna & Flora" },
  { id: "blackwork", label: "Blackwork Puro" },
  { id: "flash", label: "Flash Tattoos" },
];

export type PortfolioItem = {
  id: string;
  category: PortfolioCategory;
  title: string;
  /**
   * Reemplazá `src` por la foto real cuando la tengas, por ejemplo:
   * "/portfolio/mascaras-01.jpg". Mientras tanto usamos /fondo.png
   * como placeholder con un filtro distinto por pieza.
   */
  src: string;
  /** Filtro CSS temporal solo para diferenciar placeholders visualmente. */
  placeholderFilter: string;
};

// PLACEHOLDER DATA — reemplazar `src` por fotos reales en /public/portfolio
// (ver LEEME.md). El resto de la estructura (id, category, title) puede
// quedar igual o ajustarse al contenido real.
export const portfolioItems: PortfolioItem[] = [
  { id: "m1", category: "mascaras", title: "Hannya en Sombra", src: "/fondo.png", placeholderFilter: "grayscale(100%) contrast(1.2)" },
  { id: "m2", category: "mascaras", title: "Kitsune Nocturno", src: "/fondo.png", placeholderFilter: "grayscale(100%) sepia(0.15) contrast(1.1)" },
  { id: "m3", category: "mascaras", title: "Oni Ceremonial", src: "/fondo.png", placeholderFilter: "grayscale(100%) brightness(0.9) contrast(1.3)" },
  { id: "m4", category: "mascaras", title: "Tengu Guardián", src: "/fondo.png", placeholderFilter: "grayscale(90%) hue-rotate(-10deg)" },

  { id: "f1", category: "fauna", title: "Koi entre Sombras", src: "/fondo.png", placeholderFilter: "grayscale(100%) hue-rotate(200deg) saturate(0.6)" },
  { id: "f2", category: "fauna", title: "Cuervo & Sakura", src: "/fondo.png", placeholderFilter: "grayscale(100%) contrast(1.4)" },
  { id: "f3", category: "fauna", title: "Serpiente Kintsugi", src: "/fondo.png", placeholderFilter: "grayscale(95%) sepia(0.2)" },
  { id: "f4", category: "fauna", title: "Crisantemo Oscuro", src: "/fondo.png", placeholderFilter: "grayscale(100%) brightness(1.05)" },

  { id: "b1", category: "blackwork", title: "Trazo Absoluto I", src: "/fondo.png", placeholderFilter: "grayscale(100%) contrast(1.5) brightness(0.85)" },
  { id: "b2", category: "blackwork", title: "Geometría Ritual", src: "/fondo.png", placeholderFilter: "grayscale(100%) contrast(1.6)" },
  { id: "b3", category: "blackwork", title: "Manto de Tinta", src: "/fondo.png", placeholderFilter: "grayscale(100%) brightness(0.8) contrast(1.4)" },
  { id: "b4", category: "blackwork", title: "Trazo Absoluto II", src: "/fondo.png", placeholderFilter: "grayscale(100%) contrast(1.3) brightness(0.95)" },

  { id: "x1", category: "flash", title: "Flash Torii", src: "/fondo.png", placeholderFilter: "grayscale(100%) sepia(0.1) contrast(1.2)" },
  { id: "x2", category: "flash", title: "Flash Luna", src: "/fondo.png", placeholderFilter: "grayscale(90%) contrast(1.1)" },
  { id: "x3", category: "flash", title: "Flash Daruma", src: "/fondo.png", placeholderFilter: "grayscale(100%) hue-rotate(15deg) saturate(0.5)" },
  { id: "x4", category: "flash", title: "Flash Onda", src: "/fondo.png", placeholderFilter: "grayscale(100%) contrast(1.25)" },
];
