"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import SafeImage from "../ui-custom/SafeImage";
import { useBlobs, getBlobUrl } from "../BlobContext";
import baloonPng from "@/pngs/baloon.png";
import cakePng from "@/pngs/cake.png";
import teddyPng from "@/pngs/teddybear.png";
import singleHeartPng from "@/pngs/singleheart.png";
import multiHeartPng from "@/pngs/multipleheart.png";
import butterflyPng from "@/pngs/butterfly.png";

/* ─── Image sources ───────────────────────────────────────────── */
const IMGS = [
  "/images/memory1.png",
  "/images/media_1.png",
  "/images/media_2.png",
  "/images/media_3.png",
  "/images/media_4.png",
  "/images/media_5.png",
];

/* ─── 21 Years data ───────────────────────────────────────────── */
const YEARS = [
  { age: 1, emoji: "👶", label: "Baby Steps", color: "#FDE8EF", accent: "#F4B8C1", type: "photo" },
  { age: 2, emoji: "🎈", emojiImg: baloonPng, label: "More Smiles", color: "#FFF0E6", accent: "#FFBB85", type: "photo" },
  { age: 3, emoji: "🧸", emojiImg: teddyPng, label: "Teddy Love", color: "#FDE8EF", accent: "#F4B8C1", type: "photo" },
  { age: 4, emoji: "🌈", label: "Dream Big", color: "#F0F8FF", accent: "#A8D8EA", type: "photo" },
  { age: 5, emoji: "🎂", emojiImg: cakePng, label: "First Cake", color: "#FFF9E6", accent: "#FFD97D", type: "photo" },
  { age: 6, emoji: "🌸", label: "Pretty Days", color: "#FDE8EF", accent: "#F4B8C1", type: "photo" },
  { age: 7, emoji: "✨", label: "Little Explorer", color: "#FFFDE7", accent: "#FFE082", type: "photo" },
  { age: 8, emoji: "📚", label: "Love to Learn", color: "#F3E5F5", accent: "#CE93D8", type: "photo" },
  { age: 9, emoji: "🎨", label: "Little Artist", color: "#FFF0E6", accent: "#FFBB85", type: "photo" },
  { age: 10, emoji: "🎁", label: "Best Gifts", color: "#FFF9E6", accent: "#FFD97D", type: "photo" },
  { age: 11, emoji: "💖", emojiImg: singleHeartPng, label: "Growing Heart", color: "#FDE8EF", accent: "#F4B8C1", type: "note" },
  { age: 12, emoji: "🌷", label: "Blooming", color: "#FDE8EF", accent: "#E899A8", type: "photo" },
  { age: 13, emoji: "🌙", label: "Sweet Thoughts", color: "#EDE7F6", accent: "#B39DDB", type: "note" },
  { age: 14, emoji: "🦋", label: "Finding Myself", color: "#E8F5E9", accent: "#A5D6A7", type: "photo" },
  { age: 15, emoji: "🌻", label: "Shine Bright", color: "#FFF9E6", accent: "#FFD97D", type: "photo" },
  { age: 16, emoji: "⭐", label: "Sweet Sixteen", color: "#FFF0E6", accent: "#FFBB85", type: "ticket" },
  { age: 17, emoji: "💫", label: "Good Things", color: "#EDE7F6", accent: "#B39DDB", type: "note" },
  { age: 18, emoji: "🎓", label: "New Chapter", color: "#E3F2FD", accent: "#90CAF9", type: "photo" },
  { age: 19, emoji: "🎉", label: "Party Time", color: "#FDE8EF", accent: "#F4B8C1", type: "spotify" },
  { age: 20, emoji: "❤️", emojiImg: singleHeartPng, label: "Full of Love", color: "#FFF0F3", accent: "#FF8FAB", type: "photo" },
  { age: 21, emoji: "🥂", label: "Cheers to 21", color: "#FFF9E6", accent: "#FFD97D", type: "photo" },
  { age: 22, emoji: "🌟", label: "Brilliant Mind", color: "#FDE8EF", accent: "#F4B8C1", type: "photo" },
  { age: 23, emoji: "🥂", label: "Cheers to Life", color: "#FFF0E6", accent: "#FFBB85", type: "note" },
  { age: 24, emoji: "🚀", label: "Reaching High", color: "#F0F8FF", accent: "#A8D8EA", type: "photo" },
  { age: 25, emoji: "💍", label: "Silver Lining", color: "#F3E5F5", accent: "#CE93D8", type: "photo" },
  { age: 26, emoji: "✈️", label: "New Horizons", color: "#FFF9E6", accent: "#FFD97D", type: "ticket" },
  { age: 27, emoji: "💖", emojiImg: singleHeartPng, label: "Pure Gold", color: "#FDE8EF", accent: "#F4B8C1", type: "photo" },
  { age: 28, emoji: "👑", label: "Queen of the World", color: "#FFF9E6", accent: "#FFD97D", type: "finale", finale: true },
];

