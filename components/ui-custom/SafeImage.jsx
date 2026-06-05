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

  // Reset states when src changes, THEN check if it's already cached
  useEffect(() => {
    console.log(`[SafeImage] Setup for ${alt || 'unknown'} with src:`, src);
    setLoaded(false);
    setError(false);
    setRetryCount(0);

    // Give React a tiny tick to apply the reset, or just check the ref immediately
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalHeight > 0) {
      console.log(`[SafeImage] Image ${alt || 'unknown'} instantly loaded from cache!`, src);
      setLoaded(true);
    }
  }, [src, alt]);

  const getRetrySrc = () => {
    if (retryCount === 0 || !src) return src;
    const separator = src.includes("?") ? "&" : "?";
    return `${src}${separator}retry=${Date.now()}`;
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Actual image */}
      {!error && (
        <img
          ref={imgRef}
          src={getRetrySrc()}
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
          onLoad={() => {
            console.log(`[SafeImage] SUCCESS loading ${alt || 'unknown'}!`, getRetrySrc());
            setLoaded(true);
          }}
          onError={(e) => {
            console.error(`[SafeImage] ERROR loading ${alt || 'unknown'}! Retry count is ${retryCount}`, getRetrySrc());
            if (retryCount < 10) {
              // Vercel CDN propagation delay: retry up to 10 times (30 seconds)
              console.log(`[SafeImage] Retrying ${alt || 'unknown'} in 3 seconds...`);
              setTimeout(() => setRetryCount((prev) => prev + 1), 3000);
            } else {
              console.error(`[SafeImage] GIVING UP on ${alt || 'unknown'} after 10 retries.`);
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
