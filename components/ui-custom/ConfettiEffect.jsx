"use client";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfettiEffect() {
  useEffect(() => {
    const colors = ["#F4B8C1", "#FAE0E4", "#D4848E", "#C8A96E", "#F5ECD7", "#E899A8"];

    // First burst
    confetti({
      particleCount: 160,
      spread: 80,
      origin: { x: 0.5, y: 0.6 },
      colors,
      scalar: 1.1,
    });

    // Left cannon
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors,
      });
    }, 300);

    // Right cannon
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors,
      });
    }, 500);

    // Finale burst
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors,
        scalar: 0.9,
        gravity: 0.8,
      });
    }, 900);
  }, []);

  return null;
}
