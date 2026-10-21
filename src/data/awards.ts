/**
 * Reconocimientos del estudio para la sección "El fruto del ritual".
 *
 * El orden del array define el orden en el carrusel. Los `src` apuntan a
 * `public/trofeos/`; los nombres de archivo contienen espacios, por eso se
 * codifican con %20 en la URL. Cada pieza lleva un `caption` (pie de foto)
 * con un tono místico/ceremonial, coherente con la narrativa del sitio.
 */
export type AwardItem = {
  id: string;
  /** Ruta pública de la imagen (con espacios codificados como %20). */
  src: string;
  /** Texto accesible / título corto de la pieza. */
  title: string;
  /** Pie de foto mostrado debajo de la imagen en el carrusel. */
  caption: string;
};

export const awardItems: AwardItem[] = [
  {
    id: "trofeos",
    src: "/trofeos/Trofeos.png",
    title: "Reconocimientos del estudio",
    caption:
      "El tatuaje como consagración del ritual y el testimonio indeleble.",
  },
  {
    id: "alicia-1",
    src: "/trofeos/1er%20LugarAlicia.jpeg",
    title: "1er Lugar · Alicia",
    caption:
      "Primer trazo, primera ofrenda. Cada línea nace del silencio antes de la aguja.",
  },
  {
    id: "alicia-2",
    src: "/trofeos/2do%20LugarAlicia.jpeg",
    title: "2do Lugar · Alicia",
    caption:
      "La piel recuerda lo que la mente olvida. Honramos cada historia que decide quedarse.",
  },
  {
    id: "mythology-1",
    src: "/trofeos/1er%20LugarMythology.png",
    title: "1er Lugar · Mythology Tattoo Fest",
    caption:
      "Donde el mito se vuelve carne. El reconocimiento es solo el eco de la devoción al oficio.",
  },
  {
    id: "socaha-2",
    src: "/trofeos/2do%20Lugar%20SocahaBlackwork.png",
    title: "2do Lugar · Socaha Blackwork",
    caption:
      "Negro sobre piel, sombra sobre luz. El blackwork como juramento de permanencia.",
  },
];
