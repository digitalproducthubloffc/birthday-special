"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SafeImage from "../ui-custom/SafeImage";
import dynamic from "next/dynamic";
import multiBaloonPng from "@/pngs/multiplebaloon.png";

// Dynamically import confetti (client-only)
const ConfettiEffect = dynamic(() => import("../ui-custom/ConfettiEffect"), { ssr: false });

const HEARTS_ANIM = [
  { x: "5%",  size: 16, delay: 0.0, color: "#F4B8C1" },
  { x: "18%", size: 12, delay: 0.3, color: "#E899A8" },
  { x: "32%", size: 18, delay: 0.6, color: "#FAE0E4" },
  { x: "48%", size: 14, delay: 0.1, color: "#F4B8C1" },
  { x: "62%", size: 11, delay: 0.8, color: "#D4848E" },
  { x: "76%", size: 16, delay: 0.4, color: "#FAE0E4" },
  { x: "90%", size: 13, delay: 0.2, color: "#E899A8" },
];

const SPARKLES_COORDS = [
  { top: "10%", left: "15%" },
  { top: "25%", left: "80%" },
  { top: "45%", left: "10%" },
  { top: "60%", left: "85%" },
  { top: "75%", left: "20%" },
  { top: "85%", left: "70%" },
  { top: "15%", left: "55%" },
  { top: "50%", left: "65%" },
  { top: "70%", left: "45%" },
  { top: "30%", left: "30%" },
];

const BG_STICKERS = [
  { top: "6%", left: "6%", e: "🌸", s: 28, d: 0.0 },
  { top: "10%", right: "8%", e: "🎀", s: 26, d: 0.4 },
  { top: "34%", left: "3%", e: "✦", s: 18, d: 0.2 },
  { top: "58%", right: "4%", e: "💗", s: 22, d: 0.6 },
  { top: "76%", left: "8%", e: "🌿", s: 22, d: 0.3 },
];