/* ─── Row sizes: [5, 4, 5, 4, 3] ─────────────────────────────── */
const ROW_SIZES = [5, 4, 5, 4, 5, 5];
const ROWS = [];
let startIdx = 0;
for (const size of ROW_SIZES) {
  ROWS.push(YEARS.slice(startIdx, startIdx + size));
  startIdx += size;
}

/* ─── Hanging Vine & Rose Garland Elements ─────────────────────── */
const GARLAND_ITEMS = [
  { emoji: "🌹", rotate: -8, x: -4 },
  { emoji: "🌿", rotate: 12, x: 6 },
  { emoji: "🌸", rotate: -15, x: -3 },
  { emoji: "🌿", rotate: -5, x: 4 },
  { emoji: "🎀", rotate: 8, x: -5 },
  { emoji: "🌿", rotate: 20, x: 8 },
  { emoji: "🌹", rotate: -12, x: -4 },
  { emoji: "🌿", rotate: -10, x: 5 },
  { emoji: "🌸", rotate: 5, x: -2 },
  { emoji: "🌿", rotate: 15, x: 7 },
  { emoji: "🎀", rotate: -8, x: -5 },
  { emoji: "🌿", rotate: -15, x: 3 },
  { emoji: "🌹", rotate: 10, x: -3 },
];

