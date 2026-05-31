"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import multiBaloonPng from "@/pngs/multiplebaloon.png";

const LETTER_CONTENT = `My dearest friend,

Where do I even begin? Today is your day — a day that the whole universe conspired to make beautiful, just for you.

I remember all the little moments we've shared — the laughter that didn't need a reason, the late nights that turned into early mornings, the quiet moments that somehow meant the most.

You have this rare gift of making everyone around you feel seen, loved, and a little more alive. The world is genuinely a softer, more beautiful place because you are in it.

On this birthday, I want you to know that you are so deeply cherished. Every chapter of your story matters. Every dream you hold is worth chasing. Every version of you — past, present, and future — is worthy of love.

Here's to you, today and always.

With all my love,`;

const AUTHOR = "Your Biggest Admirer 🌸";

export default function LetterSection() {
  const [open, setOpen] = useState(false);

  const renderParagraph = (para, i) => {
    // Add a small "drop cap" for the first paragraph when expanded
    if (open && i === 0 && para && para.length > 1) {
      const first = para[0];
      const rest = para.slice(1);
      return (
        <p
          key={i}
          className="font-cormorant"
          style={{
            fontSize: "1.08rem",
            lineHeight: 2.1,
            color: "var(--brown)",
            fontStyle: "italic",
            marginBottom: 22,
            whiteSpace: "pre-line",
          }}
        >
          <span
            className="font-script"
            style={{
              float: "left",
              fontSize: "3.2rem",
              lineHeight: 0.9,
              paddingRight: 10,
              paddingTop: 6,
              color: "var(--rose)",
              textShadow: "0 6px 18px rgba(244,184,193,0.55)",
            }}
          >
            {first}
          </span>
          {rest}
        </p>
      );
    }

    return (
      <p
        key={i}
        className="font-cormorant"
        style={{
          fontSize: "1.08rem",
          lineHeight: 2.1,
          color: "var(--brown)",
          fontStyle: "italic",
          marginBottom: 22,
          whiteSpace: "pre-line",
        }}
      >
        {para}
      </p>
    );
  };

  return (
    <section
      id="letter"
      style={{
        background: "radial-gradient(circle at top, rgba(244,184,193,0.35), transparent 55%), linear-gradient(160deg, #F9EDE3 0%, #F5ECD7 50%, #FDF6EC 100%)",
        padding: "40px 24px 110px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Soft floating hearts in the background */}
      {[{ top: "6%", left: "10%" }, { top: "16%", right: "12%" }, { top: "32%", left: "6%" }, { top: "42%", right: "8%" }].map(
        (h, i) => (
          <motion.span
            key={i}
            style={{
              position: "absolute",
              top: h.top,
              left: h.left,
              right: h.right,
              fontSize: "1.6rem",
              opacity: 0.18,
              pointerEvents: "none",
              zIndex: 0,
            }}
            animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          >
            💗
          </motion.span>
        )
      )}

      {/* Vertical ribbon on the left edge */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "clamp(10px, 4vw, 40px)",
          width: 4,
          background: "linear-gradient(to bottom, rgba(200,169,110,0.2), rgba(244,184,193,0.6), rgba(200,169,110,0.25))",
          borderRadius: 999,
          opacity: 0.7,
          boxShadow: "0 0 18px rgba(244,184,193,0.5)",
        }}
      />

      <div style={{ maxWidth: 830, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 36 }}
        >
          <p
            className="font-cormorant"
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.28em",
              color: "var(--brown-light)",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            sealed with love
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 20px",
              borderRadius: 999,
              background: "rgba(253,246,236,0.85)",
              boxShadow: "0 6px 18px rgba(139,111,94,0.18)",
            }}
          >
            <span style={{ fontSize: "1.4rem" }}>💌</span>
            <h2 className="font-script" style={{ fontSize: "2.6rem", color: "var(--dusty-rose)", lineHeight: 1 }}>
              A Letter for You
            </h2>
          </div>
        </motion.div>

        {/* Envelope / Letter card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative" }}
        >
          {/* Tiny postage / stamp */}
          <motion.div
            initial={{ opacity: 0, rotate: -12, y: 10 }}
            whileInView={{ opacity: 1, rotate: -8, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              position: "absolute",
              top: 22,
              left: 18,
              zIndex: 3,
              width: 64,
              height: 64,
              borderRadius: 10,
              background: "linear-gradient(145deg, rgba(253,246,236,0.95), rgba(250,224,228,0.85))",
              border: "1px solid rgba(244,184,193,0.5)",
              boxShadow: "0 10px 26px rgba(139,111,94,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
            aria-hidden="true"
          >
            <div
              style={{
                position: "absolute",
                inset: 6,
                borderRadius: 8,
                border: "1px dashed rgba(200,169,110,0.55)",
              }}
            />
            <div style={{ fontSize: "1.6rem", opacity: 0.95 }}>🌸</div>
          </motion.div>

          {/* Tape top */}
          <div className="tape" style={{
            position: "absolute",
            top: -12,
            left: "50%",
            width: 70,
            height: 24,
            transform: "translateX(-50%) rotate(-2deg)",
            background: "linear-gradient(135deg, rgba(244,184,193,0.75), rgba(212,168,133,0.65))",
          }} />

          {/* Envelope flap (decorative) */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 18,
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(680px, 92%)",
              height: 74,
              zIndex: 1,
              pointerEvents: "none",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "linear-gradient(180deg, rgba(253,246,236,0.9), rgba(244,184,193,0.18))",
              borderTop: "1px solid rgba(200,169,110,0.22)",
            }}
          />

          {/* Letter paper */}
          <div style={{
            background: "linear-gradient(160deg, #FEFAF4 0%, #FDF6EC 40%, #F9F0E1 100%)",
            backgroundImage:
              "linear-gradient(160deg, #FEFAF4 0%, #FDF6EC 40%, #F9F0E1 100%), radial-gradient(circle at 18% 22%, rgba(244,184,193,0.14), transparent 40%), radial-gradient(circle at 85% 70%, rgba(200,169,110,0.12), transparent 42%)",
            borderRadius: "14px",
            boxShadow: "0 16px 60px rgba(139,111,94,0.16), 0 3px 14px rgba(0,0,0,0.07)",
            border: "1px solid rgba(244,184,193,0.28)",
            position: "relative",
            overflow: "hidden",
          }} className="px-6 py-10 md:px-12 md:py-12">
            {/* Petite corner florals */}
            <span
              style={{
                position: "absolute",
                top: 20,
                left: 22,
                fontSize: "1.1rem",
                opacity: 0.7,
              }}
            >
              🌸
            </span>
            <span
              style={{
                position: "absolute",
                bottom: 18,
                right: 26,
                fontSize: "1.1rem",
                opacity: 0.7,
              }}
            >
              🌿
            </span>
            {/* Ruled lines background */}
            {[...Array(14)].map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                left: 48, right: 48,
                top: 96 + i * 32,
                height: 1,
                background: "rgba(196,168,130,0.18)",
              }} />
            ))}

            {/* Wax seal — top right corner */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                position: "absolute",
                top: 18,
                right: 22,
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #F4B8C1, #D4848E)",
                boxShadow: "0 2px 10px rgba(212,132,142,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}
            >
              💌
            </motion.div>

            {/* Subtle postmark circle */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 26,
                right: 78,
                width: 56,
                height: 56,
                borderRadius: "50%",
                border: "1px dashed rgba(200,169,110,0.45)",
                opacity: 0.55,
                transform: "rotate(-12deg)",
              }}
            />

            {/* Greeting */}
            <p className="font-dancing" style={{
              fontSize: "1.3rem",
              color: "var(--rose)",
              marginBottom: 28,
              position: "relative",
              zIndex: 1,
            }}>
              My dearest friend,
            </p>

            {/* Body — show preview or full */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <AnimatePresence mode="wait">
                {!open ? (
                  <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="font-cormorant" style={{
                      fontSize: "1.08rem",
                      lineHeight: 2,
                      color: "var(--brown)",
                      fontStyle: "italic",
                      marginBottom: 28,
                    }}>
                      Where do I even begin? Today is your day — a day that the whole universe conspired to make beautiful, just for you...
                    </p>
                    <div style={{
                      height: 60,
                      background: "linear-gradient(to bottom, transparent, #FDF6EC)",
                      marginTop: -60,
                      position: "relative",
                      zIndex: 2,
                    }} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="full"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {LETTER_CONTENT.split("\n\n").map(renderParagraph)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Signature */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{ marginTop: 24, textAlign: "right", position: "relative", zIndex: 1 }}
                >
                  <p className="font-script" style={{ fontSize: "2rem", color: "var(--rose)" }}>
                    {AUTHOR}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Read/Close button with Floating Balloons */}
            <div style={{ textAlign: "center", marginTop: 40, position: "relative", zIndex: 2 }}>
              <div style={{ display: "inline-block", position: "relative" }}>
                {/* Left Floating Balloon Bundle */}
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [-4, 4, -4] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: "absolute", bottom: "-10px", left: "-60px", zIndex: -1, pointerEvents: "none" }}
                >
                  <img src={multiBaloonPng.src} alt="Balloons" style={{ width: 85, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }} />
                  {/* String connecting to button */}
                  <svg style={{ position: "absolute", bottom: -10, right: 10, width: 30, height: 30, overflow: "visible" }}>
                    <path d="M 0 0 C 10 10, 20 -5, 30 20" stroke="rgba(139,111,94,0.4)" strokeWidth="1.5" fill="none" />
                  </svg>
                </motion.div>

                <motion.button
                  onClick={() => setOpen(!open)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: open
                      ? "transparent"
                      : "linear-gradient(135deg, var(--blush), var(--rose))",
                    color: open ? "var(--rose)" : "#fff",
                    border: open ? "1.5px solid var(--blush)" : "none",
                    padding: "12px 36px",
                    borderRadius: "40px",
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "1rem",
                    cursor: "pointer",
                    boxShadow: open ? "none" : "0 4px 20px rgba(244,184,193,0.5)",
                    letterSpacing: "0.03em",
                    transition: "all 0.3s ease",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  {open ? "✕ Close the letter" : "💌 Open the letter"}
                </motion.button>

                {/* Right Floating Balloon Bundle */}
                <motion.div
                  animate={{ y: [0, -12, 0], rotate: [4, -4, 4] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  style={{ position: "absolute", bottom: "-5px", right: "-65px", zIndex: -1, pointerEvents: "none" }}
                >
                  <img src={multiBaloonPng.src} alt="Balloons" style={{ width: 95, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }} />
                  {/* String connecting to button */}
                  <svg style={{ position: "absolute", bottom: -5, left: 5, width: 30, height: 30, overflow: "visible" }}>
                    <path d="M 30 0 C 20 15, 10 -5, 0 20" stroke="rgba(139,111,94,0.4)" strokeWidth="1.5" fill="none" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
