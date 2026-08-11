"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Portfolio from "@/components/Portfolio";
import KatanaDivider from "@/components/KatanaDivider";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { InstagramIcon, WhatsAppIcon } from "@/components/SocialIcons";
import { SITE } from "@/lib/site";

/* Links de navegación del header, compartidos entre la barra desktop
 * y el menú mobile (hamburguesa). */
const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#portafolio", label: "Portafolio" },
  { href: "#ritual", label: "El Ritual" },
];

/* JSON-LD (Schema.org) — datos de la landing para rich snippets.
 * ADDRESS / GEO: TODO — reemplazar address.streetAddress por la dirección
 * real del estudio y añadir `geo` con las coordenadas reales de Bogotá
 * cuando se conozcan. No se emiten coordenadas ficticias. */
const localBusiness = {
  "@context": "https://schema.org",
  "@type": ["TattooParlour", "LocalBusiness"],
  "@id": `${SITE.home}`,
  name: SITE.shortName,
  alternateName: SITE.name,
  description:
    "Estudio de tatuajes en Bogotá especializado en Blackwork, Japonés, Realismo, Fine Line y cobertura. Diseños a medida y cotización por WhatsApp.",
  url: SITE.home,
  telephone: SITE.telephone,
  image: SITE.logo,
  priceRange: "$$$",
  sameAs: [SITE.instagram],
  address: {
    "@type": "PostalAddress",
    streetAddress: "TODO: dirección real del estudio",
    addressLocality: "Bogotá D.C.",
    addressRegion: "Cundinamarca",
    postalCode: "110111",
    addressCountry: "CO",
  },
  // TODO: agregar `geo` con la latitud y longitud reales del estudio.
  areaServed: { "@type": "City", name: "Bogotá" },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "11:00", // TODO: ajustar horario real
    closes: "20:00", // TODO: ajustar horario real
  },
};

const organizationJson = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.home}#organization`,
  name: SITE.name,
  url: SITE.home,
  logo: SITE.logo,
  telephone: SITE.telephone,
  sameAs: [SITE.instagram],
};

