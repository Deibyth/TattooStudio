"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function InkCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { damping: 25, stiffness: 300, mass: 0.5 });
  const y = useSpring(my, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    // solo activar en dispositivos con puntero fino (desktop)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      const target = e.target as HTMLElement;
      setIsPointer(!!target.closest("a, button, [role='button']"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference hidden md:block"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{
          width: isPointer ? 56 : 18,
          height: isPointer ? 56 : 18,
          opacity: isPointer ? 0.9 : 0.7,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="rounded-full bg-blanco-washi"
      />
    </motion.div>
  );
}
