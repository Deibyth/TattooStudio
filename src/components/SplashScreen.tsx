"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

/**
 * Splash screen de carga: cubre toda la ventana con el logo centrado
 * en un círculo rojo (rojo torii) y un destello dorado. Se mantiene al
 * menos MIN_VISIBLE_MS para que la marca se registre, y hace fade out
 * escalando hasta revelar el contenido detrás.
 */
const MIN_VISIBLE_MS = 1800;
const FADE_OUT_MS = 700;

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), MIN_VISIBLE_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-carbon-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_MS / 1000, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden
                bg-rojo-torii-600 shadow-[0_0_40px_rgba(217,4,41,0.5)]"
            >
              <Image
                src="/logo.jpg"
                alt="ARTNALDO Tattoo"
                fill
                priority
                sizes="128px"
                className="object-cover mix-blend-luminosity"
              />
              {/* aro dorado interior */}
              <div className="absolute inset-1.5 rounded-full border border-oro-kintsugi/60 pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
              className="font-display text-2xl md:text-3xl tracking-[0.35em] text-blanco-washi font-semibold"
            >
              ARTNALDO{" "}
              <span className="text-xs md:text-sm tracking-[0.2em] text-oro-kintsugi uppercase -ml-1">
                Tattoo Studio
              </span>
            </motion.div>

            {/* línea con pulso rojo */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
              className="relative h-px w-48 bg-carbon-600"
            >
              <motion.div
                className="absolute inset-0 bg-rojo-torii-500"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}