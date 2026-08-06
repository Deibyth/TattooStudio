"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

/**
 * Iconos de marca (Instagram, Facebook, WhatsApp) como SVG inline.
 * La versión instalada de lucide-react eliminó los iconos de marcas, así
 * que usamos los glifos oficiales para máxima compatibilidad.
 * Los links de redirección los ajusta el dueño del proyecto: hoy apuntan
 * a "#" a la espera de las URLs reales de Instagram / Facebook / WhatsApp.
 */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
            Estudio de tatuajes Neo-Japonés y Blackwork. Precisión, oscuridad y
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