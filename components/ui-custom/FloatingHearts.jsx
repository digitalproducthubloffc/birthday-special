"use client";
import { motion } from "framer-motion";

const HEARTS = [
  { x: "10%", delay: 0, size: 14, color: "#F4B8C1" },
  { x: "25%", delay: 0.4, size: 10, color: "#E899A8" },
  { x: "40%", delay: 0.8, size: 16, color: "#FAE0E4" },
  { x: "55%", delay: 0.2, size: 12, color: "#F4B8C1" },
  { x: "70%", delay: 0.6, size: 10, color: "#D4848E" },
  { x: "82%", delay: 1.0, size: 14, color: "#FAE0E4" },
  { x: "92%", delay: 0.3, size: 11, color: "#E899A8" },
];

export default function FloatingHearts({ active = true }) {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {HEARTS.map((h, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: h.x,
            bottom: "-50px",
            fontSize: h.size,
            color: h.color,
            textShadow: `0 0 6px ${h.color}`,
          }}
          animate={{
            y: [0, -window?.innerHeight - 100 || -900],
            x: [0, (i % 2 === 0 ? 30 : -30)],
            opacity: [0, 1, 1, 0],
            rotate: [0, i % 2 === 0 ? 15 : -15],
          }}
          transition={{
            duration: 4 + h.delay,
            delay: h.delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeOut",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}
