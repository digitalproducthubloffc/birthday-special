"use client";
import { motion } from "framer-motion";
import SafeImage from "../ui-custom/SafeImage";
import { useBlobs, getBlobUrl } from "../BlobContext";
import baloonPng from "@/pngs/baloon.png";

const stripPhotos = [
  { src: "/images/media_1.png",   caption: "joy 💛" },
  { src: "/images/media_2.png",   caption: "love 💗" },
  { src: "/images/media_6.png",   caption: "magic ✨" },
  { src: "/images/media_4.png",   caption: "bliss 🌸" },
  { src: "/images/media_5.png",   caption: "us 🤍" },
  { src: "/images/media_3.png",   caption: "smile 😊" },
  { src: "/images/memory1.png",   caption: "moments 💫" },
  { src: "/images/roses_polaroid.png", caption: "dreams 🌹" },
];

/* Soft bokeh particles config */
const BOKEH = Array.from({ length: 18 }, (_, i) => ({
  left: `${5 + (i * 5.3) % 90}%`,
  size: 8 + (i % 5) * 6,
  delay: i * 0.7,
  dur: 6 + (i % 4) * 2,
  color: ["rgba(244,184,193,0.18)", "rgba(200,169,110,0.15)", "rgba(179,157,219,0.14)", "rgba(165,214,167,0.12)", "rgba(255,213,79,0.14)"][i % 5],
}));

const TITLE_SPARKLES = [
  { top: "-10%", left: "8%",  emoji: "✨", delay: 0.0 },
  { top: "-18%", right: "10%", emoji: "✦", delay: 0.3 },
  { top: "6%",  left: "0%",  emoji: "🌸", delay: 0.6 },
  { top: "18%", right: "3%", emoji: "💗", delay: 0.2 },
];

