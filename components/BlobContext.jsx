"use client";
import { createContext, useContext, useState, useEffect } from "react";

const BlobContext = createContext([]);

export function BlobProvider({ children, initialBlobs = [] }) {
  const [blobs, setBlobs] = useState(initialBlobs);

  const loadBlobs = () => {
    fetch(`/api/images?t=${Date.now()}`, { cache: "no-store" })
      .then(res => res.json())
      .then(data => setBlobs(data || []))
      .catch(err => console.error("Failed to fetch blobs", err));
  };

  useEffect(() => {
    if (initialBlobs.length === 0) {
      loadBlobs();
    }
    
    // Automatically refresh images when switching back to this tab!
    window.addEventListener("focus", loadBlobs);
    return () => window.removeEventListener("focus", loadBlobs);
  }, []);

  return <BlobContext.Provider value={blobs}>{children}</BlobContext.Provider>;
}

export function useBlobs() {
  return useContext(BlobContext);
}

export function getBlobUrl(blobs, filename, fallback) {
  const blob = blobs.find(b => b.pathname === filename);
  // Append timestamp to force browser to load new image, otherwise it caches the old one aggressively!
  return blob ? `${blob.url}?t=${new Date(blob.uploadedAt).getTime()}` : fallback;
}
