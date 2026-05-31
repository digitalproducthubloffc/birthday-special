"use client";
import { useState } from "react";
import NextImage from "next/image";

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

  // Use plain <img> for external URLs to avoid Next.js image optimization timeouts
  const isExternal = src && (src.startsWith("http://") || src.startsWith("https://"));

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Actual image */}
      {!error && (
        isExternal ? (
          <img
            src={src}
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
            onError={() => setError(true)}
            fetchPriority={props.priority ? "high" : "auto"}
          />
        ) : (
          <NextImage
            src={src}
            alt={alt}
            fill={fill}
            className={`${className} transition-opacity duration-300`}
            style={{
              opacity: loaded ? 1 : 0,
              objectFit: "cover",
              ...style,
            }}
            sizes={sizes}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            {...props}
          />
        )
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
          <span className="font-dancing" style={{ color: "var(--rose)", fontSize: "0.85rem" }}>
            {placeholderText || (src ? src.split("/").pop() : alt)}
          </span>
        </div>
      )}
    </div>
  );
}
