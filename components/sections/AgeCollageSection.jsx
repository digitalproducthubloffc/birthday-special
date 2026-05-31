"use client";
import { motion } from "framer-motion";
import SafeImage from "../ui-custom/SafeImage";
import baloonPng from "@/pngs/baloon.png";
import teddyPng from "@/pngs/teddybear.png";

export default function AgeCollageSection() {
  return (
    <section
      id="age-collage"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FAE8E0 0%, #F5D3C8 40%, #E6C5B8 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
      }}
    >
      {/* ── Background Elements ── */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        <motion.span animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 4, repeat: Infinity }} style={{ position: "absolute", top: "15%", left: "12%", fontSize: "1.5rem", color: "#D4A853" }}>✦</motion.span>
        <motion.span animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 3.5, delay: 1, repeat: Infinity }} style={{ position: "absolute", top: "45%", right: "8%", fontSize: "2rem", color: "#D4A853" }}>★</motion.span>
        <motion.span animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 5, delay: 2, repeat: Infinity }} style={{ position: "absolute", bottom: "25%", left: "8%", fontSize: "1.2rem", color: "#D4A853" }}>✶</motion.span>
      </div>

      <div style={{ maxWidth: 1000, width: "100%", position: "relative", zIndex: 5, minHeight: 700 }}>
        
        {/* ── LEFT SIDE ELEMENTS ── */}
        
        {/* Balloons */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "-5%", left: "0%", width: 90, height: 170, filter: "drop-shadow(0 10px 15px rgba(200,100,100,0.2))", zIndex: 10 }}
        >
          <img
            src={baloonPng.src}
            alt="Balloon"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </motion.div>

        {/* Torn Paper Quote */}
        <motion.div initial={{ opacity: 0, x: -30, rotate: -6 }} whileInView={{ opacity: 1, x: 0, rotate: -4 }} viewport={{ once: true }} style={{ position: "absolute", top: "10%", left: "5%", background: "#FDF6EC", padding: "18px 20px", width: 200, boxShadow: "0 10px 20px rgba(139,111,94,0.15)", borderRadius: 2, clipPath: "polygon(0% 0%, 100% 2%, 98% 98%, 2% 100%)", zIndex: 11 }}>
          <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%) rotate(-2deg)", width: 60, height: 20, background: "rgba(244,184,193,0.7)" }} />
          <p className="font-cormorant" style={{ fontSize: "1rem", fontStyle: "italic", color: "var(--brown)", lineHeight: 1.4, textAlign: "center" }}>
            "Some days are just extra special... This is one of them."
          </p>
          <p style={{ textAlign: "center", marginTop: 8, color: "var(--rose)" }}>♡</p>
        </motion.div>

        {/* Baby Polaroid */}
        <motion.div initial={{ opacity: 0, y: 30, rotate: 12 }} whileInView={{ opacity: 1, y: 0, rotate: 8 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ position: "absolute", top: "33%", left: "2%", width: 190, zIndex: 12 }}>
          <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 14, height: 14, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #F5D782, #C9A227)", boxShadow: "0 4px 8px rgba(0,0,0,0.3)", zIndex: 10 }} />
          <div className="polaroid" style={{ background: "#fff", padding: "10px 10px 30px", boxShadow: "0 15px 25px rgba(0,0,0,0.15)" }}>
            <div style={{ width: "100%", height: 160, background: "#f0e8dc", position: "relative", overflow: "hidden" }}>
              <SafeImage src="/images/media_4.png" alt="Baby memory" />
            </div>
            <p className="font-dancing" style={{ textAlign: "center", marginTop: 12, fontSize: "1.1rem", color: "var(--brown)", fontWeight: "bold" }}>
              A star was born ♡
            </p>
          </div>
        </motion.div>

        {/* Cake Polaroid — moved from right */}
        <motion.div initial={{ opacity: 0, y: 30, rotate: -12 }} whileInView={{ opacity: 1, y: 0, rotate: -6 }} viewport={{ once: true }} transition={{ delay: 0.3 }} style={{ position: "absolute", top: "58%", left: "3%", width: 190, zIndex: 12 }}>
          <div className="polaroid" style={{ background: "#fff", padding: "10px 10px 30px", boxShadow: "0 15px 25px rgba(0,0,0,0.15)" }}>
            <div style={{ width: "100%", height: 160, background: "#f0e8dc", position: "relative", overflow: "hidden" }}>
              <SafeImage src="/images/roses_polaroid.png" alt="Cake memory" />
            </div>
            <p className="font-dancing" style={{ textAlign: "center", marginTop: 12, fontSize: "1.1rem", color: "var(--brown)", fontWeight: "bold" }}>
              Make a wish ♡
            </p>
          </div>
        </motion.div>

        {/* VIP Pass Ticket — moved from right */}
        <motion.div initial={{ opacity: 0, scale: 0.9, rotate: 20 }} whileInView={{ opacity: 1, scale: 1, rotate: 12 }} viewport={{ once: true }} transition={{ delay: 0.5 }} style={{ position: "absolute", bottom: "4%", left: "1%", background: "#E8B2A6", padding: "15px", width: 170, border: "2px dashed rgba(139,111,94,0.3)", borderRadius: 8, boxShadow: "0 10px 20px rgba(0,0,0,0.1)", zIndex: 13 }}>
          <div style={{ border: "1px solid rgba(139,111,94,0.4)", padding: "10px", textAlign: "center", borderRadius: 4 }}>
            <p className="font-cormorant" style={{ fontSize: "0.8rem", color: "var(--brown)", letterSpacing: 2, margin: "0 0 5px 0" }}>VIP PASS</p>
            <div style={{ height: 1, background: "rgba(139,111,94,0.3)", width: "100%", margin: "5px 0" }} />
            <p style={{ fontSize: "0.65rem", color: "var(--brown)", margin: "5px 0" }}>BIRTHDAY GIRL</p>
            <h4 className="font-cormorant" style={{ fontSize: "1.8rem", color: "var(--brown)", margin: 0, fontWeight: "bold" }}>MAY 19</h4>
            <div style={{ height: 1, background: "rgba(139,111,94,0.3)", width: "100%", margin: "5px 0" }} />
            <p style={{ fontSize: "0.55rem", color: "var(--brown)", margin: "5px 0" }}>VALID FOREVER</p>
            <div style={{ display: "flex", gap: 2, justifyContent: "center", height: 16, marginTop: 8 }}>
              {[3,1,4,2,3,1,2,4,1,3,2,4,1,3,2,1,4,2,3,1].map((w, i) => (
                <div key={i} style={{ width: w, background: "var(--brown)", height: "100%" }} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Teddy Bear */}
        <motion.div animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", bottom: "5%", left: "22%", width: 110, height: 110, filter: "drop-shadow(0 15px 20px rgba(0,0,0,0.15))", zIndex: 13 }}>
          <img src={teddyPng.src} alt="Teddy" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </motion.div>

        {/* ── CENTER ELEMENTS ("19" Collage) ── */}
        <div style={{ position: "absolute", left: "50%", top: "45%", transform: "translate(-50%, -50%)", width: "100%", maxWidth: 500, display: "flex", flexDirection: "column", alignItems: "center", zIndex: 8 }}>
          
          {/* Top Torn Paper "May" */}
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ background: "#FDF6EC", padding: "10px 35px", marginBottom: 10, boxShadow: "0 5px 15px rgba(139,111,94,0.1)", clipPath: "polygon(2% 0%, 98% 3%, 100% 97%, 0% 100%)", position: "relative" }}>
             <div style={{ position: "absolute", top: -6, left: "10%", transform: "rotate(-4deg)", width: 40, height: 16, background: "rgba(200,169,110,0.6)" }} />
             <div style={{ position: "absolute", top: -4, right: "10%", transform: "rotate(5deg)", width: 40, height: 16, background: "rgba(200,169,110,0.6)" }} />
             <h2 className="font-dancing" style={{ fontSize: "2.8rem", color: "var(--rose)", margin: 0, lineHeight: 1 }}>♡ May ♡</h2>
          </motion.div>

          {/* SVG Masked "19" Collage (The masterpiece) */}
          <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", bounce: 0.4, duration: 1 }} style={{ width: "100%", height: 450, position: "relative" }}>
            <svg viewBox="0 0 500 400" width="100%" height="100%" style={{ filter: "drop-shadow(0 20px 30px rgba(139,111,94,0.3)) drop-shadow(0 5px 10px rgba(139,111,94,0.15))" }}>
              <defs>
                <mask id="innerMask">
                  <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize="380" fontFamily="'Arial Black', 'Impact', sans-serif" fontWeight="900" fill="white" letterSpacing="-10px">19</text>
                </mask>
              </defs>
              
              {/* Thick White Frame */}
              <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize="380" fontFamily="'Arial Black', 'Impact', sans-serif" fontWeight="900" fill="white" letterSpacing="-10px">19</text>

              {/* Scaled-down inner content to leave a white border */}
              <g transform="translate(10, 8) scale(0.96)">
                <g mask="url(#innerMask)">
                   {/* Left side grid (inside the "1") */}
                   <image href="/images/birthday_cake.png" x="0" y="0" width="220" height="150" preserveAspectRatio="xMidYMid slice" />
                   <rect x="0" y="150" width="220" height="4" fill="white" />
                   <image href="/images/media_1.png" x="0" y="154" width="220" height="246" preserveAspectRatio="xMidYMid slice" />
                   
                   {/* Vertical split line (hidden normally, just in case) */}
                   <rect x="220" y="0" width="4" height="400" fill="white" />

                   {/* Right side grid (inside the "9") */}
                   <image href="/images/media_3.png" x="224" y="0" width="276" height="200" preserveAspectRatio="xMidYMid slice" />
                   <rect x="224" y="200" width="276" height="4" fill="white" />
                   <image href="/images/media_2.png" x="224" y="204" width="276" height="196" preserveAspectRatio="xMidYMid slice" />
                </g>
              </g>
            </svg>

            {/* Overlapping Gold Star */}
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", bottom: "12%", left: "32%", fontSize: "3rem", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))", zIndex: 15 }}>
              ⭐
            </motion.div>

            {/* Overlapping Gift Box */}
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", bottom: "5%", right: "20%", fontSize: "3.5rem", filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.2))", zIndex: 15 }}>
              🎁
            </motion.div>
          </motion.div>

        </div>

        {/* Center Bottom Text */}
        <div style={{ position: "absolute", left: "50%", bottom: "0%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", zIndex: 8 }}>
          <h3 className="font-dancing" style={{ fontSize: "3rem", color: "var(--brown)", margin: "0 0 15px 0" }}>A Star Was Born ♡</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <div style={{ background: "#FDF6EC", padding: "10px 30px", boxShadow: "0 5px 15px rgba(139,111,94,0.1)", clipPath: "polygon(1% 2%, 99% 0%, 97% 98%, 3% 100%)", transform: "rotate(-2deg)" }}>
              <p className="font-cormorant" style={{ fontSize: "1.1rem", fontWeight: "bold", margin: 0, color: "var(--brown)" }}>Today we celebrate YOU! ♡</p>
            </div>
            <span style={{ fontSize: "2.2rem", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))" }}>🏵️</span>
          </div>
        </div>


        {/* ── RIGHT SIDE ELEMENTS ── */}
        
        {/* Balloons */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [2, -2, 2] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{ position: "absolute", top: "-5%", right: "0%", width: 90, height: 170, filter: "drop-shadow(0 10px 15px rgba(200,100,100,0.2))", zIndex: 10 }}
        >
          <img
            src={baloonPng.src}
            alt="Balloon"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </motion.div>

        {/* Sticky Note */}
        <motion.div initial={{ opacity: 0, x: 30, rotate: 10 }} whileInView={{ opacity: 1, x: 0, rotate: 6 }} viewport={{ once: true }} style={{ position: "absolute", top: "15%", right: "5%", background: "#F4B8C1", padding: "18px", width: 180, boxShadow: "2px 5px 15px rgba(139,111,94,0.15)", borderRadius: "2px 20px 2px 20px", zIndex: 11 }}>
           <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%) rotate(4deg)", width: 60, height: 20, background: "rgba(200,169,110,0.6)" }} />
           <p className="font-cormorant" style={{ fontSize: "1.1rem", fontWeight: "bold", color: "var(--brown)", textAlign: "center", margin: 0 }}>
             Happy Birthday<br/>to the most<br/>beautiful soul ♡
           </p>
        </motion.div>



      </div>
    </section>
  );
}
