"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import TypewriterText from "../ui-custom/TypewriterText";
import cake2Png from "@/pngs/cake2.png";
import candlesPng from "@/pngs/candles.png";
import balloonsPng from "@/pngs/multiplebaloon.png";
import clickHerePng from "@/pngs/clickhere.png";

const ConfettiEffect = dynamic(() => import("../ui-custom/ConfettiEffect"), { ssr: false });

export default function FinalSurprise() {
  // Steps: 'initial', 'cake', 'dark', 'letter', 'finale'
  const [step, setStep] = useState('initial');
  const [candles, setCandles] = useState([true]); // 1 candle
  const [hoverCount, setHoverCount] = useState(0);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [fakeOutStep, setFakeOutStep] = useState(0);

  const handleButtonHover = () => {
    if (hoverCount < 6) {
      setHoverCount(prev => prev + 1);
      // Scaled down the jump size so it doesn't jump off a mobile screen
      const randomX = (Math.random() - 0.5) * 200; // -100px to +100px
      const randomY = (Math.random() - 0.5) * 200; // -100px to +100px
      setButtonPos({ x: randomX, y: randomY });
    }
  };

  const handleRevealCake = () => {
    if (hoverCount >= 6) {
      if (fakeOutStep === 0) {
        setFakeOutStep(1);
      } else if (fakeOutStep === 1) {
        setFakeOutStep(2);
      } else {
        setStep('cake');
      }
    }
  };

  const handleBlow = (index) => {
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);
    if (newCandles.every(c => !c)) {
      setTimeout(() => setStep('dark'), 1500);
      setTimeout(() => setStep('letter'), 3500);
    }
  };

  const handleLetterComplete = useCallback(() => {
    setStep('finale');
  }, []);

  const loveLetter = "Happy 28th Birthday! ❤️ \n\nEvery year with you is more beautiful than the last. You bring so much light, joy, and magic into the world. I hope all your wishes come true today, and that this next chapter is filled with endless love and unforgettable moments. \n\nHere is to you, today and always. \n\nForever Yours.";

  const isDark = step === 'dark' || step === 'letter';

  return (
    <section
      id="surprise"
      style={{
        background: "radial-gradient(circle at 22% 18%, rgba(244,184,193,0.35), transparent 55%), radial-gradient(circle at 78% 72%, rgba(200,169,110,0.18), transparent 58%), linear-gradient(160deg, #FAE0E4 0%, #F5ECD7 40%, #FDF6EC 70%, #FAE0E4 100%)",
        padding: "clamp(40px, 8vw, 80px) 24px clamp(120px, 20vw, 180px)",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Darkness Overlay for smooth fade */}
      <motion.div
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, #150a0d 0%, #050203 100%)",
          zIndex: 1,
          pointerEvents: "none"
        }}
      />
      {step === 'finale' && <ConfettiEffect />}

      <div style={{ maxWidth: 800, width: "100%", textAlign: "center", position: "relative", zIndex: 10 }}>
        <AnimatePresence mode="wait">
          
          {/* STEP 0: Initial Button */}
          {step === 'initial' && (
            <motion.div key="button" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }}>
              <motion.button
                onClick={handleRevealCake}
                onMouseEnter={handleButtonHover}
                onTouchStart={handleButtonHover}
                animate={{ x: buttonPos.x, y: buttonPos.y }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                whileHover={hoverCount >= 6 ? { scale: 1.08, boxShadow: "0 12px 40px rgba(244,184,193,0.7)" } : {}}
                whileTap={hoverCount >= 6 ? { scale: 0.94 } : {}}
                style={{
                  background: "linear-gradient(135deg, var(--blush), var(--rose))",
                  color: "#fff",
                  border: "none",
                  padding: "clamp(14px, 4vw, 18px) clamp(24px, 6vw, 56px)",
                  borderRadius: "60px",
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "clamp(1rem, 4vw, 1.3rem)",
                  cursor: "pointer",
                  boxShadow: "0 6px 28px rgba(244,184,193,0.5)",
                  letterSpacing: "0.05em",
                  maxWidth: "100%",
                  whiteSpace: "normal"
                }}
              >
                {fakeOutStep === 0 && "🎁 Open Your Surprise"}
                {fakeOutStep === 1 && "Wait... are you SURE? 🤔"}
                {fakeOutStep === 2 && "Like, REALLY sure?! 🤨"}
              </motion.button>
              <p className="font-dancing" style={{ marginTop: 14, color: "var(--brown-light)", fontSize: "0.9rem" }}>
                {fakeOutStep > 0
                  ? "Last chance to turn back..."
                  : (hoverCount < 6 
                      ? (hoverCount > 0 ? "Catch it if you can! 😆" : "something special is waiting for you...") 
                      : "Okay fine, you caught it! Go ahead and open it... 💖")}
              </p>
            </motion.div>
          )}

          {/* STEP 1: The Birthday Cake */}
          {step === 'cake' && (
            <motion.div
              key="cake"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 2 } }}
              transition={{ duration: 1 }}
            >
              <h2 className="font-dancing" style={{ fontSize: "clamp(2.5rem, 8vw, 3.5rem)", color: "var(--rose)", marginBottom: 10 }}>
                Make a Wish...
              </h2>
              <p className="font-cormorant" style={{ fontSize: "clamp(1.1rem, 4.5vw, 1.4rem)", color: "var(--brown)", marginBottom: "clamp(10px, 4vw, 30px)", fontStyle: "italic", position: "relative", zIndex: 10 }}>
                Click the button below to blow out your candles ✨
              </p>

              <div style={{ position: "relative", width: "100%", maxWidth: 650, aspectRatio: "1/1", margin: "0 auto", filter: "drop-shadow(0 15px 30px rgba(139,111,94,0.2))" }}>
                {/* Balloons */}
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: "absolute", top: "-20%", right: "-20%", width: "60%", zIndex: 0, opacity: 0.9 }}
                >
                  <img src={balloonsPng.src} alt="Balloons" style={{ width: "100%" }} />
                </motion.div>

                <img src={cake2Png.src} alt="Cake" style={{ width: "100%", height: "100%", objectFit: "contain", position: "relative", zIndex: 2 }} />

                {/* Bouncing Click Here Image (Moved inside container to fix bottom gap) */}
                <motion.div
                  onClick={() => handleBlow(0)}
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: "absolute", bottom: "5%", left: "0", right: "0", display: "flex", justifyContent: "center", zIndex: 10, cursor: "pointer" }}
                >
                  <img src={clickHerePng.src} alt="Click Here" style={{ width: "100%", maxWidth: 600, objectFit: "contain", padding: "0 20px" }} />
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* STEP 3 & 4: The Typing Letter & Finale */}
          {(step === 'letter' || step === 'finale') && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <AnimatePresence>
                {step === 'finale' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    style={{ width: "100%", marginBottom: "clamp(15px, 5vw, 30px)" }}
                  >
                    <h2 className="font-script" style={{
                      fontSize: "clamp(2.5rem, 12vw, 5rem)",
                      color: "var(--dusty-rose)",
                      textShadow: "0 4px 15px rgba(212,132,142,0.4), 0 0 40px rgba(244,184,193,0.6)",
                      textAlign: "center",
                      margin: 0,
                      lineHeight: 1.1,
                      wordWrap: "break-word"
                    }}>
                      Happy 28th Birthday
                    </h2>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                key="letter"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{
                  background: "#fdf8f5",
                  padding: "clamp(20px, 5vw, 40px) clamp(15px, 4vw, 30px)",
                  borderRadius: "8px",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.5), inset 0 0 40px rgba(139,111,94,0.1)",
                  border: "1px solid rgba(139,111,94,0.2)",
                  position: "relative",
                  maxWidth: 600,
                  width: "100%",
                  margin: "0 auto",
                  backgroundImage: "radial-gradient(circle at center, transparent 0%, rgba(139,111,94,0.03) 100%)"
                }}
              >
                {/* Tape on top */}
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%) rotate(-2deg)", width: 100, height: 25, background: "rgba(255,255,255,0.7)", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }} />
                
                <TypewriterText text={loveLetter} onComplete={handleLetterComplete} />
              </motion.div>
            </div>
          )}

        </AnimatePresence>
      </div>

      {/* Decorative Elements - hidden when dark */}
      <AnimatePresence>
        {!isDark && (
          <motion.div exit={{ opacity: 0 }} transition={{ duration: 2 }}>
            {/* The previous decorative hearts, sparkles, etc. could go here, keeping it clean for now */}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