function VerticalGarland({ isLeft }) {
  const sideStyle = isLeft ? { left: "clamp(12px, 3vw, 70px)" } : { right: "clamp(12px, 3vw, 70px)" };

  return (
    <div
      style={{
        position: "absolute",
        top: "80px",
        bottom: "120px",
        width: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 2,
        pointerEvents: "none",
        ...sideStyle,
      }}
    >
      {/* Thin brown vine branch line */}
      <div style={{
        position: "absolute",
        top: 0, bottom: 0,
        left: "50%",
        width: "2px",
        background: "linear-gradient(to bottom, rgba(139, 111, 94, 0.1) 0%, rgba(139, 111, 94, 0.35) 50%, rgba(139, 111, 94, 0.1) 100%)",
        transform: "translateX(-50%)",
        borderRadius: 2,
      }} />

      {/* Spaced items */}
      {GARLAND_ITEMS.map((item, index) => {
        const itemDelay = index * 0.3;
        return (
          <motion.div
            key={index}
            style={{
              position: "relative",
              fontSize: item.emoji === "🎀" ? "1.4rem" : "1.7rem",
              transform: `rotate(${item.rotate}deg)`,
              marginLeft: `${item.x}px`,
              filter: "drop-shadow(0 3px 6px rgba(139,111,94,0.18))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            animate={{
              rotate: [item.rotate - 3, item.rotate + 3, item.rotate - 3],
              y: [0, -4, 0],
            }}
            transition={{
              duration: 4.5 + (index % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: itemDelay,
            }}
          >
            {item.emoji}
          </motion.div>
        );
      })}
    </div>
  );
}



/* ═══════════════════════════════════════════════════════════════
   CARD COMPONENTS
═══════════════════════════════════════════════════════════════ */

/* ── Polaroid Photo Card ─────────────────────────────────────── */
function PolaroidCard({ year, imgIndex, rotate, delay }) {
  const tapes = [
    "linear-gradient(135deg,rgba(244,184,193,0.9),rgba(212,168,133,0.8))",
    "linear-gradient(135deg,rgba(200,169,110,0.85),rgba(244,184,193,0.75))",
    "linear-gradient(135deg,rgba(179,157,219,0.85),rgba(244,184,193,0.75))",
    "linear-gradient(135deg,rgba(165,214,167,0.85),rgba(244,184,193,0.75))",
  ];
  const tape = tapes[imgIndex % tapes.length];
  const blobs = useBlobs();
  const src = getBlobUrl(blobs, `memory_${year.age}.jpg`, IMGS[imgIndex % IMGS.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 45, rotate: rotate - 6 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: false, margin: "-30px", amount: 0.1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08, rotate: 0, zIndex: 50 }}
      animate={{ y: [0, -5, 0] }}
      style={{
        rotate: `${rotate}deg`,
        position: "relative",
        zIndex: 10,
        flexShrink: 0,
      }}
    >
      {/* Washi tape */}
      <div style={{
        position: "absolute", top: -11, left: "50%",
        transform: "translateX(-50%) rotate(-2deg)",
        width: 52, height: 20, borderRadius: 2,
        background: tape, zIndex: 20,
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
      }} />

      {/* Polaroid body */}
      <div style={{
        background: "#fff",
        padding: "9px 9px 34px",
        boxShadow: "0 6px 24px rgba(139,111,94,0.18), 0 2px 6px rgba(0,0,0,0.1)",
        width: 170,
      }}>
        {/* Age circle badge */}
        <div style={{
          position: "absolute", top: 14, right: 12, zIndex: 25,
          width: 28, height: 28, borderRadius: "50%",
          background: `linear-gradient(135deg,${year.accent},${year.color})`,
          border: `2px solid ${year.accent}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.6rem", fontWeight: 800, color: "#6B4F3A",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          fontFamily: "'Playfair Display',serif",
        }}>
          {year.age}
        </div>

        {/* Photo area */}
        <div style={{ width: "100%", height: 140, background: year.color, position: "relative", overflow: "hidden" }}>
          <SafeImage
            src={src}
            alt={`Age ${year.age}`}
            fallbackEmoji={year.emoji}
            placeholderText={year.label}
          />
        </div>

        {/* Caption */}
        <div style={{ textAlign: "center", marginTop: 5 }}>
          {year.emojiImg ? (
            <img src={year.emojiImg.src} alt={year.emoji} style={{ width: 24, height: 24, objectFit: "contain" }} />
          ) : (
            <span style={{ fontSize: "1.1rem" }}>{year.emoji}</span>
          )}
          <p style={{ fontFamily: "'Dancing Script',cursive", fontSize: "0.78rem", color: "#8B6F5E", marginTop: 1, lineHeight: 1.2 }}>
            Age {year.age} · {year.label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Handwritten Note Card ────────────────────────────────────── */
const NOTE_QUOTES = [
  "Be kind to your mind 💗",
  "Collect moments, not things 🌸",
  "Good things take time ✨",
  "You are enough, always 💛",
  "Shine from within 🌟",
];

function NoteCard({ year, rotate, delay }) {
  const quote = NOTE_QUOTES[year.age % NOTE_QUOTES.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: rotate - 4 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: false, margin: "-30px", amount: 0.1 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.07, rotate: 0, zIndex: 50 }}
      style={{ rotate: `${rotate}deg`, position: "relative", zIndex: 10, flexShrink: 0 }}
    >
      {/* Paper clip */}
      <div style={{
        position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)",
        width: 16, height: 28, borderRadius: 10,
        border: "2.5px solid #C8A96E",
        zIndex: 20,
      }} />

      <div style={{
        background: "linear-gradient(160deg, #FFFDF4, #FFF9E6)",
        padding: "24px 18px 18px",
        width: 170, minHeight: 186,
        boxShadow: "0 6px 20px rgba(139,111,94,0.15)",
        border: "1px solid rgba(200,169,110,0.2)",
        position: "relative",
        backgroundImage: "repeating-linear-gradient(transparent,transparent 22px,rgba(200,169,110,0.12) 22px,rgba(200,169,110,0.12) 23px)",
      }}>
        {/* Age tag */}
        <div style={{
          position: "absolute", top: 7, right: 7,
          background: year.accent, color: "#fff", borderRadius: 10,
          padding: "2px 7px", fontSize: "0.58rem", fontWeight: 700,
          fontFamily: "'Playfair Display',serif",
          display: "flex", alignItems: "center", gap: "4px",
        }}>
          Age {year.age}
          {year.emojiImg ? (
            <img src={year.emojiImg.src} alt={year.emoji} style={{ width: 16, height: 16, objectFit: "contain" }} />
          ) : (
            <span>{year.emoji}</span>
          )}
        </div>

        <p style={{
          fontFamily: "'Dancing Script',cursive",
          fontSize: "1.05rem", color: "#8B6F5E",
          lineHeight: 1.55, marginTop: 12,
        }}>
          "{quote}"
        </p>
        <p style={{
          fontFamily: "'Dancing Script',cursive",
          fontSize: "0.72rem", color: "#C4A882",
          marginTop: 10, textAlign: "right",
        }}>
          — with love 🌸
        </p>
      </div>
    </motion.div>
  );
}

/* ── Spotify Memory Card ─────────────────────────────────────── */
function SpotifyCard({ year, imgIndex, rotate, delay }) {
  const blobs = useBlobs();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: rotate - 4 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: false, margin: "-30px", amount: 0.1 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.07, rotate: 0, zIndex: 50 }}
      style={{ rotate: `${rotate}deg`, position: "relative", zIndex: 10, flexShrink: 0 }}
    >
      <div style={{
        background: "linear-gradient(145deg,#1a1a2e,#16213e,#0f3460)",
        padding: "14px", width: 170, borderRadius: 14,
        boxShadow: "0 10px 32px rgba(0,0,0,0.35)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 70, height: 70, borderRadius: "50%", background: "rgba(30,215,96,0.1)", pointerEvents: "none" }} />

        <div style={{ width: "100%", height: 110, borderRadius: 8, background: year.color, position: "relative", overflow: "hidden" }}>
          <SafeImage src={getBlobUrl(blobs, `memory_${year.age}.jpg`, IMGS[imgIndex % IMGS.length])} alt={`Age ${year.age}`} fallbackEmoji={year.emoji} />
        </div>

        <div style={{ marginTop: 10 }}>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "#fff", lineHeight: 1.2, display: "flex", alignItems: "center", gap: "6px" }}>
            Age {year.age}
            {year.emojiImg ? (
              <img src={year.emojiImg.src} alt={year.emoji} style={{ width: 18, height: 18, objectFit: "contain" }} />
            ) : (
              <span>{year.emoji}</span>
            )}
          </p>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.65rem", color: "#aaa", marginTop: 2 }}>
            {year.label}
          </p>
        </div>

        <div style={{ marginTop: 8, background: "rgba(255,255,255,0.15)", height: 3, borderRadius: 3 }}>
          <div style={{ width: `${(year.age / 21) * 100}%`, height: "100%", background: "#1ED760", borderRadius: 3 }} />
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 8, color: "#fff", fontSize: "0.85rem" }}>
          <span style={{ opacity: 0.7 }}>⏮</span>
          <span style={{ color: "#1ED760", fontSize: "1rem" }}>▶</span>
          <span style={{ opacity: 0.7 }}>⏭</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Birthday Ticket Card ────────────────────────────────────── */
function TicketCard({ year, rotate, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: rotate - 4 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: false, margin: "-30px", amount: 0.1 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.07, rotate: 0, zIndex: 50 }}
      style={{ rotate: `${rotate}deg`, position: "relative", zIndex: 10, flexShrink: 0 }}
    >
      <div style={{
        background: `linear-gradient(135deg,${year.color},#fff8f0)`,
        width: 170, borderRadius: 8,
        boxShadow: "0 6px 20px rgba(139,111,94,0.18)",
        border: `2px dashed ${year.accent}`,
        overflow: "hidden",
      }}>
        <div style={{ background: year.accent, padding: "10px 12px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.58rem", letterSpacing: "0.2em", color: "#fff", textTransform: "uppercase" }}>
            🎟 Admit One
          </p>
          <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: "1.5rem", color: "#fff", lineHeight: 1 }}>
            Birthday
          </p>
        </div>
        <div style={{ height: 2, borderTop: "2px dashed rgba(255,255,255,0.5)" }} />
        <div style={{ padding: "14px 12px 12px", textAlign: "center" }}>
          <div style={{ fontSize: "2.2rem", lineHeight: 1 }}>
            {year.emojiImg ? (
              <img src={year.emojiImg.src} alt={year.emoji} style={{ width: 40, height: 40, objectFit: "contain" }} />
            ) : (
              <span>{year.emoji}</span>
            )}
          </div>
          <p style={{ fontFamily: "'Dancing Script',cursive", fontSize: "1.05rem", color: "#8B6F5E", marginTop: 5, fontWeight: 600 }}>
            Age {year.age}
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "0.68rem", color: "#C4A882", marginTop: 2, letterSpacing: "0.05em" }}>
            {year.label}
          </p>
          <div style={{ marginTop: 8, fontSize: "0.58rem", fontFamily: "'Outfit',sans-serif", color: "#C4A882", letterSpacing: "0.2em" }}>
            ★ ★ ★ ★ ★
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Grand Finale Card (Age 21) ─────────────────────────────── */
function FinaleCard({ delay }) {
  const blobs = useBlobs();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 70 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, margin: "-30px", amount: 0.1 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative", zIndex: 20, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Balloons */}
      {[0, 1, 2, 3].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -20, 0], rotate: [0, i % 2 === 0 ? 10 : -10, 0] }}
          transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
          style={{ position: "absolute", top: -65 + i * -8, left: `${16 + i * 18}%`, width: 40, height: 90, zIndex: 30 }}
        >
          <img
            src={baloonPng.src}
            alt="Balloon"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </motion.div>
      ))}

      {/* Gold sparkles */}
      {[
        { top: -10, left: -30, delay: 0 }, { top: 30, right: -30, delay: 0.5 },
        { top: 80, left: -25, delay: 1.0 }, { top: 60, right: -25, delay: 1.5 },
      ].map((s, i) => (
        <motion.span key={i}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity, delay: s.delay, repeatDelay: 1 }}
          style={{ position: "absolute", top: s.top, left: s.left, right: s.right, fontSize: "1.1rem", color: "#C8A96E", zIndex: 30 }}
        >
          ✨
        </motion.span>
      ))}

      {/* Card body */}
      <div style={{
        background: "linear-gradient(145deg,#FFFDE7,#FFF9E6,#FFF0CC)",
        padding: "24px 26px 26px",
        width: 270,
        boxShadow: "0 24px 64px rgba(200,169,110,0.45), 0 6px 20px rgba(139,111,94,0.2)",
        border: "3px solid #C8A96E",
        borderRadius: 4,
        position: "relative",
      }}>
        {/* Washi tapes */}
        <div style={{ position: "absolute", top: -12, left: "28%", transform: "rotate(-4deg)", width: 65, height: 20, borderRadius: 2, background: "linear-gradient(135deg,rgba(200,169,110,0.9),rgba(244,184,193,0.8))" }} />
        <div style={{ position: "absolute", top: -12, right: "22%", transform: "rotate(5deg)", width: 52, height: 20, borderRadius: 2, background: "linear-gradient(135deg,rgba(244,184,193,0.9),rgba(200,169,110,0.8))" }} />

        {/* Photo */}
        <div style={{ width: "100%", height: 200, background: "#FFF0CC", position: "relative", overflow: "hidden", marginBottom: 14 }}>
          <SafeImage src={getBlobUrl(blobs, "memory_28.jpg", IMGS[1])} alt="Age 28" fallbackEmoji="👑" placeholderText="The Crown Year" />
        </div>

        {/* "21 Today" badge */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            background: "linear-gradient(135deg,#C8A96E,#FFD97D,#C8A96E)",
            borderRadius: 30, padding: "9px 24px",
            textAlign: "center", marginBottom: 12,
            boxShadow: "0 4px 18px rgba(200,169,110,0.5)",
          }}
        >
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.25rem", fontWeight: 700, color: "#fff", letterSpacing: "0.06em", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            28 Today
            <img src={cakePng.src} alt="Cake" style={{ width: 24, height: 24, objectFit: "contain" }} />
          </p>
        </motion.div>

        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 10, alignItems: "center" }}>
          <img src={cakePng.src} alt="Cake" style={{ width: 32, height: 32, objectFit: "contain" }} />
          <img src={teddyPng.src} alt="Teddy" style={{ width: 32, height: 32, objectFit: "contain" }} />
          <span style={{ fontSize: "1.9rem" }}>🎉</span>
        </div>

        <p style={{ fontFamily: "'Dancing Script',cursive", fontSize: "1rem", color: "#8B6F5E", textAlign: "center", lineHeight: 1.55 }}>
          A beautiful journey<br />through 28 years 💗
        </p>

        {/* Confetti */}
        {["#F4B8C1", "#FFD97D", "#B39DDB", "#A5D6A7", "#90CAF9"].map((c, i) => (
          <motion.div key={i}
            animate={{ y: [0, -18, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
            style={{ position: "absolute", width: 7, height: 7, borderRadius: "50%", background: c, top: `${20 + i * 12}%`, left: i % 2 === 0 ? `${4 + i * 3}%` : "auto", right: i % 2 !== 0 ? `${4 + i * 3}%` : "auto" }}
          />
        ))}
      </div>

      <div style={{ marginTop: 14, textAlign: "center" }}>
        <span style={{ fontSize: "1.9rem" }}>👑</span>
        <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: "1.5rem", color: "#C8A96E" }}>Queen of 28</p>
      </div>
    </motion.div>
  );
}