/* Clothespin clip component */
function ClothesClip({ rotate }) {
  return (
    <div style={{
      position: "absolute",
      top: -18,
      left: "50%",
      transform: `translateX(-50%) rotate(${rotate}deg)`,
      zIndex: 5,
      width: 22,
      height: 32,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      {/* Top round head */}
      <div style={{
        width: 18,
        height: 18,
        borderRadius: "50%",
        background: "linear-gradient(145deg, #E8D5B7, #C4A882)",
        border: "1.5px solid #B8976A",
        boxShadow: "0 2px 6px rgba(139,111,94,0.3), inset 0 1px 2px rgba(255,255,255,0.3)",
      }} />
      {/* Body / grip */}
      <div style={{
        width: 6,
        height: 16,
        background: "linear-gradient(180deg, #D4BFA0, #C4A882)",
        borderRadius: "0 0 2px 2px",
        marginTop: -3,
        boxShadow: "0 2px 4px rgba(139,111,94,0.2)",
      }} />
    </div>
  );
}

function PolaroidCard({ photo, index }) {
  const cardRotate = index % 2 === 0 ? -3 : 3;
  const clipRotate = index % 3 === 0 ? -4 : index % 3 === 1 ? 6 : -2;

  return (
    <motion.div
      whileHover={{ scale: 1.07, y: -10, rotate: 0, zIndex: 50 }}
      style={{
        flexShrink: 0,
        position: "relative",
        animation: `pendulumsway ${3 + (index % 8) * 0.4}s ease-in-out infinite`,
        animationDelay: `${(index % 8) * 0.3}s`,
      }}
    >
      {/* Clip */}
      <ClothesClip rotate={clipRotate} />

      {/* Polaroid body */}
      <div
        className="polaroid"
        style={{
          width: 200,
          transform: `rotate(${cardRotate}deg)`,
          boxShadow: "0 8px 28px rgba(139,111,94,0.22), 0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{
          width: "100%",
          height: 180,
          background: "linear-gradient(135deg, #FAE0E4, #F5ECD7)",
          position: "relative",
          overflow: "hidden",
        }}>
          <SafeImage
            src={photo.src}
            alt={photo.caption}
            sizes="200px"
            fallbackEmoji="🖼️"
            placeholderText={photo.src.split("/").pop()}
          />
        </div>
        <p className="polaroid-caption">{photo.caption}</p>
      </div>
    </motion.div>
  );
}

export default function FilmStripSection() {
  const blobs = useBlobs();
  
  // Map our hardcoded strip photos to the dynamic blob URLs (film_1.jpg to film_8.jpg)
  const dynamicPhotos = stripPhotos.map((photo, i) => ({
    ...photo,
    src: getBlobUrl(blobs, `film_${i + 1}.jpg`, photo.src)
  }));

  return (
    <section
      id="filmstrip"
      style={{
        background: "linear-gradient(180deg, #FDF6EC 0%, #F9EDE3 50%, #F5E6D8 100%)",
        padding: "36px 0 12px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Soft bokeh particles floating */}
      {BOKEH.map((b, i) => (
        <motion.div
          key={`bokeh-${i}`}
          style={{
            position: "absolute",
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: b.color,
            pointerEvents: "none",
            zIndex: 0,
          }}
          animate={{
            top: ["-5%", "105%"],
            x: [0, Math.sin(i) * 30, Math.cos(i) * -20, 0],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: b.dur,
            delay: b.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.1, 0.9, 1],
          }}
        />
      ))}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: "center", marginBottom: 26, padding: "0 24px", position: "relative", zIndex: 1 }}
      >
        <div
          style={{
            display: "inline-block",
            position: "relative",
            padding: "18px 26px 20px",
            borderRadius: 16,
            background: "rgba(253,246,236,0.86)",
            boxShadow: "0 12px 40px rgba(139,111,94,0.16)",
            border: "1px solid rgba(244,184,193,0.28)",
            overflow: "hidden",
          }}
        >
          {/* washi tape strips */}
          <div
            style={{
              position: "absolute",
              top: -10,
              left: "18%",
              width: 86,
              height: 22,
              transform: "rotate(-4deg)",
              borderRadius: 999,
              background: "linear-gradient(135deg, rgba(244,184,193,0.85), rgba(212,168,133,0.75))",
              boxShadow: "0 6px 16px rgba(139,111,94,0.12)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -10,
              right: "18%",
              width: 86,
              height: 22,
              transform: "rotate(5deg)",
              borderRadius: 999,
              background: "linear-gradient(135deg, rgba(200,169,110,0.85), rgba(244,184,193,0.75))",
              boxShadow: "0 6px 16px rgba(139,111,94,0.12)",
            }}
          />

          {/* floating sparkles */}
          {TITLE_SPARKLES.map((s, i) => (
            <motion.span
              key={i}
              style={{
                position: "absolute",
                top: s.top,
                left: s.left,
                right: s.right,
                fontSize: i % 2 === 0 ? "1.1rem" : "1.0rem",
                opacity: 0.55,
                pointerEvents: "none",
              }}
              animate={{ opacity: [0.15, 0.95, 0.15], scale: [0.8, 1.2, 0.8], rotate: [0, 180, 360] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
            >
              {s.emoji}
            </motion.span>
          ))}

          {/* Title text */}
          <p
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "0.75rem",
              letterSpacing: "0.28em",
              color: "#C4A882",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            ♡ captured in time ♡
          </p>
          <h2 className="font-script" style={{ fontSize: "2.85rem", color: "var(--dusty-rose)", lineHeight: 1.06 }}>
            A Roll of Memories
          </h2>

          {/* subtle corner accents (keeps it clean) */}
          <span style={{ position: "absolute", top: 12, left: 14, opacity: 0.55, color: "var(--gold)", fontSize: "1.1rem" }}>✦</span>
          <span style={{ position: "absolute", top: 12, right: 14, opacity: 0.55, color: "var(--gold)", fontSize: "1.1rem" }}>✦</span>
          <span style={{ position: "absolute", bottom: 12, left: 14, opacity: 0.35, color: "var(--rose)", fontSize: "1.1rem" }}>✿</span>
          <span style={{ position: "absolute", bottom: 12, right: 14, opacity: 0.35, color: "var(--rose)", fontSize: "1.1rem" }}>✿</span>
        </div>
      </motion.div>

      {/* Scrolling strip */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Rope / string line */}
        <div style={{
          position: "absolute",
          top: 14,
          left: 0, right: 0,
          height: 3,
          background: "linear-gradient(90deg, transparent, rgba(139,111,94,0.3), rgba(139,111,94,0.5), rgba(139,111,94,0.3), transparent)",
          borderRadius: 2,
        }} />

        <div className="marquee-wrapper" style={{ display: "flex", overflow: "hidden", width: "100%" }}>
          {[1, 2].map((track) => (
            <div
              key={track}
              className="marquee-track"
              aria-hidden={track === 2 ? "true" : undefined}
              style={{ display: "flex", alignItems: "flex-end", paddingTop: 8, paddingBottom: 40 }}
            >
              {dynamicPhotos.map((photo, i) => (
                <PolaroidCard key={`t${track}-${i}`} photo={photo} index={i} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom balloons */}
      <div style={{ textAlign: "center", marginTop: 10, position: "relative", zIndex: 1 }}>
        {[{ dur: 3, delay: 0 }, { dur: 2.5, delay: 0.5 }, { dur: 3.5, delay: 0.2 }].map((b, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
            style={{ display: "inline-block", marginLeft: i > 0 ? 12 : 0, width: 32, height: 70 }}
          >
            <img
              src={baloonPng.src}
              alt="Balloon"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </motion.span>
        ))}
      </div>
    </section>
  );
}
