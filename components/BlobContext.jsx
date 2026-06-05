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

    // Listen for instant upload events from the admin dashboard via BroadcastChannel
    let channel;
    if (typeof window !== "undefined" && window.BroadcastChannel) {
      channel = new BroadcastChannel("blob_updates");
      channel.onmessage = (event) => {
        if (event.data === "refresh") loadBlobs();
      };
    }

    return () => {
      window.removeEventListener("focus", loadBlobs);
      if (channel) channel.close();
    };
  }, []);

  return <BlobContext.Provider value={blobs}>{children}</BlobContext.Provider>;
}

export function useBlobs() {
  return useContext(BlobContext);
}

export function getBlobUrl(blobs, filename, fallback) {
  // Sort by newest first to always get the most recent upload
  const sortedBlobs = [...blobs].sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
  
  const searchPrefix = filename.split('.')[0]; // e.g. "hero_10"
  
  const blob = sortedBlobs.find(b => {
    const nameWithoutExt = b.pathname.split('.')[0];
    // Vercel adds a random string: hero_10-AbCdEf
    const baseName = nameWithoutExt.split('-')[0];
    return baseName === searchPrefix || b.pathname === filename;
  });

  if (blob) {
    const url = `${blob.url}?t=${new Date(blob.uploadedAt).getTime()}`;
    console.log(`[BlobContext] FOUND blob for ${filename}:`, url);
    return url;
  }
  
  console.log(`[BlobContext] NO blob for ${filename}, using fallback:`, fallback);
  return fallback;
}
