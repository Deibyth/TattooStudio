"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import PortfolioCarousel from "./PortfolioCarousel";

export type GalleryItem = {
  id: string;
  src: string;
  title: string;
  placeholderFilter?: string;
};

export default function Portfolio() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        setItems(Array.isArray(data.items) ? data.items : []);
      })
      .catch(() => {
        if (active) setItems([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="portafolio"
      className="relative py-28 px-6 bg-carbon-900 border-y border-carbon-800 overflow-hidden"
    >
      {/* watermark de fondo: rojo torii, ahora protagonista con pulso de luz */}
      <motion.div
        className="pointer-events-none absolute -right-40 -top-40 w-[650px] h-[650px] rounded-full bg-rojo-torii-600/30 blur-[110px]"
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute -right-12 -top-12 w-[300px] h-[300px] rounded-full bg-rojo-torii-500/50 blur-[70px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 w-[400px] h-[400px] rounded-full bg-oro-kintsugi/5 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 px-6"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-oro-kintsugi">
            Galería
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-display text-blanco-washi">
            PORTAFOLIO
          </h2>
          <div className="w-12 h-1 bg-rojo-torii-600 mx-auto mt-5" />
          <p className="mt-5 text-gris-secundario font-light max-w-xl mx-auto">
            Desliza, arrastra o deja que la galería fluya. Cada pieza es única, creada a medida.
          </p>
        </motion.div>
      </div>

      {/* Carrusel full-width: ocupa todo el ancho de pantalla, sin límite max-w */}
      <AnimatePresence mode="wait">
        <motion.div
          key="all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {loading ? (
            <div className="h-[400px] md:h-[440px] flex items-center justify-center">
              <span className="text-xs uppercase tracking-[0.3em] text-gris-secundario">
                Cargando galería…
              </span>
            </div>
          ) : (
            <PortfolioCarousel items={items} />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}