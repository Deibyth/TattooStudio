"use client";

import { motion } from "motion/react";

export default function KintsugiDivider() {
  return (
    <div className="relative h-px w-full max-w-7xl mx-auto overflow-visible">
      <svg
        viewBox="0 0 1200 40"
        className="w-full h-10 -translate-y-5"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M0 20 L180 20 L210 8 L260 32 L310 20 L520 20 L560 4 L610 20 L900 20 L940 30 L990 12 L1040 20 L1200 20"
          stroke="url(#kintsugi-gradient)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="kintsugi-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C5A059" stopOpacity="0" />
            <stop offset="50%" stopColor="#C5A059" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
