"use client";
import { motion } from "framer-motion";
import SafeImage from "./SafeImage";

export default function PolaroidFrame({
  src,
  alt = "Memory",
  caption = "",
  rotate = 0,
  className = "",
  width = 200,
  height = 180,
  delay = 0,
}) {
  return (
    <motion.div
      className={`polaroid ${className}`}
      style={{ rotate: `${rotate}deg`, width: `${width}px` }}
      initial={{ opacity: 0, y: 40, rotate: rotate - 5 }}
      whileInView={{ opacity: 1, y: 0, rotate: `${rotate}deg` }}
      viewport={{ once: true, margin: "50px", margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
    >
      <div
        className="relative overflow-hidden"
        style={{ width: "100%", height: `${height}px`, background: "#f0e8dc" }}
      >
        <SafeImage
          src={src}
          alt={alt}
          sizes="(max-width: 768px) 160px, 220px"
          fallbackEmoji="📷"
          placeholderText={caption || alt}
        />
      </div>
      {caption && <p className="polaroid-caption">{caption}</p>}
    </motion.div>
  );
}
