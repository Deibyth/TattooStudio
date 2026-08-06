"use client";

import { motion } from "motion/react";

/**
 * Divisor decorativo: dos katanas horizontales que emergen desde cada
 * extremo y sus puntas se encuentran en el centro, con un pequeño
 * destello rojo marcando el punto de encuentro.
 */
export default function KatanaDivider() {
  return (
    <div className="relative h-16 w-full max-w-7xl mx-auto overflow-visible flex items-center justify-center">
      <svg viewBox="0 0 1200 80" className="w-full h-16" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="katana-line-left" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C5A059" stopOpacity="0" />
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="katana-line-right" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C5A059" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
          </linearGradient>
          <filter id="katana-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* líneas tenues que conducen la mirada hacia las katanas */}
        <motion.line
          x1="0" y1="40" x2="140" y2="40"
          stroke="url(#katana-line-left)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
        <motion.line
          x1="1060" y1="40" x2="1200" y2="40"
          stroke="url(#katana-line-right)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />

        {/* katana izquierda: pomo + empuñadura + guarda + hoja apuntando al centro */}
        <motion.g
          filter="url(#katana-glow)"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <circle cx="148" cy="40" r="3" fill="#C5A059" />
          <line x1="151" y1="40" x2="176" y2="40" stroke="#C5A059" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="177" y1="30" x2="177" y2="50" stroke="#C5A059" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M179,37.2 L597,39.7 L599,40 L597,40.3 L179,42.8 Z" fill="#C5A059" />
        </motion.g>

        {/* katana derecha: espejo de la izquierda */}
        <motion.g
          filter="url(#katana-glow)"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        >
          <circle cx="1052" cy="40" r="3" fill="#C5A059" />
          <line x1="1049" y1="40" x2="1024" y2="40" stroke="#C5A059" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="1023" y1="30" x2="1023" y2="50" stroke="#C5A059" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M1021,37.2 L603,39.7 L601,40 L603,40.3 L1021,42.8 Z" fill="#C5A059" />
        </motion.g>

        {/* destello rojo donde se encuentran las puntas */}
        <motion.circle
          cx="600" cy="40" r="3.5"
          fill="#D90429"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: [0, 1.4, 1], opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