/* ─── Card switcher ───────────────────────────────────────────── */
function TimelineCard({ year, imgIndex, delay }) {
  const rotate = (imgIndex % 2 === 0 ? 1 : -1) * (1 + (imgIndex % 4));
  if (year.finale) return <FinaleCard delay={delay} />;
  switch (year.type) {
    case "note": return <NoteCard year={year} rotate={rotate} delay={delay} />;
    case "spotify": return <SpotifyCard year={year} imgIndex={imgIndex} rotate={rotate} delay={delay} />;
    case "ticket": return <TicketCard year={year} rotate={rotate} delay={delay} />;
    default: return <PolaroidCard year={year} imgIndex={imgIndex} rotate={rotate} delay={delay} />;
  }
}

/* ─── Background ambient decorations ─────────────────────────── */
const BG = [
  { e: "🌸", top: "3%", left: "2%", s: 24, d: 0 },
  { e: "⭐", top: "8%", right: "3%", s: 18, d: 0.5 },
  { e: "🦋", top: "20%", left: "1%", s: 26, d: 0.3 },
  { e: "💫", top: "30%", right: "2%", s: 20, d: 0.7 },
  { e: "🌷", top: "44%", left: "2%", s: 24, d: 0.2 },
  { e: "🎀", top: "55%", right: "2%", s: 22, d: 0.6 },
  { e: "✨", top: "66%", left: "2%", s: 18, d: 0.4 },
  { e: "💗", top: "75%", right: "2%", s: 24, d: 0.1 },
  { e: "🌸", top: "85%", left: "3%", s: 22, d: 0.8 },
  { e: "⭐", top: "93%", right: "3%", s: 18, d: 0.3 },
];

