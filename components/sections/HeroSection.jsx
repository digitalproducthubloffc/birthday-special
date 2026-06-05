import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SafeImage from "../ui-custom/SafeImage";
import { useBlobs, getBlobUrl } from "../BlobContext";
import baloonPng from "@/pngs/baloon.png";
import cakePng from "@/pngs/cake.png";
import teddyPng from "@/pngs/teddybear.png";
import multiBaloonPng from "@/pngs/multiplebaloon.png";
import singleHeartPng from "@/pngs/singleheart.png";
import multiHeartPng from "@/pngs/multipleheart.png";
import butterflyPng from "@/pngs/butterfly.png";

// Global CSS for performance improvements
const GlobalStyles = (
  <style>{`
    .polaroid {
      will-change: transform;
      filter: drop-shadow(0 2px 4px rgba(139,111,94,0.15));
    }
    .floating-element {
      will-change: transform, opacity;
    }
  `}</style>
);

/* ── Scattered decorative data ─────────────────────────────── */
const GOLD_STARS = [
  { top: "5%", left: "38%", delay: 0, size: 14 },
  { top: "14%", left: "11%", delay: 0.4, size: 11 },
  { top: "8%", right: "38%", delay: 0.7, size: 13 },
  { top: "48%", left: "20%", delay: 0.2, size: 9 },
  { top: "72%", right: "14%", delay: 1.0, size: 12 },
  { top: "33%", right: "22%", delay: 0.5, size: 8 },
  { top: "88%", left: "52%", delay: 1.3, size: 10 },
  { top: "60%", left: "58%", delay: 0.8, size: 7 },
];

const BUTTERFLIES = [
  { top: "8%", left: "15%", delay: 0, dur: 5.5, flip: false },
  { top: "22%", right: "22%", delay: 1.5, dur: 6.2, flip: true },
  { top: "52%", left: "40%", delay: 0.8, dur: 7.0, flip: false },
  { top: "76%", right: "35%", delay: 2.2, dur: 5.8, flip: true },
];

const HEARTS = [
  { top: "7%", left: "53%", emoji: "💗", emojiImg: singleHeartPng, size: "1.7rem", delay: 0, dur: 3.2 },
  { top: "28%", left: "4%", emoji: "🩷", emojiImg: singleHeartPng, size: "1.3rem", delay: 0.6, dur: 4.0 },
  { top: "18%", right: "17%", emoji: "💕", emojiImg: multiHeartPng, size: "1.5rem", delay: 1.1, dur: 3.6 },
  { top: "68%", left: "52%", emoji: "💗", emojiImg: singleHeartPng, size: "1.1rem", delay: 0.3, dur: 5.0 },
  { top: "82%", left: "18%", emoji: "🩷", emojiImg: singleHeartPng, size: "1.9rem", delay: 1.7, dur: 3.0 },
  { top: "42%", right: "4%", emoji: "💕", emojiImg: multiHeartPng, size: "1rem", delay: 0.9, dur: 4.5 },
  { top: "55%", left: "8%", emoji: "❤️", emojiImg: singleHeartPng, size: "0.9rem", delay: 1.4, dur: 3.8 },
];

const FALLING_FLOWERS = [
  { left: "8%", delay: 0, duration: 9, size: 44, img: "/images/new_flower_2.png" },
  { left: "28%", delay: 2.2, duration: 11, size: 36, img: "/images/new_flower_1.png" },
  { left: "48%", delay: 0.8, duration: 8.5, size: 40, img: "/images/new_flower_2.png" },
  { left: "68%", delay: 3.5, duration: 12, size: 32, img: "/images/new_flower_1.png" },
  { left: "88%", delay: 1.8, duration: 10, size: 48, img: "/images/new_flower_2.png" },
];

const BALLOONS = [
  { left: "30%", bottom: "-10%", delay: 0, dur: 15, w: 62, h: 120 },
  { left: "65%", bottom: "-20%", delay: 3.5, dur: 18, w: 54, h: 110 },
  { left: "80%", bottom: "-15%", delay: 7.2, dur: 14, w: 70, h: 132 },
];

