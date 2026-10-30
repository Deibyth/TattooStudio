"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import PortfolioCarousel from "./PortfolioCarousel";
import RevealTitle from "@/components/RevealTitle";
import { REVEAL_TITLES } from "@/data/revealTitles";
import type { PortfolioCategory } from "@/data/portfolio";

export type GalleryItem = {
  id: string;
  src: string;
  title: string;
  placeholderFilter?: string;
};

type Group = {
  id: PortfolioCategory;
  label: string;
  items: GalleryItem[];
};

/** Duración del fundido al cambiar de categoría. */
const FADE_MS = 500;

export default function Portfolio() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        setGroups(Array.isArray(data.groups) ? data.groups : []);
      })
      .catch(() => {
        if (active) setGroups([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  /**
   * Transiciona a la categoría `target` con fundido: fade out -> cambia el
   * índice (el carrusel resetea su posición mientras está invisible) -> fade in.
   */
  const goToCategory = useCallback(
    (target: number) => {
      if (groups.length === 0) return;
      setVisible(false); // fade out
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
      fadeTimer.current = setTimeout(() => {
        setActiveIndex(((target % groups.length) + groups.length) % groups.length);
        setVisible(true); // fade in con la nueva categoría ya montada
      }, FADE_MS);
    },
    [groups.length],
  );

  useEffect(() => {
    return () => {
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, []);

  // Auto-avance: NO por tiempo fijo, sino cuando el carrusel termina de
  // recorrer TODAS las fotos de la categoría actual una vuelta completa.
  // Así cada folder se muestra entero sin importar cuántas fotos tenga.
  const handleCycleComplete = useCallback(() => {
    if (groups.length <= 1) return;
    goToCategory(activeIndex + 1);
  }, [activeIndex, groups.length, goToCategory]);

  // Clic manual en un badge: salta a esa categoría.
  const handleBadgeClick = (index: number) => {
    if (index === activeIndex) return;
    goToCategory(index);
  };

  const activeGroup = groups[activeIndex];

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
          className="text-center mb-10 px-6"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-blanco-washi">
            Galería
          </span>
          <RevealTitle
            as="h2"
            {...REVEAL_TITLES.portfolio}
            className="mt-3 text-4xl md:text-5xl font-display text-blanco-washi"
          />
          <div className="w-12 h-1 bg-rojo-torii-600 mx-auto mt-5" />
          <p className="mt-5 text-gris-secundario font-light max-w-xl mx-auto">
            Desliza, arrastra o deja que la galería fluya. Cada pieza es única, creada a medida.
          </p>

          {/* Badges de categoría: marco + letra blanca, rojo al hover/activo */}
          {!loading && groups.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {groups.map((group, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => handleBadgeClick(index)}
                    aria-pressed={isActive}
                    className={`rounded-none border px-5 py-2 text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                      isActive
                        ? "border-rojo-torii-500 text-rojo-torii-500"
                        : "border-blanco-washi text-blanco-washi hover:border-rojo-torii-500 hover:text-rojo-torii-500"
                    }`}
                  >
                    {group.label}
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* Carrusel full-width: ocupa todo el ancho de pantalla */}
      {loading ? (
        <div className="h-[400px] md:h-[440px] flex items-center justify-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gris-secundario">
            Cargando galería…
          </span>
        </div>
      ) : groups.length === 0 ? (
        <div className="h-[400px] md:h-[440px] flex items-center justify-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gris-secundario">
            Galería en preparación.
          </span>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: FADE_MS / 1000, ease: "easeInOut" }}
        >
          <PortfolioCarousel
            items={activeGroup?.items ?? []}
            onCycleComplete={handleCycleComplete}
          />
        </motion.div>
      )}
    </section>
  );
}
