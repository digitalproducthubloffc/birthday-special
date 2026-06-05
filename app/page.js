"use client";
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import AudioPlayer from "@/components/ui-custom/AudioPlayer";

// Lazy-load all below-fold sections — they won't block initial paint
const MemoriesGallery  = dynamic(() => import("@/components/sections/MemoriesGallery"),  { ssr: false });
// Empty spot reserved for future section
const FilmStripSection = dynamic(() => import("@/components/sections/FilmStripSection"), { ssr: false });
const LetterSection    = dynamic(() => import("@/components/sections/LetterSection"),    { ssr: false });
const FinalSurprise    = dynamic(() => import("@/components/sections/FinalSurprise"),    { ssr: false });


export default function Home() {
  return (
      <main className="page-bg">
        {/* Floating audio player */}
        <AudioPlayer />

      {/* ① Hero */}
      <HeroSection />

      {/* ② Memories Gallery */}
      <MemoriesGallery />

      {/* Torn paper section divider */}
      <SectionDivider from="#EAD9C0" to="#F5ECD7" height={18} />

      {/* ④ Film Strip clothesline */}
      <FilmStripSection />

      {/* Torn paper section divider */}
      <SectionDivider from="#F9EDE3" to="#FDF6EC" height={20} />

      {/* ⑤ Letter */}
      <LetterSection />

      {/* Torn paper section divider */}
      <SectionDivider from="#FDF6EC" to="#FAE0E4" />

      {/* ⑥ Final Surprise */}
      <FinalSurprise />

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        padding: "32px 24px",
        background: "rgba(245,236,215,0.6)",
        borderTop: "1px solid rgba(244,184,193,0.25)",
      }}>
        <p className="font-dancing" style={{ color: "var(--rose)", fontSize: "1rem" }}>
          Made with love, just for you 🌸
        </p>
        <p className="font-cormorant" style={{ color: "var(--brown-light)", fontSize: "0.8rem", marginTop: 4, letterSpacing: "0.12em" }}>
          © {new Date().getFullYear()} — A memory crafted with care
        </p>
      </footer>
      </main>
  );
}

function SectionDivider({ from, to, height = 40 }) {
  return (
    <div style={{ position: "relative", height, overflow: "hidden" }}>
      <svg
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <linearGradient id={`grad-${from}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <path
          d="M0,0 L0,20 Q60,40 120,20 Q180,0 240,20 Q300,40 360,20 Q420,0 480,20 Q540,40 600,20 Q660,0 720,20 Q780,40 840,20 Q900,0 960,20 Q1020,40 1080,20 Q1140,0 1200,20 Q1260,40 1320,20 Q1380,0 1440,20 L1440,40 L0,40 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}
