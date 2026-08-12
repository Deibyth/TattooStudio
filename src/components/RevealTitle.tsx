"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type RevealTitleProps = {
  /** Texto decorativo en japonés (aria-hidden; sin valor SEO). */
  jp: string;
  /** Texto real en español. Usa "\n" para separar líneas (equivale a <br />). */
  es: string;
  /** Tag semántico del encabezado. */
  as?: "h1" | "h2";
  /** Clases del título: tamaño, tracking, color, etc. Aplica a ambas capas. */
  className?: string;
  /** Clases extra de la capa japonesa (ej. tamaño relativo de kanji). */
  jpClassName?: string;
  /** Clases por línea de la capa ES (una por línea de `es`). Si una línea
   *  define clases (p. ej. gradiente), se aplican a cada carácter de esa línea. */
  esLineClassNames?: readonly string[];
  /** "hover-and-scroll" (default) o "scroll-only" (sin handlers de hover). */
  mode?: "hover-and-scroll" | "scroll-only";
  /** false = desactiva el auto-revelado por scroll (p. ej. el hero, que ya
   *  está visible al cargar y quedaría revelado de inmediato). */
  scrollReveal?: boolean;
  /** Tiempo (ms) tras el cual el título se revela automáticamente por
   *  temporizador. Pensado para el hero: ya está visible al cargar, así que
   *  no puede depender de hover ni de scroll para mostrar el español. */
  revealDelayMs?: number;
  /** Retraso (ms) entre el ingreso al viewport y el auto-revelado por scroll.
   *  0 = revelar apenas entra (comportamiento original). El default (2000)
   *  deja el título visible en japonés al llegar a la sección y transiciona
   *  recién después de la pausa, para que la transición no pase inadvertida. */
  scrollRevealDelayMs?: number;
};

const EASE: [number, number, number, number] = [0.22, 0.68, 0, 1.71];

const JP_HIDDEN = { opacity: 0, y: -6, filter: "blur(6px)" };
const JP_VISIBLE = { opacity: 1, y: 0, filter: "blur(0px)" };
const ES_HIDDEN = { opacity: 0, y: 6, filter: "blur(6px)" };
const ES_VISIBLE = { opacity: 1, y: 0, filter: "blur(0px)" };

/** Divide un texto en caracteres (code points), respetando espacios. */
function toChars(text: string): string[] {
  return [...text];
}

/** Divide una línea en tokens de palabra y de espacio (conservando el
 *  whitespace). Los spans inline-block por carácter no garantizan que una
 *  palabra no se parta a mitad (p. ej. "PIEZA?" en el footer), así que cada
 *  palabra se envuelve en un span con whitespace-nowrap y los espacios
 *  quedan como texto normal, que sí habilita el quiebre de línea entre
 *  palabras en pantallas angostas. */
function splitLine(text: string): string[] {
  return text.split(/(\s+)/).filter((token) => token.length > 0);
}

/** Estado de capacidad de puntero. `ready` en false durante SSR/hidratación
 *  para no fijar el observer con visibilidad parcial antes de medir.
 *  El criterio correcto es hover + puntero fino (no innerWidth): hay laptops
 *  táctiles y tablets con mouse; asumir mobile por tamaño de pantalla falla. */
type PointerState = { ready: boolean; fine: boolean };

const POINTER_UNSET: PointerState = { ready: false, fine: false };

let pointerState: PointerState = POINTER_UNSET;

function getPointerSnapshot(): PointerState {
  return pointerState;
}

function subscribePointer(onStoreChange: () => void) {
  const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
  const update = () => {
    pointerState = { ready: true, fine: mql.matches };
    onStoreChange();
  };
  // subscribe solo corre en el cliente, después de la hidratación.
  update();
  mql.addEventListener("change", update);
  return () => mql.removeEventListener("change", update);
}