const faqJson = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿En qué estilos de tatuaje se especializa Artnaldo Tattoo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nos especializamos en Blackwork, Japonés, Realismo, Fine Line y cobertura (cover up). Cada pieza se diseña a medida según la idea del cliente.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo pido una cotización para mi tatuaje?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Escríbenos por WhatsApp con la descripción de tu idea, la zona del cuerpo y el tamaño aproximado. Te respondemos con un diseño propuesto y el valor estimado.",
      },
    },
    {
      "@type": "Question",
      name: "¿Es seguro hacerse un tatuaje?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Usamos material desechable, agujas de un solo uso y seguimos las normas de bioseguridad exigidas por la Secretaría Distrital de Salud de Bogotá.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo debo cuidar mi tatuaje después de la sesión?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mantén el tatuaje limpio y seco, aplica la crema recomendada y evita la exposición directa al sol y el agua en los primeros días. Al final de la cita recibes las instrucciones completas.",
      },
    },
    {
      "@type": "Question",
      name: "¿Se pueden hacer tatuajes en Colombia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, el tatuaje es legal en Colombia para mayores de 18 años y se realiza bajo las normas de bioseguridad locales",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué tener en cuenta antes de mi primer tatuaje?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Define la idea y la zona del cuerpo, descansa bien y evita el alcohol previo a la sesión. Un tatuaje es permanente, así que tomamos el tiempo necesario para diseñar juntos algo que realmente ames.",
      },
    },
  ],
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen relative font-sans">
      <JsonLd data={localBusiness} />
      <JsonLd data={organizationJson} />
      <JsonLd data={faqJson} />

      <div className="grain-overlay" />

      {/* HEADER */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full z-50"
      >
        <div className="relative z-50 border-b border-carbon-700/50 bg-carbon-900/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-oro-kintsugi/50 shrink-0">
                <Image src="/logo.jpg" alt="Artnaldo Tattoo Logo" fill sizes="40px" className="object-cover" />
              </div>
              <span className="font-display font-semibold text-lg sm:text-xl tracking-widest text-blanco-washi truncate">
                Artnaldo Tattoo
              </span>
            </div>

            {/* Navegación desktop */}
            <nav className="hidden md:flex items-center gap-4 text-sm uppercase tracking-widest font-medium text-gris-secundario">
              <div className="flex items-center gap-3">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-carbon-600 text-gris-secundario hover:text-blanco-washi hover:border-oro-kintsugi hover:shadow-[0_0_12px_rgba(197,160,89,0.25)] transition-all duration-300"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-carbon-600 text-gris-secundario hover:text-blanco-washi hover:border-oro-kintsugi hover:shadow-[0_0_12px_rgba(197,160,89,0.25)] transition-all duration-300"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
              </div>
              <div className="flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="relative hover:text-blanco-washi transition-colors group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-oro-kintsugi group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>
            </nav>

            {/* Acciones mobile: redes siempre visibles + menú hamburguesa */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-carbon-600 text-gris-secundario hover:text-blanco-washi hover:border-oro-kintsugi transition-all duration-300"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-carbon-600 text-gris-secundario hover:text-blanco-washi hover:border-oro-kintsugi transition-all duration-300"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <button
                type="button"
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((v) => !v)}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-carbon-600 text-gris-secundario hover:text-blanco-washi hover:border-oro-kintsugi transition-all duration-300"
              >
                <div className="relative w-4 h-3.5">
                  <span
                    className={`absolute left-0 top-0 h-0.5 w-4 bg-current transition-all duration-300 ${menuOpen ? "top-1.5 rotate-45" : ""}`}
                  />
                  <span
                    className={`absolute left-0 top-1.5 h-0.5 w-4 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
                  />
                  <span
                    className={`absolute left-0 top-3 h-0.5 w-4 bg-current transition-all duration-300 ${menuOpen ? "top-1.5 -rotate-45" : ""}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Menú mobile */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                key="mobile-backdrop"
                className="fixed inset-0 z-40 bg-carbon-900/60 backdrop-blur-sm md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMenuOpen(false)}
              />
              <motion.nav
                key="mobile-menu"
                id="mobile-menu"
                className="absolute top-full left-0 right-0 z-50 md:hidden border-b border-carbon-700/50 bg-carbon-900/95 backdrop-blur-md px-6 py-6 flex flex-col gap-5"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm uppercase tracking-widest font-medium text-gris-secundario hover:text-blanco-washi transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* HERO */}
      <section
        id="inicio"
        className="relative isolate min-h-screen flex items-center overflow-hidden"
      >
        {/* Background protagonista, estático (sin parallax) */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/fondo.png"
            alt=""
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_900px_650px_at_25%_55%,rgba(10,10,11,0.78),rgba(10,10,11,0.35)_45%,rgba(10,10,11,0.08)_75%,transparent_95%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-carbon-900/85 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 pt-32 pb-24">

           <motion.div
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="space-y-8 relative z-10 max-w-2xl"
           >
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.1 }}
               className="inline-block px-4 py-1.5 border border-oro-kintsugi/30 rounded-full text-xs font-semibold tracking-widest text-oro-kintsugi uppercase bg-carbon-800/50 backdrop-blur-sm"
             >
                Sumi-e x Dark Blackwork
             </motion.div>

             <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-blanco-washi leading-[1.1] tracking-tight text-glow">
               {"TINTA &".split("").map((char, i) => (
                 <motion.span
                   key={i}
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: 0.3 + i * 0.03, ease: "easeOut" }}
                   className="inline-block"
                 >
                   {char === " " ? "\u00A0" : char}
                 </motion.span>
               ))}
               <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-br from-blanco-washi to-carbon-600">
                 {"SOMBRA".split("").map((char, i) => (
                   <motion.span
                     key={i}
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: 0.6 + i * 0.04, ease: "easeOut" }}
                     className="inline-block"
                   >
                     {char}
                   </motion.span>
                 ))}
               </span>
             </h1>

             <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.8, delay: 1 }}
               className="text-lg md:text-xl text-gris-secundario font-light max-w-lg leading-relaxed"
             >
               Transformamos ideas en arte permanente. Estudio de tatuajes en
                Bogotá especializado en Blackwork, Japonés, Realismo,
                Fine Line y cobertura. Precisión, oscuridad y ceremonia en
                cada trazo.
             </motion.p>

             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 1.2 }}
               className="pt-4 flex flex-col sm:flex-row gap-6"
             >
                <motion.a
                  href="https://api.whatsapp.com/send/?phone=573228851584&text=%F0%9F%9A%80%20Quiero%20m%C3%A1s%20informaci%C3%B3n&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-rojo-torii-600 hover:bg-rojo-torii-500 text-blanco-washi px-8 py-4 text-sm font-bold tracking-widest uppercase transition-colors duration-300 shadow-[0_0_15px_rgba(217,4,41,0.2)] hover:shadow-[0_0_25px_rgba(217,4,41,0.4)] cursor-pointer inline-block"
                >
                  Agendar Cita / Cotizar
                </motion.a>
                <motion.a
                  href="#portafolio"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 text-sm font-bold tracking-widest uppercase text-blanco-washi border border-carbon-600 hover:border-oro-kintsugi/50 hover:bg-carbon-800 transition-all cursor-pointer text-center"
                >
                  Ver Portafolio
                </motion.a>
             </motion.div>
           </motion.div>
        </div>

        {/* indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-oro-kintsugi to-transparent"
          />
        </motion.div>
      </section>

      <KatanaDivider />

      {/* PORTAFOLIO */}
      <Portfolio />

      <KatanaDivider />

      {/* RITUAL / THE ARTIST */}
      <section id="ritual" className="py-24 px-6 bg-carbon-900/95 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
           <motion.div
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8 }}
             whileHover={{ scale: 1.01 }}
             className="relative aspect-[1080/1351] md:h-[760px] md:aspect-auto w-full border border-carbon-700 rounded-sm overflow-hidden group"
           >
              <Image
                src="/naldofoto.jpg"
                alt="Naldo, tatuador y fundador del estudio"
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[center_18%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon-900/70 via-transparent to-transparent"></div>
              <div className="absolute inset-0 border border-oro-kintsugi/20 group-hover:border-oro-kintsugi/50 m-4 rounded-sm z-20 pointer-events-none transition-colors duration-500"></div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="space-y-8"
           >
              <h2 className="text-4xl md:text-5xl font-display text-blanco-washi">EL RITUAL ANTES <br/>DE LA TINTA</h2>
              <div className="w-12 h-1 bg-rojo-torii-600"></div>
              <p className="text-lg text-gris-secundario font-light leading-relaxed">
                 Cada pieza comienza en el papel y termina en la piel. Mi enfoque combina la rica herencia del arte tradicional con la contundencia y oscuridad del blackwork contemporáneo.
              </p>
<p className="text-lg text-gris-secundario font-light leading-relaxed">
                  No es solo un tatuaje; es una ceremonia de transformación. Diseños únicos, creados a medida para contar tu historia a través de la sombra y el contraste.
               </p>
               <p className="text-lg text-gris-secundario font-light leading-relaxed">
                  Domesticamos el blanco y negro en todas sus formas: blackwork denso,
                  japonés de inspiración ukiyo-e, realismo y fine line de línea fina,
                  además de coberturas y rediseños sobre tinta previa. Cada sesión en el
                  estudio de Artnaldo Tattoo en Bogotá se trabaja bajo normas de
                  bioseguridad y con tinta de alta calidad.
               </p>
           </motion.div>
        </div>
      </section>

      {/* UBICACIÓN / MAPA */}
      <KatanaDivider />

      {/* MAPA */}
      <MapSection />

      {/* FOOTER (CTA + navegación + redes + crédito) */}
      <Footer />
    </div>
  );
}