function FloatingTeddy({ top, left, bottom, right, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ rotate: [-6, 6, -6], y: [0, -10, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay }}
      style={{ position: "absolute", top, left, bottom, right, zIndex: 10, cursor: "pointer" }}
    >
      <div style={{ position: "relative", transform: "rotate(-6deg)" }}>
        <img
          src={teddyPng.src}
          alt="Teddy"
          style={{ width: 70, height: 70, objectFit: "contain", filter: "drop-shadow(0 6px 12px rgba(139,111,94,0.3))" }}
        />
        {hovered && (
          <motion.span
            initial={{ y: 0, opacity: 0, scale: 0.5 }}
            animate={{ y: -45, opacity: [0, 1, 0], scale: 1.2 }}
            transition={{ duration: 0.8 }}
            style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", fontSize: "1.6rem", pointerEvents: "none" }}
          >
            <img src={multiHeartPng.src} alt="Hearts" style={{ width: 34, height: 34, objectFit: "contain" }} />
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}

function PoppingBalloon() {
  return (
    <motion.div
      style={{ position: "absolute", top: "25%", right: "8%", zIndex: 15, width: 70, height: 130 }}
      animate={{
        y: [150, -50, -50, 150],
        scale: [1, 1.2, 0, 0],
        opacity: [0, 1, 1, 0],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      <img src={baloonPng.src} alt="Balloon" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      <motion.span
        style={{ position: "absolute", top: -10, left: -10, fontSize: "5rem" }}
        animate={{ scale: [0, 0, 1.5, 0], opacity: [0, 0, 1, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", times: [0, 0.45, 0.48, 0.55] }}
      >
        💥
      </motion.span>
    </motion.div>
  );
}

function GlowingCake() {
  return (
    <motion.div
      className="hero-left-cake"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", bottom: "16%", left: "28%", zIndex: 12, pointerEvents: "none" }}
    >
      <div style={{ position: "relative", width: 130, height: 130 }}>
        {/* Glow effect behind the cake */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 180, height: 180, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,230,190,0.6) 0%, transparent 70%)",
          filter: "blur(15px)", zIndex: -1
        }} />

        <img src={cakePng.src} alt="Aesthetic Cake" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 10px 15px rgba(139,111,94,0.3))" }} />

        {/* Fairy light sparkles around it */}
        <motion.span animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.2, 0.7] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: "absolute", top: -20, left: -10, fontSize: "2rem" }}>✨</motion.span>
        <motion.span animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.3, 0.7] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} style={{ position: "absolute", top: 10, right: -25, fontSize: "1.5rem" }}>🌟</motion.span>
        <motion.span animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }} transition={{ duration: 1.8, repeat: Infinity, delay: 1 }} style={{ position: "absolute", bottom: -10, left: 20, fontSize: "1.8rem" }}>✨</motion.span>

        <p className="font-dancing" style={{
          position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%) rotate(-4deg)",
          fontSize: "0.95rem", color: "var(--brown)", whiteSpace: "nowrap", fontWeight: "bold",
          textShadow: "0 2px 4px rgba(255,255,255,0.9)"
        }}>
          make a wish ♡
        </p>
      </div>
    </motion.div>
  );
}

