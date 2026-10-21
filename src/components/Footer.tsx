"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { InstagramIcon, WhatsAppIcon } from "./SocialIcons";
import RevealTitle from "@/components/RevealTitle";
import { REVEAL_TITLES } from "@/data/revealTitles";

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
 * Los iconos de redes se muestran con sus URLs reales.
 */
export default function Footer() {
  const socials = [
    { label: "Instagram", href: "https://www.instagram.com/artnaldotattoo/", target: "_blank", rel: "noopener noreferrer", component: <InstagramIcon className="w-5 h-5" /> },
    { label: "WhatsApp", href: initWhatsAppUrl, target: "_blank", rel: "noopener noreferrer", component: <WhatsAppIcon className="w-5 h-5" /> },
  ];

  const [showTerms, setShowTerms] = useState(false);

  // Cerrar con Escape y bloquear el scroll del body mientras el modal esté abierto.
  useEffect(() => {
    if (!showTerms) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowTerms(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [showTerms]);

  const termsContent = (
    <ol className="space-y-4 px-6 py-6 text-sm text-carbon-400 leading-relaxed">
        <li className="font-medium text-carbon-200">1. Requisitos de Edad
          <ul className="mt-2 pl-5 space-y-1 text-carbon-500">
            <li>Mayoría de edad: El cliente declara que tiene al menos 18 años cumplidos al momento de la sesión.</li>
            <li>Menores de edad: En los casos permitidos por la legislación local, los menores deberán asistir acompañados por su padre, madre o tutor legal, quien deberá firmar la autorización correspondiente en el estudio.</li>
          </ul>
        </li>

        <li className="font-medium text-carbon-200">2. Agenda de Citas, Depósitos y Cancelaciones
          <ul className="mt-2 pl-5 space-y-1 text-carbon-500">
            <li>Depósito de reserva: Para confirmar cualquier cita se requiere el pago de un abono previo. Este monto se descontará del precio total del tatuaje.</li>
            <li>Política de reembolso: Los depósitos no son reembolsables.</li>
            <li>Reprogramación: Si necesitas cambiar la fecha de tu cita, debes avisar con un mínimo de 48 horas de anticipación. De lo contrario, el depósito se perderá y deberás pagar uno nuevo para agendar otra fecha.</li>
          </ul>
        </li>

        <li className="font-medium text-carbon-200">3. Restricciones de Salud y Seguridad
          <ul className="mt-2 pl-5 space-y-1 text-carbon-500">
            <li>Sustancias: No se realizarán procedimientos a personas bajo los efectos del alcohol o sustancias psicoactivas.</li>
            <li>Estados médicos: No se tatuará a mujeres en estado de embarazo o lactancia.</li>
            <li>Condiciones preexistentes: El cliente tiene la obligación de informar sobre alergias, enfermedades de la piel, afecciones cardíacas, problemas de coagulación o el uso de medicamentos anticoagulantes antes de iniciar la sesión.</li>
          </ul>
        </li>

        <li className="font-medium text-carbon-200">4. Propiedad Intelectual y Modificaciones de Diseño
          <ul className="mt-2 pl-5 space-y-1 text-carbon-500">
            <li>Derechos de autor: Todos los diseños y bocetos creados por los artistas son propiedad intelectual del estudio y del artista. No se permite su reproducción o uso con otros fines sin autorización expresa.</li>
            <li>Cambios en el diseño: Las modificaciones sustanciales al diseño original acordado deben solicitarse con anticipación. Los cambios de última hora en el estudio pueden generar costos adicionales o el aplazamiento de la cita.</li>
          </ul>
        </li>

        <li className="font-medium text-carbon-200">5. Uso de Imagen y Fotografías
          <ul className="mt-2 pl-5 space-y-1 text-carbon-500">
            <li>Registro del trabajo: El estudio y sus artistas se reservan el derecho de tomar fotografías y videos del proceso y del tatuaje terminado.</li>
            <li>Difusión comercial: El cliente autoriza el uso de este material visual para su publicación en redes sociales, sitio web y portafolios publicitarios del estudio.</li>
            <li>Privacidad: El estudio se compromete a proteger la identidad del cliente, enfocando las capturas únicamente en la zona del tatuaje, a menos que el cliente consienta explícitamente mostrar su rostro.</li>
          </ul>
        </li>

        <li className="font-medium text-carbon-200">6. Responsabilidad y Cuidados Posteriores
          <ul className="mt-2 pl-5 space-y-1 text-carbon-500">
            <li>Instrucciones de cuidado: El estudio entregará indicaciones para la desinfección y mantenimiento del tatuaje.</li>
            <li>Exclusión de responsabilidad: El estudio no se hace responsable por infecciones, pérdida de color o deformaciones del diseño que resulten de una mala manipulación, negligencia o el incumplimiento de las instrucciones de cuidado posterior por parte del cliente.</li>
          </ul>
        </li>
      </ol>
  );

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
          <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden border border-carbon-600">
            <Image src="/logo.jpg" alt="Artnaldo Tattoo Studio - Logo principal del footer" fill sizes="64px" className="object-cover" />
          </div>
          <RevealTitle
            as="h2"
            {...REVEAL_TITLES.footer}
            className="text-3xl md:text-5xl font-display text-blanco-washi"
          />
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
              <Image src="/logo.jpg" alt="Artnaldo Tattoo Studio - Logo principal" fill sizes="40px" className="object-cover" />
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
            <h3 className="text-xs font-semibold tracking-widest uppercase text-blanco-washi">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li style={{ listStyle: "none" }}>
                <a href="#inicio" className="text-gris-secundario hover:text-blanco-washi transition-colors cursor-pointer">Inicio</a>
              </li>
              <li style={{ listStyle: "none" }}>
                <a href="#portafolio" className="text-gris-secundario hover:text-blanco-washi transition-colors cursor-pointer">Portafolio</a>
              </li>
              <li style={{ listStyle: "none" }}>
                <a href="#ritual" className="text-gris-secundario hover:text-blanco-washi transition-colors cursor-pointer">El Ritual</a>
              </li>
              <li style={{ listStyle: "none" }}>
                <button type="button" onClick={() => setShowTerms(true)} className="text-gris-secundario hover:text-blanco-washi transition-colors cursor-pointer">Terminos y condiciones</button>
              </li>
            </ul>
          </nav>

        {/* Modal de Términos y Condiciones */}
        {showTerms && createPortal(
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="terms-title">
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowTerms(false)} />
              <div className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-xl border-2 border-rojo-torii-600 ring-1 ring-rojo-torii-500/50 bg-carbon-900 shadow-[0_0_50px_rgba(217,4,41,0.3),0_0_25px_rgba(217,4,41,0.15)]">
                <div className="flex items-center justify-between border-b border-oro-kintsugi/40 px-6 py-4">
                  <h2 id="terms-title" className="font-display text-xl md:text-2xl font-bold text-blanco-washi">Términos y Condiciones del Servicio</h2>
                  <button type="button" onClick={() => setShowTerms(false)} className="h-9 w-9 rounded-full border border-oro-kintsugi/50 flex items-center justify-center text-gris-secundario hover:text-blanco-washi hover:border-oro-kintsugi transition-colors" aria-label="Cerrar">
                    ×
                  </button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto">
                  {termsContent}
                </div>
                <div className="border-t border-oro-kintsugi/20 px-6 py-3 text-center text-xs text-gris-secundario">
                  © {new Date().getFullYear()} ARTNALDO TATTOO. Todos los derechos reservados.
                </div>
              </div>
            </div>,
            document.body
          )}

        {/* Redes sociales */}
        <div className="space-y-4 md:justify-self-end">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-blanco-washi">
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
                className="w-11 h-11 flex items-center justify-center rounded-full border border-carbon-600 text-gris-secundario hover:text-blanco-washi hover:border-oro-kintsugi hover:shadow-[0_0_12px_rgba(217,4,41,0.25)] transition-all duration-300"
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
              className="text-blanco-washi font-medium hover:text-rojo-torii-500 hover:underline transition-colors"
            >
              Deiby7h322
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}