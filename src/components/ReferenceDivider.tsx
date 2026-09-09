"use client";

import Image from "next/image";
import { motion } from "motion/react";

/** Separador visual inspirado en la referencia del estudio: katana y Hannya. */
export default function ReferenceDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto w-[90%] max-w-5xl overflow-hidden py-2 sm:w-[82%] sm:py-4"
      aria-hidden="true"
    >
      <Image
        src="/divider-reference.png"
        alt=""
        width={1118}
        height={223}
        sizes="(max-width: 640px) 90vw, 82vw"
        className="h-auto w-full object-contain"
      />
    </motion.div>
  );
}
