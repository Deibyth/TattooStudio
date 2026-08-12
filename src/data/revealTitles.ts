/**
 * Pares JP (decorativo) / ES (contenido real) para los títulos con animación
 * de revelado. Centralizados aquí para ajustar traducciones sin tocar
 * componentes.
 *
 * IMPORTANTE: las traducciones japonesas son intenciones poéticas/temáticas,
 * NO traducciones literales. Deben validarse con un hablante nativo o
 * traductor especializado antes de producción.
 */
export const REVEAL_TITLES = {
  hero: {
    jp: "墨と影",
    es: "TINTA &\nSOMBRA",
    esLineClassNames: [
      "",
      "text-transparent bg-clip-text bg-gradient-to-br from-blanco-washi to-carbon-600",
    ],
  },
  portfolio: {
    jp: "作品集",
    es: "PORTAFOLIO",
  },
  ritual: {
    jp: "墨の前の儀式",
    es: "EL RITUAL ANTES\nDE LA TINTA",
  },
  map: {
    jp: "墨が待っている",
    es: "LA TINTA\nTE ESPERA",
  },
  footer: {
    jp: "次の一作の準備は?",
    es: "¿LISTO PARA TU PRÓXIMA PIEZA?",
  },
} as const;