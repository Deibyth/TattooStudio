"use client";

import { motion } from "motion/react";
import { SITE } from "@/lib/site";

/**
 * Sección de ubicación con mapa de Google embebido.
 *
 * Se renderiza justo antes del Footer para invitar al visitante a conocer
 * el estudio. El iframe usa `loading="lazy"` (carga diferida) y se ajusta
 * automáticamente a cualquier ancho de pantalla gracias al contenedor con
 * aspect-ratio, así que no hay recorte ni scroll interno en móvil.
 *
 * TODO: cuando el estudio tenga dirección pública, reemplazar el texto
 * "Bogotá D.C., Colombia" y afinar el título llamativo si se prefiere otra
 * frase de marca.
 */

/** URL del embed oficial del estudio (Google Maps Embed API). */
const STUDIO_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.55242570828298!2d-74.13742028326351!3d4.622830907916801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9d5c58c4742b%3A0xa6d02457567666da!2sThermuthis%20Tattoo!5e0!3m2!1ses!2sco!4v1786165820327!5m2!1ses!2sco";

/** Enlace directo a Google Maps para "Cómo llegar" (mismas coordenadas del embed). */
const STUDIO_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "4.622830907916801,-74.13742028326351"
)}`;

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function MapSection() {
  return (
    <section
      id="ubicacion"
      className="relative z-10 py-24 px-6 bg-carbon-900/95 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Copia de invitación */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-8 max-w-xl"
        >
          <div className="inline-block px-4 py-1.5 border border-rojo-torii-600/30 rounded-full text-xs font-semibold tracking-widest text-rojo-torii-500 uppercase bg-carbon-800/50 backdrop-blur-sm">
            Ubicación · Bogotá
          </div>

          <h2 className="text-4xl md:text-5xl font-display text-blanco-washi leading-[1.15] tracking-tight">
            LA TINTA
            <br />
            TE ESPERA
          </h2>

          <div className="w-12 h-1 bg-rojo-torii-600" />

          <p className="text-lg text-gris-secundario font-light leading-relaxed">
            Acércate y conoce el espacio donde el papel se vuelve piel.
            Coordina tu visita, camina hasta el estudio y déjanos diseñar
            contigo la pieza que ya tienes en la cabeza.
          </p>

          <div className="flex items-start gap-3 text-sm text-gris-secundario font-light">
            <MapPinIcon className="w-5 h-5 text-oro-kintsugi shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              Bogotá D.C., Colombia · Thermuthis Tattoo
              <br />
              Agenda previa{" "}
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-oro-kintsugi font-medium hover:text-blanco-washi hover:underline underline-offset-4 transition-colors"
              >
                por WhatsApp
              </a>
            </span>
          </div>

          <motion.a
            href={STUDIO_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-8 py-4 text-sm font-bold tracking-widest uppercase text-blanco-washi border border-oro-kintsugi/40 hover:border-oro-kintsugi hover:bg-carbon-800 hover:shadow-[0_0_18px_rgba(197,160,89,0.2)] transition-all duration-300 cursor-pointer"
          >
            Cómo llegar →
          </motion.a>
        </motion.div>

        {/* Mapa */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative border border-carbon-700 rounded-sm overflow-hidden group"
        >
          <div className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3]">
            <iframe
              src={STUDIO_EMBED_URL}
              title="Mapa del estudio Thermuthis Tattoo en Bogotá"
              width="600"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
          <div className="absolute inset-0 border border-oro-kintsugi/20 group-hover:border-oro-kintsugi/50 m-4 rounded-sm z-20 pointer-events-none transition-colors duration-500" />
        </motion.div>
      </div>
    </section>
  );
}