"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { InstagramIcon, WhatsAppIcon } from "./SocialIcons";

/**
 * Iconos de marca (Instagram, WhatsApp) definidos en SocialIcons.tsx para
 * reutilizarse entre header y footer (única fuente de verdad).
 */

/** URL de WhatsApp para iniciar conversación de cotización / agenda. */
const initWhatsAppUrl =
  "https://api.whatsapp.com/send/?phone=573228851584&text=%F0%9F%9A%80%20Quiero%20m%C3%A1s%20informaci%C3%B3n&type=phone_number&app_absent=0";

/**
 * Footer principal: conserva el CTA de conversión y agrega la estructura
 * real de pie de página (marca, navegación, redes sociales y crédito).
 * Los iconos de redes se muestran pero sus href están en "#" a la espera
 * de que el dueño configure las URLs de redirección reales.
 */
export default function Footer() {
  const socials = [
    { label: "Instagram", href: "https://www.instagram.com/artnaldotattoo/", target: "_blank", rel: "noopener noreferrer", component: <InstagramIcon className="w-5 h-5" /> },
    { label: "WhatsApp", href: initWhatsAppUrl, target: "_blank", rel: "noopener noreferrer", component: <WhatsAppIcon className="w-5 h-5" /> },
  ];

  return (
    <footer className="relative z-10 bg-carbon-900/95 backdrop-blur-sm border-t border-carbon-800">
      {/* CTA principal */}
      <div className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="w-16 h-16 relative mx-auto rounded-full overflow-hidden border border-carbon-600">
            <Image src="/logo.jpg" alt="Logo Footer" fill sizes="64px" className="object-cover" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display text-blanco-washi">
            ¿LISTO PARA TU PRÓXIMA PIEZA?
          </h2>
          <div className="w-12 h-1 bg-rojo-torii-600 mx-auto" />
          <p className="text-gris-secundario text-lg font-light">
            Inicia el proceso de cotización detallado. Validación de ideas y
            agendamiento vía WhatsApp.
          </p>
          <motion.a
            href={initWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-rojo-torii-600 hover:bg-rojo-torii-500 text-blanco-washi px-10 py-5 text-sm font-bold tracking-widest uppercase transition-colors duration-300 shadow-[0_0_15px_rgba(217,4,41,0.2)] cursor-pointer"
          >
            Iniciar Cotización
          </motion.a>
        </motion.div>
      </div>

      {/* Divisor fino oro kintsugi */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-oro-kintsugi/40 to-transparent mx-auto max-w-7xl" />

      {/* Cuerpo del footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Marca */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-oro-kintsugi/40">
              <Image src="/logo.jpg" alt="Artnaldo Tattoo Logo" fill sizes="40px" className="object-cover" />
            </div>
            <span className="font-display font-semibold text-xl tracking-widest text-blanco-washi">
              Artnaldo Tattoo
            </span>
          </div>
          <p className="text-sm text-gris-secundario font-light leading-relaxed max-w-xs">
            Estudio de tatuajes Japonés y Blackwork. Precisión, oscuridad y
            ceremonia en cada trazo.
          </p>
        </div>

        {/* Navegación */}
        <nav className="space-y-4 md:justify-self-center" aria-label="Navegación del sitio">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-oro-kintsugi">
            Navegación
          </h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "Inicio", href: "#inicio" },
              { label: "Portafolio", href: "#portafolio" },
              { label: "El Ritual", href: "#ritual" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-gris-secundario hover:text-blanco-washi transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Redes sociales */}
        <div className="space-y-4 md:justify-self-end">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-oro-kintsugi">
            Sigue el estudio
          </h3>
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target={s.target}
                rel={s.rel}
                aria-label={s.label}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-carbon-600 text-gris-secundario hover:text-blanco-washi hover:border-oro-kintsugi hover:shadow-[0_0_12px_rgba(197,160,89,0.25)] transition-all duration-300"
              >
                {s.component}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Barra de crédito */}
      <div className="border-t border-carbon-800/60">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gris-secundario">
          <p>
            © {new Date().getFullYear()} ARTNALDO TATTOO. Todos los derechos
            reservados.
          </p>
          <p>
            Desarrollo por{" "}
            <a
              href="https://github.com/Deibyth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-oro-kintsugi font-medium hover:underline transition-colors"
            >
              Deiby7h322
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}