"use client";
import { useState, useRef, useEffect } from "react";

export default function SafeImage({
  src,
  alt,
  fill = true,
  className = "",
  sizes,
  placeholderText,
  fallbackEmoji = "📷",
  style,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const imgRef = useRef(null);

  // Fix for browser cache issue: if the image is already loaded, onLoad might not fire
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalHeight > 0) {
      setLoaded(true);
    }
  }, [src]);

  // Reset states if src changes
  useEffect(() => {
    setLoaded(false);
    setError(false);
    setRetryCount(0);
  }, [src]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Actual image */}
      {!error && (
        <img
          ref={imgRef}
          src={retryCount > 0 ? `${src}&retry=${Date.now()}` : src}
          alt={alt}
          className={`${className} transition-opacity duration-300`}
          style={{
            opacity: loaded ? 1 : 0,
            objectFit: "cover",
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            ...style,
          }}
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            if (retryCount < 10) {
              // Vercel CDN propagation delay: retry up to 10 times (30 seconds)
              setTimeout(() => setRetryCount((prev) => prev + 1), 3000);
            } else {
              setError(true);
            }
          }}
          fetchPriority={props.priority ? "high" : "auto"}
        />
      )}

      {/* Placeholder shown if error OR not loaded yet */}
      {(!loaded || error) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #F5ECD7 0%, #FAE0E4 50%, #F5ECD7 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            zIndex: 1,
          }}
        >
          <span style={{ fontSize: "2.5rem" }}>{fallbackEmoji}</span>
          <span className="font-dancing" style={{ color: "var(--rose)", fontSize: "1.1rem" }}>
            {placeholderText || alt}
          </span>
        </div>
      )}
    </div>
  );
}
