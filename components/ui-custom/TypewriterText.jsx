"use client";
import { useState, useEffect } from "react";

export default function TypewriterText({ text, onComplete }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        if (onComplete) {
          setTimeout(onComplete, 1500); // Wait 1.5s after typing finishes before triggering next step
        }
      }
    }, 45); // Adjust typing speed here (lower is faster)

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <div style={{ position: "relative" }}>
      <p style={{
        whiteSpace: "pre-wrap",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(1.1rem, 4.5vw, 1.4rem)",
        lineHeight: 1.8,
        color: "#4A3B32",
        margin: 0
      }}>
        {displayed}
        <span className="animate-blink" style={{ borderRight: "2px solid #4A3B32", paddingRight: 2 }}></span>
      </p>
    </div>
  );
}