/* ─── Floating rose petals config ────────────────────────────── */
const ROSE_PETALS = [
  { left: "7%", delay: 0, duration: 12, size: 22, rotate: 30, emoji: "🌸" },
  { left: "18%", delay: 2.5, duration: 9, size: 16, rotate: -20, emoji: "🌺" },
  { left: "31%", delay: 1.2, duration: 14, size: 20, rotate: 45, emoji: "🌸" },
  { left: "44%", delay: 4.0, duration: 11, size: 18, rotate: -10, emoji: "🌹" },
  { left: "57%", delay: 0.8, duration: 13, size: 24, rotate: 25, emoji: "🌸" },
  { left: "68%", delay: 3.3, duration: 10, size: 14, rotate: -35, emoji: "🌺" },
  { left: "79%", delay: 1.8, duration: 15, size: 20, rotate: 15, emoji: "🌸" },
  { left: "89%", delay: 5.0, duration: 11, size: 17, rotate: -25, emoji: "🌹" },
  { left: "23%", delay: 6.5, duration: 12, size: 15, rotate: 50, emoji: "🌸" },
  { left: "52%", delay: 3.8, duration: 10, size: 19, rotate: -15, emoji: "🌺" },
  { left: "75%", delay: 7.2, duration: 13, size: 21, rotate: 35, emoji: "🌸" },
  { left: "12%", delay: 8.1, duration: 9, size: 16, rotate: -40, emoji: "🌹" },
];