function ForeverHappyCard() {
  const blobs = useBlobs();
  return (
    <motion.div
      initial={{ x: -100, opacity: 0, rotate: 15 }}
      whileInView={{ x: 0, opacity: 1, rotate: -5 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className="hero-forever-happy absolute z-10 w-[150px] pointer-events-auto max-lg:scale-75 max-lg:top-[35%] max-lg:left-[-5%] lg:top-[32%] lg:left-[4%]"
    >
      <motion.div
        animate={{ y: [0, -5, 0], rotate: [-5, -2, -5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="polaroid" style={{ padding: "6px 6px 20px", filter: "drop-shadow(0 10px 20px rgba(139,111,94,0.15))" }}>
        <div style={{ width: "100%", height: 110, position: "relative", overflow: "hidden", background: "#f0e8dc" }}>
          <SafeImage src={getBlobUrl(blobs, "hero_1.jpg", "/images/media_3.png")} alt="Sweet laugh" loading="lazy" />
        </div>
        <p className="font-dancing" style={{ fontSize: "0.72rem", color: "var(--brown)", textAlign: "center", marginTop: 4, fontWeight: "bold" }}>
          forever happy 💛
        </p>
      </motion.div>
    </motion.div>
  );
}

function AestheticDivider() {
  const blobs = useBlobs();
  return (
    <div style={{
      position: "absolute", bottom: "-2%", left: "5%", width: "100%",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      zIndex: 2, pointerEvents: "none"
    }}>

      {/* Scattered Desk Memories (Faded Polaroids in Background) */}
      <div className="hero-faded-polaroids" style={{ position: "absolute", top: -80, width: "100%", height: 150, zIndex: 1, opacity: 0.5 }}>
        <motion.div
          initial={{ opacity: 0, rotate: -25, y: 30 }}
          whileInView={{ opacity: 0.7, rotate: -18, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          style={{ position: "absolute", left: "28%", top: 20, width: 100 }}
        >
          <div className="polaroid" style={{ padding: "4px 4px 12px", background: "#f0e8dc" }}>
            <img src={getBlobUrl(blobs, "hero_2.jpg", "/images/roses_polaroid.png")} alt="memory" loading="lazy" style={{ width: "100%", height: 80, objectFit: "cover" }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: 25, y: 30 }}
          whileInView={{ opacity: 0.6, rotate: 22, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 }}
          style={{ position: "absolute", left: "52%", top: -5, width: 90 }}
        >
          <div className="polaroid" style={{ padding: "4px 4px 12px", background: "#f0e8dc" }}>
            <img src={getBlobUrl(blobs, "hero_3.jpg", "/images/media_4.png")} alt="memory" loading="lazy" style={{ width: "100%", height: 75, objectFit: "cover" }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: -15, y: 30 }}
          whileInView={{ opacity: 0.8, rotate: -8, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.4 }}
          style={{ position: "absolute", left: "75%", top: 30, width: 110 }}
        >
          <div className="polaroid" style={{ padding: "4px 4px 12px", background: "#f0e8dc" }}>
            <img src={getBlobUrl(blobs, "hero_4.jpg", "/images/media_1.png")} alt="memory" loading="lazy" style={{ width: "100%", height: 90, objectFit: "cover" }} />
          </div>
        </motion.div>
      </div>

      {/* Floral Vine & Ribbon Garland */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.9, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3 }}
        style={{
          width: "100%", zIndex: 2,
          display: "flex", justifyContent: "center", alignItems: "center",
          gap: "2.5vw", fontSize: "1.8rem",
          filter: "drop-shadow(0 4px 6px rgba(139,111,94,0.15))",
          marginTop: "40px"
        }}
      >
        {/* Repeating garland pattern */}
        <span>🌸</span><span>🌿</span><span>🎀</span><span>🌿</span><span>🌸</span><span>🌿</span><span>🎀</span><span>🌿</span><span>🌸</span><span>🌿</span><span>🎀</span><span>🌿</span><span>🌸</span><span>🌿</span><span>🎀</span>
      </motion.div>

      {/* Soft connecting string behind the garland */}
      <div style={{
        position: "absolute", bottom: "16px", left: 0, width: "100%", height: 2,
        background: "rgba(244,184,193,0.4)", zIndex: 1
      }} />

    </div>
  );
}

function LeftSideCards() {
  const blobs = useBlobs();
  return (
    <div className="hero-make-a-wish absolute z-10 w-[300px] h-[400px] pointer-events-none max-lg:top-[5%] max-lg:left-[2%] lg:top-[8%] lg:left-[2%] max-lg:scale-[0.75] origin-top-left">

      {/* 1. Make A Wish Polaroid */}
      <motion.div
        initial={{ x: -100, opacity: 0, rotate: -20 }}
        whileInView={{ x: 0, opacity: 1, rotate: -8 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        style={{ position: "absolute", top: -20, left: -10, width: 160, pointerEvents: "auto", filter: "drop-shadow(0 15px 25px rgba(139,111,94,0.25))" }}
      >
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [-8, -6, -8] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="polaroid" style={{ padding: "8px 8px 24px", filter: "drop-shadow(0 15px 25px rgba(139,111,94,0.25))", width: "100%", background: "#fff" }}
        >
          <div style={{ width: "100%", height: 140, position: "relative", overflow: "hidden", background: "#f0e8dc" }}>
            <SafeImage src={getBlobUrl(blobs, "hero_5.jpg", "/images/media_6.png")} alt="Make a wish" loading="lazy" />
          </div>
          <p className="font-dancing" style={{ fontSize: "1.1rem", color: "var(--rose)", textAlign: "center", marginTop: 8, fontWeight: "bold" }}>
            Make a wish ♡
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function MobileCircleSlider() {
  const blobs = useBlobs();
  const images = [
    getBlobUrl(blobs, "hero_1.jpg", "/images/roses_polaroid.png"),
    getBlobUrl(blobs, "hero_2.jpg", "/images/media_4.png"),
    getBlobUrl(blobs, "hero_3.jpg", "/images/media_1.png"),
    getBlobUrl(blobs, "hero_4.jpg", "/images/media_3.png"),
    getBlobUrl(blobs, "hero_5.jpg", "/images/media_5.png")
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="mobile-circle-slider" style={{
      position: "absolute",
      top: "12px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "300px",
      height: "300px",
      borderRadius: "50%",
      border: "5px solid rgba(255, 182, 193, 0.9)",
      boxShadow: "0 0 25px rgba(255, 182, 193, 0.7), inset 0 0 15px rgba(255, 182, 193, 0.5)",
      overflow: "hidden",
      zIndex: 2,
      background: "#fdf8f5"
    }}>
      {images.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none"
          }}
          loading="lazy"
          alt="Memory loop"
        />
      ))}
    </div>
  );
}

function MobileHeroText() {
  return (
    <div className="mobile-hero-text" style={{
      position: "absolute",
      top: "330px", // Placed elegantly beneath the 300px circle slider
      left: "5%",
      width: "90%",
      flexDirection: "column",
      alignItems: "center",
      zIndex: 10,
    }}>
      <h1 className="font-dancing" style={{
        fontSize: "3.5rem",
        color: "#e2788e",
        textShadow: "1px 1px 0px rgba(255,255,255,0.8), 2px 2px 5px rgba(226, 120, 142, 0.4)",
        lineHeight: 1,
        margin: "0 0 10px 0",
        fontWeight: "bold",
        textAlign: "center"
      }}>
        Happy Birthday
      </h1>

      <h2 className="font-serif" style={{
        fontSize: "1.8rem",
        color: "#d0647a",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        margin: "0 0 15px 0"
      }}>
        Beautiful Soul <span>💗</span>
      </h2>

      {/* Gold Divider with heart */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "18px", width: "80%" }}>
        <span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #c89d38)" }}></span>
        <span style={{ color: "#d4af37", fontSize: "1.1rem" }}>💛</span>
        <span style={{ flex: 1, height: "1px", background: "linear-gradient(270deg, transparent, #c89d38)" }}></span>
      </div>

      <p className="font-serif" style={{
        fontSize: "1.15rem",
        color: "#5a4135",
        textAlign: "center",
        fontWeight: "500",
        maxWidth: "300px",
        margin: "0 0 18px 0",
        lineHeight: 1.4
      }}>
        “You deserve all the<br />happiness in the world”
      </p>

      {/* Bottom Pink Divider */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "20px", width: "50%" }}>
        <span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #e2788e)" }}></span>
        <span style={{ color: "#e2788e", fontSize: "0.9rem" }}>💗</span>
        <span style={{ flex: 1, height: "1px", background: "linear-gradient(270deg, transparent, #e2788e)" }}></span>
      </div>

      {/* Row of specific icons (Cherry Blossom, Heart, Teddy, Cake) */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px" }}>
        <span style={{ fontSize: "1.4rem", filter: "drop-shadow(0 2px 4px rgba(255,182,193,0.8))" }}>🌸</span>
        <img src={singleHeartPng.src} alt="heart" style={{ width: "16px", objectFit: "contain", filter: "drop-shadow(0 2px 4px rgba(255,182,193,0.8))" }} />
        <img src={teddyPng.src} alt="teddy" style={{ width: "26px", objectFit: "contain", filter: "drop-shadow(0 2px 4px rgba(255,182,193,0.8))" }} />
        <img src={cakePng.src} alt="cake" style={{ width: "26px", objectFit: "contain", filter: "drop-shadow(0 2px 4px rgba(255,182,193,0.8))" }} />
        <img src={singleHeartPng.src} alt="heart" style={{ width: "16px", objectFit: "contain", filter: "drop-shadow(0 2px 4px rgba(255,182,193,0.8))" }} />
        <span style={{ fontSize: "1.4rem", filter: "drop-shadow(0 2px 4px rgba(255,182,193,0.8))" }}>🌸</span>
      </div>

      <div style={{ width: "80%", borderBottom: "1.5px dashed rgba(226, 120, 142, 0.3)", marginTop: "25px" }}></div>
    </div>
  );
}

export default function HeroSection() {
  const blobs = useBlobs();
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #FDF6EC 0%, #F9EDE3 38%, #FAE0E4 68%, #F5ECD7 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "60px 24px 80px",
        willChange: "transform, opacity",
      }}
    >
      <style>{`
        /* Cap the hero height on tall iPads/monitors to destroy the huge bottom gap */
        @media (min-width: 751px) and (min-height: 900px) {
          #hero {
            min-height: 920px !important;
            height: 920px !important;
          }
        }

        @media (max-width: 750px) {
          .hero-grid-container {
            display: flex !important;
            justify-content: center !important;
            align-items: flex-start !important;
            margin-top: 0 !important;
          }
          /* Big Collage: Top-Left */
          .hero-left-collage {
            position: absolute !important;
            z-index: 20 !important;
            transform: scale(0.4) !important;
            transform-origin: left top !important;
            opacity: 0.95 !important;
            top: -50px !important;
            left: -2% !important;
            pointer-events: none !important;
          }
          /* Shine Bright: Below the collage */
          .hero-shine-bright {
            bottom: -180px !important;
            left: 100px !important;
          }
          /* Center Card: At the top */
          .hero-right-card {
            z-index: 10 !important;
            margin-top: -30px !important;
            margin-bottom: 80px !important;
          }
          /* Forever happy: Lower-Middle-Left */
          .hero-forever-happy {
            z-index: 20 !important;
            left: 0% !important;
            top: 60% !important;
            transform: scale(0.9) !important;
            transform-origin: left center !important;
          }
          /* Make a wish: Top-Right */
          .hero-make-a-wish {
            top: 10% !important;
            left: auto !important;
            right: -10% !important;
            transform: scale(0.8) !important;
            transform-origin: right top !important;
          }
          /* Sweet memories: Middle-Right */
          .hero-sweet-memories {
            top: 25% !important;
            left: auto !important;
            right: -2% !important;
            transform: scale(0.9) !important;
            transform-origin: right center !important;
          }
          /* So beautiful: Bottom-Right */
          .hero-so-beautiful {
            transform: translateY(0) translateX(0) scale(0.9) !important;
            transform-origin: right center !important;
            left: auto !important;
            right: -2% !important;
            top: 85% !important;
          }
        }
        
        /* For wider mobile/tablets where there's a physical gap on the sides */
        @media (max-width: 750px) and (min-width: 500px) {
          .hero-left-collage {
            top: -60px !important;
            left: 0% !important;
            transform: scale(0.45) !important;
          }
          .hero-forever-happy {
            left: 2% !important;
            transform: scale(1.1) !important;
          }
          .hero-make-a-wish {
            right: -10% !important;
            transform: scale(0.95) !important;
          }
          .hero-sweet-memories {
            right: -15% !important;
            transform: scale(1) !important;
          }
          .hero-so-beautiful {
            right: -15% !important;
            transform: scale(1) !important;
          }
        }

        /* Explicit separation for screens 550px and below */
        @media (max-width: 550px) {
          .hero-right-card {
            max-width: 360px !important;
            min-height: 440px !important;
          }
          .hero-left-collage {
            left: -8% !important;
            top: 5px !important;
          }
          .hero-shine-bright {
            left: -5px !important;
            bottom: -200px !important;
          }
          .hero-forever-happy {
            left: -5% !important;
            top: 360px !important; /* Bottom-left gap */
          }
          .hero-make-a-wish {
            right: -8% !important;
            top: 15% !important; /* Move down relative to section to avoid sticker */
          }
          .hero-sweet-memories {
            right: -60px !important;
            top: 220px !important; /* Exactly between 'Beautiful Soul' and 'You deserve' */
          }
          .hero-so-beautiful {
            right: -80px !important; /* Compensates for the -20px X translation */
            top: 480px !important; /* Bottom-right gap. 480px compensates for -80px translation */
          }
        }

        .mobile-circle-slider,
        .mobile-hero-text {
          display: none !important;
        }

        /* Very small screens: 450px and below */
        @media (max-width: 450px) {
          .hero-left-cake {
            bottom: auto !important;
            top: 200px !important;
            left: -10px !important;
            zoom: 0.7;
          }
          .hero-right-cake {
            bottom: auto !important;
            top: 180px !important;
            right: -10px !important;
            zoom: 0.8;
          }
          .mobile-circle-slider {
            display: block !important;
          }
          .mobile-hero-text {
            display: flex !important;
          }
          .hero-right-card,
          .hero-left-collage,
          .hero-make-a-wish,
          .hero-forever-happy,
          .hero-faded-polaroids {
            display: none !important;
          }
        }

        /* Ultra small screens: 400px and below */
        @media (max-width: 400px) {
          .hero-right-card {
            max-width: 270px !important; /* Shrink the card to give outer polaroids room! */
            min-height: 420px !important;
            margin-top: -60px !important;
          }
          .hero-left-collage {
            left: -15% !important;
            top: -15px !important;
            transform: scale(0.3) !important;
          }
          .hero-shine-bright {
            left: 120px !important; /* Bring back onto screen inside the 0.3 scale */
            bottom: -500px !important;
          }
          .hero-forever-happy {
            left: -5% !important;
            top: 360px !important;
          }
          .hero-make-a-wish {
            right: -15% !important;
            top: 5% !important;
          }
          .hero-sweet-memories {
            right: -30px !important;
            top: 200px !important;
          }
          .hero-so-beautiful {
            right: -40px !important;
            top: 460px !important;
          }
        }
      `}</style>
      {GlobalStyles}

      {/* ═══ LAYER 0: Ambient watercolor blobs ═══════════════════ */}
      <div style={{
        position: "absolute", top: "5%", left: "10%", width: 340, height: 340,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(244,184,193,0.2) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "8%", width: 280, height: 280,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,133,0.16) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0
      }} />

      {/* ═══ LAYER 1: Gold twinkling stars ══════════════════════ */}
      {GOLD_STARS.map((s, i) => (
        <motion.span key={`star-${i}`}
          style={{
            position: "absolute", top: s.top, left: s.left, right: s.right,
            fontSize: s.size, color: "#D4A853", zIndex: 15, pointerEvents: "none"
          }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 2.5, delay: s.delay, repeat: Infinity, repeatDelay: 2.5 }}
        >✦</motion.span>
      ))}

      {/* ═══ LAYER 2: Butterflies with Flapping Wings ══════════════════════ */}
      {BUTTERFLIES.map((b, i) => (
        <motion.div key={`bf-${i}`}
          style={{
            position: "absolute", top: b.top, left: b.left, right: b.right,
            zIndex: 15, pointerEvents: "none"
          }}
          animate={{ x: [0, 40, -20, 35, 0], y: [0, -25, 10, -20, 0], rotate: [0, 15, -10, 20, 0] }}
          transition={{ duration: b.dur + 1, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="animate-flap" style={{ display: "inline-block", transformOrigin: "center", transform: b.flip ? "scaleX(-1)" : "none" }}>
            <img src={butterflyPng.src} alt="Butterfly" style={{ width: 75, height: 75, objectFit: "contain", filter: "drop-shadow(0 5px 8px rgba(0,0,0,0.2))" }} />
          </div>
        </motion.div>
      ))}

      {/* ═══ LAYER 2: Floating hearts ═══════════════════════════ */}
      {HEARTS.map((h, i) => (
        <motion.div key={`heart-${i}`}
          style={{
            position: "absolute", top: h.top, left: h.left, right: h.right,
            fontSize: h.size, zIndex: 15, pointerEvents: "none"
          }}
          animate={{ y: [0, -13, 0], scale: [1, 1.22, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: h.dur, delay: h.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {h.emojiImg ? (
            <img src={h.emojiImg.src} alt={h.emoji} style={{ width: h.size === "1.9rem" ? 30 : h.size === "1.7rem" ? 27 : h.size === "1.5rem" ? 24 : h.size === "1.3rem" ? 21 : h.size === "1.1rem" ? 18 : 15, height: h.size === "1.9rem" ? 30 : h.size === "1.7rem" ? 27 : h.size === "1.5rem" ? 24 : h.size === "1.3rem" ? 21 : h.size === "1.1rem" ? 18 : 15, objectFit: "contain" }} />
          ) : (
            <span>{h.emoji}</span>
          )}
        </motion.div>
      ))}

      {/* ═══ LAYER 2: Falling Flowers ═══════════════════════════ */}
      {FALLING_FLOWERS.map((f, i) => (
        <div key={`falling-flower-${i}`}
          className="animate-fall"
          style={{
            position: "absolute", left: f.left, top: -60,
            width: f.size, height: f.size, zIndex: 15, pointerEvents: "none",
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`
          }}
        >
          <img src={f.img} alt="Flower petal" style={{ width: "100%", height: "100%", objectFit: "contain", opacity: 0.75, filter: "drop-shadow(0 2px 4px rgba(139,111,94,0.08))" }} />
        </div>
      ))}

      {/* ═══ LAYER 2: Animated Floating Balloons from bottom ══════════ */}
      {BALLOONS.map((b, i) => (
        <motion.div key={`balloon-${i}`}
          style={{ position: "absolute", bottom: b.bottom, left: b.left, zIndex: 15, pointerEvents: "none", width: b.w, height: b.h }}
          animate={{ y: [0, -1200], x: [0, 30, -30, 20, -20, 0], rotate: [-10, 10, -10, 10, -10] }}
          transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "linear" }}
        >
          <img
            src={baloonPng.src}
            alt="Balloon"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </motion.div>
      ))}

      {/* A Popping Balloon Effect */}
      <PoppingBalloon />

      {/* ═══ Teddy bear card stickers ════════════ */}
      <FloatingTeddy bottom="5%" left="5%" delay={0} />
      <FloatingTeddy top="15%" right="4%" delay={1.5} />

      {/* ═══ Big Birthday Cake (bottom-right) ════════ */}
      <motion.div
        className="hero-right-cake"
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", bottom: "8%", right: "8%", zIndex: 12, cursor: "pointer" }}
      >
        <img
          src={cakePng.src}
          alt="Cake"
          style={{ width: 110, height: 110, objectFit: "contain", filter: "drop-shadow(0 15px 25px rgba(244,184,193,0.4))" }}
        />
      </motion.div>

      {/* ═══ Left Side Images & Make A Wish Polaroid ═════════════════════ */}
      <LeftSideCards />

      {/* ═══ Aesthetic Glowing Cake to fill empty gap ═════════════════════ */}
      <GlowingCake />

      {/* ═══ Forever Happy Polaroid in the empty gap ═════════════════════ */}
      <ForeverHappyCard />


      {/* ═══════════════════════════════════════════════════════════
           MAIN SCRAPBOARD GRID (Shifted Upwards)
      ═══════════════════════════════════════════════════════════ */}
      <div
        style={{ maxWidth: 1050, width: "100%", position: "relative", zIndex: 5, marginTop: "20px" }}
        className="hero-grid-container grid grid-cols-1 min-[700px]:grid-cols-2 gap-8 min-[700px]:gap-14 items-center mx-auto"
      >

        {/* ──────────── LEFT COLUMN: Scrapbook Photo Collage ──────────── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ position: "relative", marginTop: "30px", paddingLeft: "10%" }}
          className="hero-left-collage w-full max-w-[480px] mx-auto"
        >
          {/* Main polaroid (drifts gently) */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [-4, -2, -4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "relative", zIndex: 3 }}
          >
            {/* Washi tape top */}
            <div style={{
              position: "absolute", top: -12, left: "50%", transform: "translateX(-50%) rotate(-3deg)",
              width: 70, height: 24, borderRadius: 3,
              background: "linear-gradient(135deg, rgba(244,184,193,0.8), rgba(212,168,133,0.7))",
              zIndex: 10,
            }} />

            {/* BIG polaroid */}
            <div className="polaroid" style={{ width: "100%", maxWidth: 300, margin: "0 auto", paddingBottom: 46 }}>
              <div style={{ width: "100%", height: 320, position: "relative", overflow: "hidden", background: "#f0e8dc" }}>
                <SafeImage priority={true} src={getBlobUrl(blobs, "hero_6.jpg", "/images/media_1.png")} alt="A day to celebrate you" />
              </div>
              <p className="font-dancing" style={{
                textAlign: "center", fontSize: "1rem", fontWeight: 600,
                color: "var(--brown)", marginTop: 12, letterSpacing: "0.02em",
              }}>A day to celebrate you ♡</p>
            </div>
          </motion.div>

          {/* Pink bow sticker */}
          <motion.span
            animate={{ rotate: [-5, 5, -5], scale: [1, 1.05, 1] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            style={{
              position: "absolute", bottom: -10, left: 15, fontSize: "3.5rem",
              filter: "drop-shadow(0 4px 12px rgba(244,164,193,0.5))", display: "inline-block", zIndex: 10
            }}
          >🎀</motion.span>

          {/* Overlapping Polaroid 5 (bottom-left card overlap) */}
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [-6, -8, -6] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            style={{
              position: "absolute", bottom: -30, left: "-35px",
              zIndex: 5, width: 140,
            }}
            className="hero-shine-bright"
          >
            <div className="polaroid" style={{ padding: "6px 6px 20px" }}>
              <div style={{ width: "100%", height: 120, position: "relative", overflow: "hidden", background: "#f0e8dc" }}>
                <SafeImage src={getBlobUrl(blobs, "hero_7.jpg", "/images/media_2.png")} alt="Sweet memory" loading="lazy" />
              </div>
              <p className="font-dancing" style={{ fontSize: "0.72rem", color: "var(--rose)", textAlign: "center", marginTop: 4, fontWeight: "bold" }}>
                you shine bright ✨
              </p>
            </div>
          </motion.div>

          {/* Overlapping Polaroid 3 (top-right background overlap) */}
          <motion.div
            animate={{ y: [0, -7, 0], rotate: [10, 12, 10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            style={{ position: "absolute", top: -20, right: "-20px", zIndex: 2, width: 135 }}
            className="max-lg:-translate-y-[80px]"
          >
            <div className="polaroid" style={{ padding: "6px 6px 20px", opacity: 0.9 }}>
              <div style={{ width: "100%", height: 110, position: "relative", overflow: "hidden", background: "#f0e8dc" }}>
                <SafeImage loading="lazy" src={getBlobUrl(blobs, "hero_8.jpg", "/images/roses_polaroid.png")} alt="Golden moments" />
              </div>
              <p className="font-dancing" style={{ fontSize: "0.68rem", color: "var(--brown-light)", textAlign: "center", marginTop: 4 }}>
                beautiful days 🌸
              </p>
            </div>
          </motion.div>

        </motion.div>


        {/* ──────────── RIGHT COLUMN: Birthday Card + Extra collage ──────────── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          style={{ display: "flex", flexDirection: "column", gap: 15, alignItems: "center", position: "relative", width: "100%", marginTop: "-60px" }}
          className="hero-right-card w-full max-w-[480px] mx-auto"
        >

          {/* Overlapping collage top row */}
          <div style={{ display: "flex", gap: 16, alignItems: "flex-end", width: "100%", justifyContent: "flex-end", position: "relative", zIndex: 3, paddingRight: "30px" }}>

            {/* "You are so special" sticker with pushpin */}
            <motion.div
              initial={{ opacity: 0, rotate: -8, y: -20 }}
              whileInView={{ opacity: 1, rotate: -5, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                background: "rgba(255,255,255,0.95)",
                padding: "8px 14px", borderRadius: "6px",
                boxShadow: "0 6px 18px rgba(139,111,94,0.15)",
                border: "1px solid rgba(244,184,193,0.3)",
                alignSelf: "center", position: "relative",
              }}
            >
              {/* Pushpin */}
              <div style={{
                position: "absolute", top: -9, left: "50%", transform: "translateX(-50%)",
                width: 14, height: 14, borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #F5D782, #C9A227)",
                boxShadow: "0 2px 6px rgba(201,162,39,0.5)",
              }} />
              <p className="font-dancing" style={{ fontSize: "0.85rem", color: "var(--rose)", textAlign: "center", fontWeight: 600, lineHeight: 1.4 }}>
                You are<br />so special ✨
              </p>
            </motion.div>

          </div>

          {/* THE REDESIGNED BIRTHDAY CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.93 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "100%", position: "relative", zIndex: 4 }}
          >
            {/* Gold washi tape strip on top of card */}
            <div style={{
              position: "absolute", top: -12, left: "50%", transform: "translateX(-50%) rotate(2deg)",
              width: 75, height: 24, borderRadius: 3,
              background: "linear-gradient(135deg, rgba(200,169,110,0.8), rgba(244,184,193,0.7))",
              zIndex: 10,
            }} />

            {/* Card wrapper */}
            <div style={{
              background: "linear-gradient(135deg, #FFFDFB 0%, #FFF5F6 50%, #FCF0EB 100%)",
              borderRadius: "12px",
              boxShadow: "0 12px 50px rgba(139,111,94,0.22), 0 3px 15px rgba(244,184,193,0.15)",
              border: "2px solid rgba(200,169,110,0.35)",
              position: "relative", overflow: "hidden",
            }}>
              {/* Dashed line inner border */}
              <div style={{
                position: "absolute", inset: 10,
                border: "1px dashed rgba(200,169,110,0.4)",
                borderRadius: "8px", pointerEvents: "none",
              }} />

              {/* Water color ambient wash inside card */}
              <div style={{
                position: "absolute", bottom: -20, left: -20, width: 140, height: 140,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(244,184,193,0.15) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />

              <div style={{ padding: "30px 30px 24px", position: "relative", zIndex: 1 }}>
                {/* Corner floral decorations */}
                <span style={{ position: "absolute", top: 14, left: 14, fontSize: "1.2rem", color: "var(--gold)", opacity: 0.8 }}>✿</span>
                <span style={{ position: "absolute", top: 14, right: 14, fontSize: "1.2rem", color: "var(--gold)", opacity: 0.8 }}>✿</span>
                <span style={{ position: "absolute", bottom: 14, left: 14, fontSize: "1.2rem", color: "var(--gold)", opacity: 0.6 }}>✿</span>
                <span style={{ position: "absolute", bottom: 14, right: 14, fontSize: "1.2rem", color: "var(--gold)", opacity: 0.6 }}>✿</span>

                {/* Decorative header flower emoji string */}
                <div style={{ textAlign: "center", marginBottom: 8, fontSize: "1.4rem", letterSpacing: 8 }}>
                  🌹✨🌸✨🌹
                </div>

                {/* HAPPY BIRTHDAY Title */}
                <h1 className="font-cormorant" style={{
                  fontSize: "clamp(1.7rem, 4.5vw, 2.3rem)",
                  background: "linear-gradient(to right, #B38646, #D4A853, #E8C875, #B38646)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textAlign: "center",
                  fontWeight: "bold",
                  letterSpacing: "0.15em",
                  lineHeight: 1.2,
                  marginBottom: 6,
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))"
                }}>
                  HAPPY BIRTHDAY
                </h1>

                <p className="font-cormorant" style={{
                  fontSize: "0.95rem", color: "var(--brown-light)", fontStyle: "italic",
                  textAlign: "center", marginBottom: 2, letterSpacing: "0.12em",
                }}>
                  — to the most —
                </p>

                {/* Name / Beautiful Soul (Dancing Script Cursive) */}
                <motion.h2
                  className="font-dancing"
                  animate={{ textShadow: ["0 2px 14px rgba(212,132,142,0.25)", "0 4px 28px rgba(212,132,142,0.5)", "0 2px 14px rgba(212,132,142,0.25)"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    fontSize: "clamp(3rem, 7vw, 4.4rem)",
                    lineHeight: 0.95, color: "var(--rose)",
                    textAlign: "center", marginBottom: 12,
                    transform: "rotate(-2deg)",
                  }}
                >
                  Beautiful Soul
                </motion.h2>

                {/* Heart divider */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ height: 1.5, width: 45, background: "linear-gradient(90deg, transparent, var(--gold))" }} />
                  <motion.img animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }} src={singleHeartPng.src} alt="Heart" style={{ width: 20, height: 20, objectFit: "contain" }} />
                  <div style={{ height: 1.5, width: 45, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
                </div>

                {/* Blessing message */}
                <p className="font-dancing" style={{
                  fontSize: "1.9rem", color: "var(--brown)",
                  textAlign: "center", lineHeight: 1.3, marginBottom: 14,
                }}>
                  You deserve all the happiness<br />in the universe ✨
                </p>

                {/* Signature */}
                <p className="font-dancing" style={{
                  fontSize: "0.95rem", color: "var(--rose)", textAlign: "right",
                  marginBottom: 8, fontWeight: 600, paddingRight: 10,
                }}>
                  — with all my love ♡
                </p>

                {/* Animated emoji string */}
                <div style={{ display: "flex", justifyContent: "center", gap: 12, fontSize: "1.3rem", marginTop: 4 }}>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ scale: [1, 1.25, 1], y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
                      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26 }}
                    >
                      {i === 2 ? (
                        <img src={teddyPng.src} alt="Teddy" style={{ width: 24, height: 24, objectFit: "contain" }} />
                      ) : i === 3 ? (
                        <img src={cakePng.src} alt="Cake" style={{ width: 24, height: 24, objectFit: "contain" }} />
                      ) : i === 1 || i === 4 ? (
                        <img src={singleHeartPng.src} alt="Heart" style={{ width: 20, height: 20, objectFit: "contain" }} />
                      ) : (
                        <span>🌸</span>
                      )}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Pink wax seal with gold heart emoji */}
              <div style={{
                position: "absolute", bottom: 10, right: 15,
                width: 55, height: 55, borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #F4B8C1, #C5848E)",
                boxShadow: "0 4px 14px rgba(139,111,94,0.25), inset 0 -2px 6px rgba(0,0,0,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 10, border: "2.5px solid rgba(255,255,255,0.45)",
                transform: "rotate(-10deg)"
              }}>
                <span style={{ fontSize: "1.6rem", filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))" }}>💝</span>
              </div>

            </div>
          </motion.div>

          {/* Overlapping Polaroid 5 (middle-left card overlap) */}
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [-10, -12, -10] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            style={{
              position: "absolute", top: "40%", left: "-70px",
              zIndex: 5, width: 130,
            }}
            className="hero-sweet-memories"
          >
            <div className="polaroid" style={{ padding: "6px 6px 20px" }}>
              <div style={{ width: "100%", height: 105, position: "relative", overflow: "hidden", background: "#f0e8dc" }}>
                <SafeImage src={getBlobUrl(blobs, "hero_9.jpg", "/images/media_4.png")} alt="Golden days" loading="lazy" />
              </div>
              <p className="font-dancing" style={{ fontSize: "0.65rem", color: "var(--rose)", textAlign: "center", marginTop: 4, fontWeight: "bold" }}>
                sweet memories ✨
              </p>
            </div>
          </motion.div>

          {/* Overlapping Polaroid 6 (bottom-left) */}
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [4, 6, 4] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 1.0 }}
            style={{ position: "absolute", bottom: -30, left: "-40px", zIndex: 5, width: 125 }}
            className="hero-so-beautiful max-lg:-translate-y-[80px] max-lg:-translate-x-[20px]"
          >
            <div className="polaroid" style={{ padding: "6px 6px 20px", opacity: 0.95 }}>
              <div style={{ width: "100%", height: 100, position: "relative", overflow: "hidden", background: "#f0e8dc" }}>
                <SafeImage src={getBlobUrl(blobs, "hero_10.jpg", "/images/media_5.png")} alt="Treasured moments" loading="lazy" />
              </div>
              <p className="font-dancing" style={{ fontSize: "0.62rem", color: "var(--brown-light)", textAlign: "center", marginTop: 4 }}>
                so beautiful ♡
              </p>
            </div>
          </motion.div>

          {/* Floating hearts around card */}
          <motion.img
            animate={{ scale: [1, 1.35, 1], y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            src={singleHeartPng.src}
            alt="Heart"
            style={{
              position: "absolute", top: -15, right: -12, width: 28, height: 28,
              filter: "drop-shadow(0 0 10px rgba(244,184,193,0.95))", display: "inline-block", zIndex: 10, objectFit: "contain"
            }}
          />
          <motion.img
            animate={{ scale: [1, 1.25, 1], y: [0, -6, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: 0.8 }}
            src={multiHeartPng.src}
            alt="Hearts"
            style={{ position: "absolute", bottom: -35, right: "15%", width: 22, height: 22, display: "inline-block", zIndex: 10, objectFit: "contain" }}
          />

        </motion.div>

      </div>

      {/* ═══ Mobile Only Circular Slider ═════════════════════ */}
      <MobileCircleSlider />

      {/* ═══ Mobile Only Text Section ═══════════════════════ */}
      <MobileHeroText />

      {/* ═══ Aesthetic Transition Divider ═════════════════════ */}
      <AestheticDivider />

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 1.5, delay: 1.4, repeat: Infinity }}
        onClick={() => document.getElementById("memories")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          position: "absolute",
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: 38, height: 38, borderRadius: "50%",
          background: "linear-gradient(135deg, var(--blush), var(--rose))",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", cursor: "pointer", fontSize: "1.1rem",
          boxShadow: "0 5px 18px rgba(244,184,193,0.55)",
          zIndex: 10,
        }}
      >↓</motion.div>
    </section>
  );
}
