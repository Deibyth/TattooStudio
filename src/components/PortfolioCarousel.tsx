"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import type { GalleryItem } from "./Portfolio";

const CARD_WIDTH = 336; // px, incluye gap
const SPEED = 40; // px por segundo

export default function PortfolioCarousel({ items }: { items: GalleryItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Duplicamos la lista para lograr un loop infinito sin costuras.
  const loopItems = [...items, ...items];
  const trackWidth = items.length * CARD_WIDTH;

  useAnimationFrame((_, delta) => {
    if (isPaused || isDragging || items.length === 0) return;
    let next = x.get() - (SPEED * delta) / 1000;
    // cuando se recorre exactamente un set completo, saltamos al inicio (invisible)
    if (next <= -trackWidth) next += trackWidth;
    x.set(next);
  });

  return (
    <div
      className="relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* velos laterales para un fundido elegante */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-20 bg-gradient-to-r from-carbon-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-20 bg-gradient-to-l from-carbon-900 to-transparent" />

      <motion.div
        ref={trackRef}
        className="flex gap-6 py-6"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -trackWidth * 2, right: trackWidth * 2 }}
        dragElastic={0.05}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        {loopItems.map((item, i) => (
          <motion.div
            key={`${item.id}-${i}`}
            className="relative shrink-0 w-[280px] md:w-[340px] h-[400px] md:h-[440px] rounded-sm overflow-hidden border border-carbon-600 group"
            whileHover={{ scale: 1.03, borderColor: "rgba(197,160,89,0.6)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              draggable={false}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ filter: item.placeholderFilter || undefined }}
              sizes="340px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-carbon-900 via-carbon-900/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

            {/* marco kintsugi que aparece al hover */}
            <div className="absolute inset-3 border border-oro-kintsugi/0 group-hover:border-oro-kintsugi/50 transition-all duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