/* ─── Falling gold stars/confetti config ─────────────────────── */
const GOLD_CONFETTI = [
  { left: "5%", delay: 0, duration: 8, size: 14, symbol: "✦" },
  { left: "15%", delay: 1.5, duration: 11, size: 10, symbol: "★" },
  { left: "25%", delay: 3.0, duration: 9, size: 16, symbol: "✦" },
  { left: "38%", delay: 0.5, duration: 13, size: 12, symbol: "✶" },
  { left: "50%", delay: 2.2, duration: 10, size: 14, symbol: "★" },
  { left: "62%", delay: 4.1, duration: 8, size: 11, symbol: "✦" },
  { left: "73%", delay: 1.0, duration: 12, size: 15, symbol: "✶" },
  { left: "83%", delay: 3.5, duration: 9, size: 13, symbol: "★" },
  { left: "92%", delay: 5.5, duration: 11, size: 10, symbol: "✦" },
  { left: "43%", delay: 6.0, duration: 14, size: 12, symbol: "✶" },
  { left: "20%", delay: 7.5, duration: 10, size: 14, symbol: "★" },
  { left: "67%", delay: 8.8, duration: 9, size: 11, symbol: "✦" },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════ */
export default function MemoriesGallery() {
  const [showFireworks, setShowFireworks] = useState(false);
  const launchFireworks = () => {
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 1500);
  };
  let globalIdx = 0;

  return ( <>
    <section
      id="memories"
      style={{
        background: "linear-gradient(180deg,#F5ECD7 0%,#F9EDE3 45%,#EAD9C0 100%)",
        padding: "10px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient background stickers */}
      {BG.map((d, i) => (
        <motion.div key={i}
          style={{ position: "absolute", top: d.top, left: d.left, right: d.right, fontSize: d.s, opacity: 0.4, zIndex: 0, pointerEvents: "none" }}
          animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4 + i * 0.5, delay: d.d, repeat: Infinity, ease: "easeInOut" }}
        >
          {d.e}
        </motion.div>
      ))}

      {/* ── Floating rose petals drifting down ──────────────────── */}
      {ROSE_PETALS.map((p, i) => (
        <motion.div
          key={`petal-${i}`}
          style={{
            position: "absolute",
            left: p.left,
            fontSize: p.size,
            zIndex: 1,
            pointerEvents: "none",
            opacity: 0,
          }}
          animate={{
            top: ["-5%", "100%"],
            x: [0, Math.sin(i) * 60, Math.cos(i) * -40, 0],
            rotate: [p.rotate, p.rotate + 180, p.rotate + 360],
            opacity: [0, 0.75, 0.75, 0],
          }}
          transition={{
            duration: p.duration * 3, // Increased duration since it travels further
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.05, 0.95, 1],
          }}
        >
          {p.emoji}
        </motion.div>
      ))}

      {/* ── Falling gold star confetti ──────────────────────────── */}
      {GOLD_CONFETTI.map((s, i) => (
        <motion.div
          key={`star-${i}`}
          style={{
            position: "absolute",
            left: s.left,
            fontSize: s.size,
            color: i % 3 === 0 ? "#C8A96E" : i % 3 === 1 ? "#FFD700" : "#DAA520",
            zIndex: 1,
            pointerEvents: "none",
            fontFamily: "serif",
          }}
          animate={{
            top: ["-5%", "100%"],
            x: [0, Math.cos(i * 1.2) * 50, Math.sin(i * 1.2) * -30, 0],
            rotate: [0, 360],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: s.duration * 3, // Increased duration since it travels further
            delay: s.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.05, 0.95, 1],
          }}
        >
          {s.symbol}
        </motion.div>
      ))}

      {/* Vertical Hanging vine & rose garlands on left & right margins */}
      <VerticalGarland isLeft={true} />
      <VerticalGarland isLeft={false} />

      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ─── Section Title ─────────────────────────────────── */}
        <motion.div
          className="text-center mb-16 mt-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div style={{
            display: "inline-block",
            background: "rgba(253,246,236,0.96)",
            padding: "18px 50px",
            borderRadius: "3px",
            boxShadow: "0 8px 32px rgba(139,111,94,0.14)",
            position: "relative",
          }}>
            <div style={{ position: "absolute", left: -12, top: "50%", transform: "translateY(-50%) rotate(-4deg)", width: 50, height: 22, borderRadius: 2, background: "linear-gradient(135deg,rgba(244,184,193,0.9),rgba(212,168,133,0.8))" }} />
            <div style={{ position: "absolute", right: -12, top: "50%", transform: "translateY(-50%) rotate(5deg)", width: 50, height: 22, borderRadius: 2, background: "linear-gradient(135deg,rgba(200,169,110,0.85),rgba(244,184,193,0.9))" }} />
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.78rem", letterSpacing: "0.3em", color: "#C4A882", textTransform: "uppercase", marginBottom: 4 }}>
              ♡ a beautiful journey ♡
            </p>
            <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: "4.2rem", color: "#C5848E", lineHeight: 1 }}>
              Through The Years
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "0.88rem", color: "#C4A882", marginTop: 4, letterSpacing: "0.08em", fontStyle: "italic" }}>
              Every chapter is special, every memory is precious 🌸
            </p>
          </div>
        </motion.div>

        {/* ═══ EARLY YEARS ══════════════════════════ */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{ textAlign: "center", marginBottom: "60px", marginTop: "30px", position: "relative" }}
        >
          {/* Floating Butterfly PNG */}
          <motion.div 
            animate={{ y: [0, -15, 0], x: [0, 10, 0], rotate: [-5, 5, -5] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
            style={{ position: "absolute", top: -40, left: "15%", width: 90, zIndex: 10, filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.15))" }}
          >
            <img src={butterflyPng.src} alt="Butterfly" style={{ width: "100%", height: "auto" }} />
          </motion.div>

          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", maxWidth: "600px", height: "3px", background: "linear-gradient(90deg, transparent, rgba(244,184,193,0.6), transparent)" }} />
          
          <div style={{ 
            display: "inline-block", 
            background: "linear-gradient(135deg, #FDF6EC, #F9EDE3)", 
            padding: "15px 50px", 
            borderRadius: 40, 
            color: "#C5848E", 
            fontWeight: "bold", 
            fontFamily: "'Cormorant Garamond',serif", 
            fontSize: "2rem",
            letterSpacing: "0.15em", 
            boxShadow: "0 12px 35px rgba(139,111,94,0.15), inset 0 2px 6px rgba(255,255,255,0.9)",
            border: "2px solid rgba(244,184,193,0.4)",
            position: "relative",
            zIndex: 2
          }}>
            <motion.span animate={{ rotate: [-8, 8, -8], scale: [1, 1.15, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ display: "inline-block", marginRight: 15 }}>🌸</motion.span>
            The Early Years
            <motion.span animate={{ rotate: [8, -8, 8], scale: [1, 1.15, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ display: "inline-block", marginLeft: 15 }}>🌸</motion.span>
          </div>
        </motion.div>

        <div 
          className="max-[450px]:flex-col max-[450px]:items-center"
          style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "clamp(20px, 4vw, 40px)",
          padding: "10px 0 30px 0",
          width: "100%",
        }}>
          {YEARS.filter(y => y.age >= 1 && y.age <= 6).map((year, i) => (
            <div key={year.age} className="max-[450px]:scale-[1.15] max-[450px]:my-3 origin-center">
              <TimelineCard
                year={year}
                imgIndex={year.age - 1}
                delay={(i % 4) * 0.1}
              />
            </div>
          ))}
        </div>

        {/* ═══ BEAUTIFUL DIVIDER ══════════════════════════ */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "60px 0", width: "100%", position: "relative" }}
        >
          {/* Animated line left */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ flex: 1, height: 2, background: "linear-gradient(90deg, transparent, rgba(244,184,193,0.8))", maxWidth: "25%", transformOrigin: "right" }}
          />
          
          <div style={{ padding: "15px 40px", textAlign: "center", position: "relative", zIndex: 5 }}>
             {/* Floating heart top */}
             <motion.div 
               animate={{ y: [0, -6, 0], scale: [1, 1.1, 1] }}
               transition={{ duration: 3, repeat: Infinity }}
               style={{ position: "absolute", top: -20, left: "50%", marginLeft: "-10px", color: "#F4B8C1", fontSize: "1.5rem" }}
             >
               ♡
             </motion.div>
             
             <p className="font-cormorant" style={{ 
                fontSize: "2.4rem", 
                color: "#8B6F5E", 
                fontStyle: "italic", 
                margin: 0, 
                background: "linear-gradient(135deg, rgba(253,246,236,0.9), rgba(255,255,255,0.6))", 
                padding: "20px 45px", 
                borderRadius: "40px 10px 40px 10px", 
                boxShadow: "0 15px 40px rgba(139,111,94,0.15), inset 0 2px 8px rgba(255,255,255,0.9)",
                border: "2px solid rgba(244,184,193,0.5)",
                backdropFilter: "blur(8px)",
                letterSpacing: "0.05em",
                lineHeight: 1.4
             }}>
                The years may fly,<br/>but memories stay forever
             </p>

             {/* Floating heart bottom */}
             <motion.div 
               animate={{ y: [0, 6, 0], scale: [1, 1.1, 1] }}
               transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
               style={{ position: "absolute", bottom: -20, left: "50%", marginLeft: "-10px", color: "#F4B8C1", fontSize: "1.5rem" }}
             >
               ♥
             </motion.div>
          </div>
          
          {/* Animated line right */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ flex: 1, height: 2, background: "linear-gradient(270deg, transparent, rgba(244,184,193,0.8))", maxWidth: "25%", transformOrigin: "left" }}
          />
        </motion.div>

        {/* ═══ THE BEAUTIFUL NOW ══════════════════════════ */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{ textAlign: "center", marginBottom: "60px", marginTop: "40px", position: "relative" }}
        >
          {/* Floating Balloons PNG */}
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [2, -2, 2] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
            style={{ position: "absolute", top: -60, right: "12%", width: 110, zIndex: 10, filter: "drop-shadow(0 15px 20px rgba(0,0,0,0.2))" }}
          >
            <img src={baloonPng.src} alt="Balloons" style={{ width: "100%", height: "auto" }} />
          </motion.div>

          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", maxWidth: "600px", height: "3px", background: "linear-gradient(90deg, transparent, rgba(244,184,193,0.6), transparent)" }} />
          
          <div style={{ 
            display: "inline-block", 
            background: "linear-gradient(135deg, #FDF6EC, #F9EDE3)", 
            padding: "15px 50px", 
            borderRadius: 40, 
            color: "#C5848E", 
            fontWeight: "bold", 
            fontFamily: "'Cormorant Garamond',serif", 
            fontSize: "2rem",
            letterSpacing: "0.15em", 
            boxShadow: "0 12px 35px rgba(139,111,94,0.15), inset 0 2px 6px rgba(255,255,255,0.9)",
            border: "2px solid rgba(244,184,193,0.4)",
            position: "relative",
            zIndex: 2
          }}>
            <motion.span animate={{ rotate: [-10, 10, -10], scale: [1, 1.25, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} style={{ display: "inline-block", marginRight: 15 }}>✨</motion.span>
            The Beautiful Now
            <motion.span animate={{ rotate: [10, -10, 10], scale: [1, 1.25, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} style={{ display: "inline-block", marginLeft: 15 }}>✨</motion.span>
          </div>
        </motion.div>

        <div 
          className="max-[450px]:flex-col max-[450px]:items-center"
          style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "clamp(20px, 4vw, 40px)",
          padding: "10px 0",
          width: "100%",
        }}>
          {YEARS.filter(y => y.age >= 25 && y.age <= 28).map((year, i) => (
            <div key={year.age} className="max-[450px]:scale-[1.15] max-[450px]:my-3 origin-center">
              <TimelineCard
                year={year}
                imgIndex={year.age - 1}
                delay={(i % 4) * 0.1}
              />
            </div>
          ))}
        </div>

        {/* Bottom tag */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: "center", marginTop: 70,
            fontFamily: "'Dancing Script',cursive",
            fontSize: "1.9rem", color: "#D4848E", letterSpacing: "0.03em",
          }}
        >
          ...and many more beautiful years to come 💗
        </motion.p>
      </div>
    </section>
  </>
);
}