export default function RevealTitle({
  jp,
  es,
  as = "h2",
  className = "",
  jpClassName = "",
  esLineClassNames = [],
  mode = "hover-and-scroll",
  scrollReveal = true,
  revealDelayMs = 0,
  scrollRevealDelayMs = 2000,
}: RevealTitleProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [hoverLatched, setHoverLatched] = useState(false);
  const [timedRevealed, setTimedRevealed] = useState(false);
  const [delayedReveal, setDelayedReveal] = useState(false);

  // Se leen con useSyncExternalStore para evitar hidratación con estados
  // de ventana y para reaccionar en vivo si el dispositivo cambia de puntero.
  const pointer = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    () => POINTER_UNSET
  );
  const hasFinePointer = pointer.fine;

  const canHover = mode === "hover-and-scroll" && hasFinePointer;

  // Umbral más bajo que el spec original (0.4 desktop / 0.3 mobile): el
  // título se revela apenas entra al viewport para dejar tiempo a VER la
  // transición, en vez de esperar a estar casi completo en pantalla.
  // Antes de medir el puntero usamos amount 1 para que el observer no fije
  // el estado con visibilidad parcial; el resultado se ignora igual por el
  // guard de pointer.ready.
  const inView = useInView(ref, {
    amount: pointer.ready ? (hasFinePointer ? 0.4 : 0.3) : 1,
    once: true,
  });

  // Auto-revelado por temporizador (hero): el setState corre dentro del
  // callback del timeout, nunca de forma síncrona en el cuerpo del efecto.
  useEffect(() => {
    if (!revealDelayMs || timedRevealed || !pointer.ready) return;
    const timer = window.setTimeout(
      () => setTimedRevealed(true),
      revealDelayMs
    );
    return () => window.clearTimeout(timer);
  }, [revealDelayMs, timedRevealed, pointer.ready]);

  // Auto-revelado con retraso tras entrar al viewport (títulos de sección):
  // al llegar se ve el título en japonés y transiciona recién tras la pausa,
  // así la transición no ocurre apenas se hace scroll y no pasa inadvertida.
  useEffect(() => {
    if (
      !scrollReveal ||
      !scrollRevealDelayMs ||
      delayedReveal ||
      !pointer.ready ||
      !inView
    ) {
      return;
    }
    const timer = window.setTimeout(
      () => setDelayedReveal(true),
      scrollRevealDelayMs
    );
    return () => window.clearTimeout(timer);
  }, [scrollReveal, scrollRevealDelayMs, delayedReveal, pointer.ready, inView]);

  // Latch: una vez revelado, queda revelado. El hover NO revierte a japonés
  // al quitar el cursor y el scroll no vuelve atrás al salir del viewport;
  // así la transición siempre es visible y no hay parpadeo JP↔ES.
  const scrollRevealed =
    pointer.ready &&
    scrollReveal &&
    inView &&
    (scrollRevealDelayMs === 0 || delayedReveal);
  const isReduced = reducedMotion === true;

  const revealed = isReduced || scrollRevealed || hoverLatched || timedRevealed;

  const duration = isReduced ? 0 : 0.6;
  const stagger = isReduced ? 0 : 0.03;
  const lines = es.split("\n");
  const Tag = as;

  return (
    <Tag
      ref={ref}
      className={`relative block select-none ${className}`}
      onMouseEnter={canHover ? () => setHoverLatched(true) : undefined}
    >
      {/* Capa japonesa: decorativa, superpuesta a la caja ES, centrada
       * verticalmente y alineada al mismo text-align heredado del título. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 flex items-center ${jpClassName}`}
      >
        <span className="block w-full whitespace-nowrap">
          {toChars(jp).map((ch, i) => (
            <motion.span
              key={`jp-${i}`}
              className="inline-block"
              initial={JP_VISIBLE}
              animate={revealed ? JP_HIDDEN : JP_VISIBLE}
              transition={{ duration, delay: revealed ? i * stagger : 0, ease: EASE }}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </span>
      </span>

      {/* Capa ES: contenido real en el flujo del documento. Define el layout
       * (sin CLS), el texto indexable y el nombre accesible del encabezado. */}
      <span role="text">
        {lines.map((line, li) => {
          const lineClass = esLineClassNames[li] ?? "";
          const charClass = lineClass
            ? `${lineClass} inline-block`
            : "inline-block";
          const tokens = splitLine(line);
          let charIndex = 0;
          return (
            <span key={`line-${li}`} className="block">
              {tokens.map((token, ti) => {
                if (token.trim() === "") {
                  // Espacio real entre palabras: texto normal, habilita el
                  // quiebre de línea sin animación propia.
                  return <span key={`sp-${li}-${ti}`}>{token}</span>;
                }
                const start = charIndex;
                charIndex += token.length;
                return (
                  <span
                    key={`wd-${li}-${ti}`}
                    className="inline-block whitespace-nowrap"
                  >
                    {toChars(token).map((ch, ci) => (
                      <motion.span
                        key={`es-${li}-${ti}-${ci}`}
                        className={charClass}
                        initial={ES_HIDDEN}
                        animate={revealed ? ES_VISIBLE : ES_HIDDEN}
                        transition={{
                          duration,
                          delay: revealed ? (start + ci) * stagger : 0,
                          ease: EASE,
                        }}
                      >
                        {ch === " " ? "\u00A0" : ch}
                      </motion.span>
                    ))}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}