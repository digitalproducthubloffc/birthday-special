"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioPlayer({ src = "/music/birthdaypiano.mp3" }) {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    let interacted = false;
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.55;

    // Attempt to autoplay immediately
    audioRef.current.play().then(() => {
      setPlaying(true);
      interacted = true;
    }).catch(() => {
      // If browser blocks autoplay, wait for the first click/tap anywhere on the screen
      const handleFirstInteraction = () => {
        if (!interacted && audioRef.current) {
          interacted = true;
          audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
          document.removeEventListener("pointerdown", handleFirstInteraction);
          document.removeEventListener("keydown", handleFirstInteraction);
        }
      };
      document.addEventListener("pointerdown", handleFirstInteraction);
      document.addEventListener("keydown", handleFirstInteraction);
    });

    return () => {
      interacted = true;
      audioRef.current?.pause();
    };
  }, [src]);

  const toggle = () => {
    if (playing) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="music-player"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
        >
          {/* Vinyl disc */}
          <motion.div
            className="relative flex-shrink-0"
            style={{ width: 38, height: 38 }}
            animate={{ rotate: playing ? 360 : 0 }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity, repeatType: "loop" }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "conic-gradient(from 0deg, #F4B8C1, #C8A96E, #F4B8C1, #D4848E, #F4B8C1)",
                boxShadow: "0 0 0 4px rgba(244,184,193,0.35)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "30%",
                borderRadius: "50%",
                background: "#FDF6EC",
                border: "1px solid rgba(244,184,193,0.5)",
              }}
            />
          </motion.div>

          {/* Info */}
          <div className="flex flex-col min-w-0">
            <span
              className="font-dancing text-xs leading-tight"
              style={{ color: "var(--rose)", fontSize: "0.7rem" }}
            >
              A Little Song for You 🎵
            </span>
            <span
              className="font-cormorant text-xs italic truncate"
              style={{ color: "var(--brown-light)", fontSize: "0.68rem" }}
            >
              You are my sunshine
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={toggle}
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.1 }}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--blush), var(--rose))",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "0.75rem",
                boxShadow: "0 2px 8px rgba(212,132,142,0.45)",
              }}
              aria-label={playing ? "Pause music" : "Play music"}
            >
              {playing ? "⏸" : "▶"}
            </motion.button>
            <motion.button
              onClick={() => setVisible(false)}
              whileTap={{ scale: 0.85 }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--brown-light)",
                fontSize: "0.75rem",
                lineHeight: 1,
              }}
              aria-label="Close music player"
            >
              ✕
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