export default function FinalSurprise() {
  const [revealed, setRevealed] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 5000);
  };

  return (
    <section
      id="surprise"
      style={{
        background:
          "radial-gradient(circle at 22% 18%, rgba(244,184,193,0.35), transparent 55%), radial-gradient(circle at 78% 72%, rgba(200,169,110,0.18), transparent 58%), linear-gradient(160deg, #FAE0E4 0%, #F5ECD7 40%, #FDF6EC 70%, #FAE0E4 100%)",
        padding: "80px 24px 110px",
        position: "relative",
        overflow: "hidden",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Confetti */}
      {confetti && <ConfettiEffect />}

      {/* Floating hearts when revealed */}
      <AnimatePresence>
        {revealed && HEARTS_ANIM.map((h, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              left: h.x,
              bottom: -30,
              fontSize: h.size,
              color: h.color,
              pointerEvents: "none",
              zIndex: 10,
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: -800,
              opacity: [0, 1, 1, 0],
              x: [0, i % 2 === 0 ? 40 : -40],
            }}
            transition={{
              duration: 4,
              delay: h.delay,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeOut",
            }}
          >
            ♥
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Background decorative sparkles */}
      {SPARKLES_COORDS.map((sparkle, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top: sparkle.top,
            left: sparkle.left,
            fontSize: "0.9rem",
            color: "var(--gold)",
            opacity: 0.5,
            pointerEvents: "none",
          }}
          animate={{ opacity: [0, 0.8, 0], scale: [0, 1.2, 0], rotate: [0, 180] }}
          transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity, repeatDelay: 1.5 }}
        >
          ✦
        </motion.div>
      ))}

      {/* Ambient scrapbook stickers */}
      {BG_STICKERS.map((s, i) => (
        <motion.div
          key={`st-${i}`}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            right: s.right,
            fontSize: s.s,
            opacity: 0.22,
            zIndex: 0,
            pointerEvents: "none",
            filter: "drop-shadow(0 6px 18px rgba(139,111,94,0.15))",
          }}
          animate={{ y: [0, -10, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 5 + i * 0.6, delay: s.d, repeat: Infinity, ease: "easeInOut" }}
        >
          {s.e}
        </motion.div>
      ))}

      <motion.div
        aria-hidden="true"
        className="hidden lg:block"
        style={{
          position: "absolute",
          top: "8%",
          right: "4%",
          width: 140,
          height: 180,
          opacity: 0.2,
          zIndex: 0,
          pointerEvents: "none",
          filter: "drop-shadow(0 10px 25px rgba(139,111,94,0.18))",
        }}
        animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={multiBaloonPng.src} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </motion.div>

      {/* Soft vignette to reduce empty-feel */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(245,236,215,0.12) 55%, rgba(139,111,94,0.12) 120%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: 980, width: "100%", textAlign: "center", position: "relative", zIndex: 2 }}>
        {/* Subtle corner glows (no images) */}
        <div
          aria-hidden="true"
          className="hidden lg:block"
          style={{
            position: "absolute",
            top: -10,
            right: -10,
            width: 280,
            height: 210,
            borderRadius: 26,
            background: "radial-gradient(circle at 30% 30%, rgba(244,184,193,0.25), transparent 60%), radial-gradient(circle at 70% 70%, rgba(200,169,110,0.18), transparent 62%)",
            filter: "blur(2px)",
            opacity: 0.9,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <div
          aria-hidden="true"
          className="hidden lg:block"
          style={{
            position: "absolute",
            left: -20,
            bottom: 20,
            width: 260,
            height: 220,
            borderRadius: 999,
            background: "radial-gradient(circle at 45% 40%, rgba(244,184,193,0.22), transparent 58%), radial-gradient(circle at 60% 60%, rgba(253,246,236,0.9), transparent 62%)",
            opacity: 0.8,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Main heart-frame photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", display: "inline-block", marginBottom: 42 }}
        >
          {/* Bow on top */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              position: "absolute",
              top: -48,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "3.5rem",
              filter: "drop-shadow(0 4px 12px rgba(244,184,193,0.6))",
              zIndex: 3,
            }}
          >
            🎀
          </motion.div>

          {/* Heart-shaped frame */}
          <div style={{
            width: 300,
            height: 280,
            position: "relative",
            margin: "0 auto",
          }}>
            {/* Glowing ring */}
            <motion.div
              className="animate-glow-pulse"
              style={{
                position: "absolute",
                inset: -10,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(244,184,193,0.3) 0%, transparent 70%)",
              }}
            />
            {/* Heart border */}
            <svg
              viewBox="0 0 100 90"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2 }}
            >
              <defs>
                <clipPath id="heartClip">
                  <path d="M50,80 C25,65 5,50 5,30 C5,15 15,5 28,5 C36,5 44,10 50,18 C56,10 64,5 72,5 C85,5 95,15 95,30 C95,50 75,65 50,80 Z" />
                </clipPath>
              </defs>
              <path
                d="M50,80 C25,65 5,50 5,30 C5,15 15,5 28,5 C36,5 44,10 50,18 C56,10 64,5 72,5 C85,5 95,15 95,30 C95,50 75,65 50,80 Z"
                fill="none"
                stroke="rgba(244,184,193,0.6)"
                strokeWidth="1.5"
              />
            </svg>
            {/* Photo inside heart */}
            <div style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              clipPath: "path('M150px,240px C75px,195px 15px,150px 15px,90px C15px,45px 45px,15px 84px,15px C108px,15px 132px,30px 150px,54px C168px,30px 192px,15px 216px,15px C255px,15px 285px,45px 285px,90px C285px,150px 225px,195px 150px,240px Z')",
            }}>
              <SafeImage
                src="/images/media_1.png"
                alt="Special memory"
                sizes="300px"
                fallbackEmoji="💕"
                placeholderText="media_1.png"
              />
            </div>
          </div>
        </motion.div>

        {/* Side polaroids */}
        <div style={{ display: "flex", justifyContent: "center", gap: 18, marginBottom: 40, flexWrap: "wrap" }}>
          {[
            { src: "/images/media_2.png", caption: "Here's to more adventures together", rotate: -6, text: true },
            { src: "/images/media_3.png", caption: "Can't wait for all the beautiful moments ahead", rotate: 5, text: true },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotate: p.rotate - 5 }}
              whileInView={{ opacity: 1, y: 0, rotate: p.rotate }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ delay: i * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="polaroid"
              style={{ width: 210, transform: `rotate(${p.rotate}deg)` }}
            >
              <div style={{
                height: 155,
                background: "linear-gradient(135deg, #FAE0E4, #F5ECD7)",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <SafeImage
                  src={p.src}
                  alt="Memory"
                  sizes="200px"
                  fallbackEmoji="🌸"
                  placeholderText={p.src.split("/").pop()}
                />
              </div>
              <p className="polaroid-caption" style={{ padding: "6px 10px", fontSize: "0.78rem", lineHeight: 1.4 }}>
                {p.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Surprise button or revealed message */}
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div key="button" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.button
                onClick={handleReveal}
                whileHover={{ scale: 1.08, boxShadow: "0 12px 40px rgba(244,184,193,0.7)" }}
                whileTap={{ scale: 0.94 }}
                style={{
                  background: "linear-gradient(135deg, var(--blush), var(--rose))",
                  color: "#fff",
                  border: "none",
                  padding: "18px 56px",
                  borderRadius: "60px",
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  boxShadow: "0 6px 28px rgba(244,184,193,0.5)",
                  letterSpacing: "0.05em",
                }}
                id="surprise-button"
              >
                🎁 Open Your Surprise
              </motion.button>
              <p className="font-dancing" style={{ marginTop: 14, color: "var(--brown-light)", fontSize: "0.9rem" }}>
                something special is waiting for you...
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-script" style={{ fontSize: "3.5rem", color: "var(--dusty-rose)",
                textShadow: "0 4px 20px rgba(244,184,193,0.4)", marginBottom: 16 }}>
                See you next year 🌸
              </h2>
              <p className="font-cormorant" style={{
                fontSize: "1.2rem", fontStyle: "italic", color: "var(--brown)",
                maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.8
              }}>
                Until then — keep shining, keep laughing, and know you are endlessly loved. ♡
              </p>
              <motion.div animate={{ scale: [1,1.15,1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <span style={{ fontSize: "3rem" }}>💗</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
