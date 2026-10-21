"use client";

import Image from "next/image";
import { motion } from "motion/react";

/** Separador visual del estudio: serpientes gemelas con el emblema central AT. */
export default function ReferenceDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto w-[88%] max-w-3xl overflow-hidden py-2 sm:py-4"
      aria-hidden="true"
    >
      <Image
        src="/Serpientes_gemelas.png"
        alt=""
        width={2172}
        height={724}
        sizes="(max-width: 768px) 88vw, 768px"
        className="h-auto w-full object-contain"
      />
    </motion.div>
  );
}
