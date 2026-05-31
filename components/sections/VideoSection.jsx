"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SafeImage from "../ui-custom/SafeImage";

const sidePolaroids = [
  { src: "/images/roses_polaroid.png", caption: "birthday magic ✨", rotate: -5 },
  { src: "/images/media_3.png", caption: "birthday dinner 🕯️",  rotate:  4 },
  { src: "/images/media_6.png", caption: "sweet moments 🎂",  rotate: -3 },
  { src: "/images/memory1.png", caption: "pure joy 💕",        rotate:  6 },
];

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="video"
      style={{
        background: "linear-gradient(160deg, #F5ECD7 0%, #EAD9C0 50%, #F5ECD7 100%)",
        padding: "80px 24px 100px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Film-strip corner decoration */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 20,
        background: "repeating-linear-gradient(90deg, #8B6F5E 0px, #8B6F5E 30px, transparent 30px, transparent 45px)",
        opacity: 0.08 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 20,
        background: "repeating-linear-gradient(90deg, #8B6F5E 0px, #8B6F5E 30px, transparent 30px, transparent 45px)",
        opacity: 0.08 }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 50 }}
        >
          <p className="font-cormorant" style={{ fontSize: "0.8rem", letterSpacing: "0.25em", color: "var(--brown-light)", textTransform: "uppercase", marginBottom: 6 }}>
            a special message
          </p>
          <h2 className="font-script" style={{ fontSize: "3rem", color: "var(--dusty-rose)" }}>
            A Memory in Motion
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left — Video player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative" }}
          >
            {/* Film strip sprockets top */}
            <div style={{
              background: "#2d1f16",
              borderRadius: "6px 6px 0 0",
              height: 22,
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
              gap: 8,
            }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ width: 14, height: 10, borderRadius: 2, background: "rgba(255,255,255,0.12)" }} />
              ))}
            </div>

            {/* Video area */}
            <div style={{
              background: "#1a0f08",
              aspectRatio: "16/10",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
              onClick={() => setPlaying(!playing)}
            >
              {/* Placeholder frame */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, #1a0f08 0%, #2d1f16 50%, #1a0f08 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <SafeImage
                  src="/images/media_6.png"
                  alt="Video thumbnail"
                  sizes="500px"
                  fallbackEmoji="🎥"
                  placeholderText="Video Thumbnail"
                  className="opacity-60"
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(ellipse at center, rgba(244,184,193,0.15) 0%, rgba(26,15,8,0.7) 100%)",
                  zIndex: 2
                }} />
                {/* Bokeh lights */}
                {[...Array(6)].map((_, i) => (
                  <motion.div key={i} style={{
                    position: "absolute",
                    width: 60 + i * 20, height: 60 + i * 20,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, rgba(244,184,193,0.3) 0%, transparent 70%)`,
                    top: `${10 + i * 15}%`, left: `${5 + i * 15}%`,
                  }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
                {/* Play button */}
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    position: "relative", zIndex: 2,
                    width: 64, height: 64, borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(244,184,193,0.9), rgba(212,132,142,0.9))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 0 8px rgba(244,184,193,0.25), 0 8px 32px rgba(0,0,0,0.4)",
                  }}
                >
                  <span style={{ fontSize: "1.6rem", marginLeft: 4, color: "#fff" }}>▶</span>
                </motion.div>
              </div>

              {/* Video element (add src when ready) */}
              {/* <video src="/video/birthday.mp4" controls className="w-full h-full" /> */}

              {/* Progress bar decoration */}
              <div style={{
                position: "absolute", bottom: 12, left: 12, right: 12,
                height: 3, background: "rgba(255,255,255,0.2)", borderRadius: 2,
              }}>
                <div style={{ width: "35%", height: "100%", background: "var(--blush)", borderRadius: 2 }} />
              </div>
            </div>

            {/* Film strip sprockets bottom */}
            <div style={{
              background: "#2d1f16",
              borderRadius: "0 0 6px 6px",
              height: 22,
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
              gap: 8,
            }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ width: 14, height: 10, borderRadius: 2, background: "rgba(255,255,255,0.12)" }} />
              ))}
            </div>

            {/* Caption below */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ delay: 0.5 }}
              className="font-dancing"
              style={{ textAlign: "center", marginTop: 16, color: "var(--rose)", fontSize: "1.1rem" }}
            >
              ♡ press play to relive the magic ♡
            </motion.p>

            {/* Heart stickers around video */}
            <motion.div animate={{ scale: [1,1.3,1], rotate:[0,15,-15,0] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ position: "absolute", bottom: 40, left: -20, fontSize: "1.8rem" }}>💗</motion.div>
            <motion.div animate={{ scale: [1,1.2,1] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              style={{ position: "absolute", top: 20, right: -16, fontSize: "1.4rem" }}>✨</motion.div>
          </motion.div>

          {/* Right — Side polaroids 2x2 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {sidePolaroids.map((p, i) => (
              <motion.div
                key={i}
                className="polaroid"
                style={{ transform: `rotate(${p.rotate}deg)` }}
                whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                <div style={{ height: 120, background: "linear-gradient(135deg, #FAE0E4, #F5ECD7)", position: "relative", overflow: "hidden" }}>
                  <SafeImage
                    src={p.src}
                    alt={p.caption}
                    sizes="160px"
                    fallbackEmoji="📸"
                    placeholderText={p.src.split("/").pop()}
                  />
                </div>
                <p className="polaroid-caption">{p.caption}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
