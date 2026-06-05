"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
export default function AdminPage() {
  const [blobs, setBlobs] = useState([]);
  const [uploading, setUploading] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ isOpen: false, type: "alert", message: "", onConfirm: null });
  const [localPreviews, setLocalPreviews] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const showAlert = (message) => setModal({ isOpen: true, type: "alert", message, onConfirm: null });
  const showConfirm = (message, onConfirm) => setModal({ isOpen: true, type: "confirm", message, onConfirm });
  const closeModal = () => setModal({ ...modal, isOpen: false });

  const fetchBlobs = async () => {
    try {
      const res = await fetch(`/api/images?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      setBlobs(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("adminAuth") === "true") {
      setIsAuthenticated(true);
    }
    fetchBlobs();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "digitalproducthub") {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
      setAuthError("");
    } else {
      setAuthError("Incorrect password");
      setPassword("");
    }
  };

  const compressImage = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", { type: 'image/jpeg' }));
          }, 'image/jpeg', 0.8);
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async (e, filename) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(filename);

    try {
      let fileToUpload = file;
      
      // Try to compress, but gracefully fallback if it's an unsupported format like HEIC or GIF
      try {
        // Skip compression for GIFs to preserve animation
        if (!file.name.toLowerCase().endsWith('.gif')) {
          fileToUpload = await compressImage(file);
        }
      } catch (compressionError) {
        console.warn("Browser compression failed, falling back to original file:", compressionError);
      }

      // Explicitly check size to give the user a clear error instead of a generic crash
      const MAX_MB = 2.0; // Reduced to 2MB to be extremely safe against Next.js limits
      if (fileToUpload.size > 4.5 * 1024 * 1024) {
        showAlert("Image is still too large after compression. Please try a different photo.");
        setUploading(null);
        return;
      }

      // INSTANT PREVIEW FIX: Show the local file instantly while Vercel processes it in the background
      const objectUrl = URL.createObjectURL(fileToUpload);
      setLocalPreviews((prev) => ({ ...prev, [filename]: objectUrl }));

      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("filename", filename);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) {
        let errorText = "";
        try {
          const errBody = await res.json();
          errorText = errBody.error || errBody.message || JSON.stringify(errBody);
        } catch {
          errorText = await res.text();
        }
        throw new Error(`Server returned ${res.status}: ${errorText.substring(0, 100)}`);
      }
      await fetchBlobs(); // Refresh the previews

      // Wait 3 seconds for Vercel CDN to propagate, then instantly notify Live Dashboard tab
      if (typeof window !== "undefined" && window.BroadcastChannel) {
        setTimeout(() => {
          new BroadcastChannel("blob_updates").postMessage("refresh");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      showAlert(`Upload failed: ${err.message}\nIf this happens repeatedly, the image might still be too large, or the format is unsupported.`);
    } finally {
      setUploading(null);
    }
  };

  const handleDelete = (filename) => {
    const blob = blobs.find((b) => b.pathname === filename);
    if (!blob) return;

    showConfirm(`Are you sure you want to delete this custom image and revert to the default?`, async () => {
      setUploading(filename);
      // Clear any instant local preview
      setLocalPreviews((prev) => {
        const next = { ...prev };
        delete next[filename];
        return next;
      });

      try {
        const res = await fetch("/api/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: blob.url }),
        });
        if (!res.ok) throw new Error("Delete failed");
        await fetchBlobs(); // Refresh previews

        if (typeof window !== "undefined" && window.BroadcastChannel) {
          setTimeout(() => {
            new BroadcastChannel("blob_updates").postMessage("refresh");
          }, 3000);
        }
      } catch (err) {
        console.error(err);
        showAlert("Delete failed.");
      } finally {
        setUploading(null);
      }
    });
  };

  const getBlobUrl = (filename) => {
    // Append uploadedAt timestamp to force refresh only when the specific image changes!
    const blob = blobs.find((b) => b.pathname === filename);
    return blob ? `${blob.url}?t=${new Date(blob.uploadedAt).getTime()}` : null;
  };

  const UploadSlot = ({ title, filename }) => {
    const blobUrl = getBlobUrl(filename);
    // Prioritize the instant local preview if it exists, otherwise use Vercel's Blob URL
    const currentUrl = localPreviews[filename] || blobUrl;

    return (
      <div style={{ border: "1px solid #eee", padding: 15, borderRadius: 12, background: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column" }}>
        <h4 style={{ margin: "0 0 10px", color: "#555" }}>{title} <br/><small style={{color: "#aaa", fontWeight: "normal"}}>({filename})</small></h4>
        {currentUrl ? (
          <img src={currentUrl} alt={filename} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 8, marginBottom: 15 }} />
        ) : (
          <div style={{ height: 160, background: "#f8f8f8", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 15, borderRadius: 8, color: "#999", fontSize: "0.9rem" }}>
            No custom image uploaded
          </div>
        )}
        <div style={{ marginTop: "auto" }}>
          {currentUrl ? (
            <div style={{ display: "flex", gap: "10px" }}>
              <label style={{ flex: 1, display: "block", background: uploading === filename ? "#ddd" : "var(--rose, #d4848e)", color: "#fff", padding: "10px", textAlign: "center", borderRadius: 6, cursor: uploading === filename ? "not-allowed" : "pointer", fontWeight: "bold" }}>
                {uploading === filename ? "..." : "Change"}
                <input 
                  type="file" 
                  accept="image/*" 
                  style={{ display: "none" }}
                  onChange={(e) => handleUpload(e, filename)} 
                  onClick={(e) => { e.target.value = null; }}
                  disabled={uploading === filename}
                />
              </label>
              <button 
                onClick={() => handleDelete(filename)}
                disabled={uploading === filename}
                style={{ flex: 1, background: "#fff", border: "1px solid #ff4444", color: "#ff4444", padding: "10px", borderRadius: 6, cursor: uploading === filename ? "not-allowed" : "pointer", fontWeight: "bold", outline: "none" }}
              >
                Delete
              </button>
            </div>
          ) : (
            <label style={{ display: "block", background: uploading === filename ? "#ddd" : "var(--rose, #d4848e)", color: "#fff", padding: "10px 15px", textAlign: "center", borderRadius: 6, cursor: uploading === filename ? "not-allowed" : "pointer", fontWeight: "bold" }}>
              {uploading === filename ? "Uploading..." : "Select Image"}
              <input 
                type="file" 
                accept="image/*" 
                style={{ display: "none" }}
                onChange={(e) => handleUpload(e, filename)} 
                onClick={(e) => { e.target.value = null; }}
                disabled={uploading === filename}
              />
            </label>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return <div style={{ padding: 50, textAlign: "center", fontSize: "1.2rem", fontFamily: "sans-serif" }}>Loading Admin Dashboard...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fdfdfd", padding: 20 }}>
        <form onSubmit={handleLogin} style={{ background: "#fff", padding: "40px 30px", borderRadius: 16, boxShadow: "0 10px 40px rgba(139,111,94,0.1)", width: "100%", maxWidth: 400, textAlign: "center", border: "1px solid rgba(139,111,94,0.1)" }}>
          <h2 style={{ fontFamily: "'Dancing Script', cursive", color: "var(--rose, #d4848e)", fontSize: "2.8rem", marginBottom: 10 }}>Admin Access</h2>
          <p style={{ color: "#666", marginBottom: 30, fontSize: "0.95rem" }}>Please enter the secure password to manage memories.</p>
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ width: "100%", padding: "14px 16px", borderRadius: 8, border: "1px solid rgba(139,111,94,0.2)", marginBottom: 15, outline: "none", fontSize: "1rem", color: "#333" }}
          />
          
          {authError && <p style={{ color: "#e74c3c", fontSize: "0.9rem", marginBottom: 15, marginTop: -5 }}>{authError}</p>}
          
          <button
            type="submit"
            style={{ width: "100%", padding: "14px", background: "var(--rose, #d4848e)", color: "#fff", border: "none", borderRadius: 8, fontSize: "1.05rem", cursor: "pointer", fontWeight: "bold", boxShadow: "0 4px 15px rgba(212,132,142,0.3)" }}
          >
            Unlock Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 20px", fontFamily: "sans-serif", maxWidth: 1200, margin: "0 auto", background: "#fdfdfd", minHeight: "100vh" }}>
      {/* Custom Modal */}
      {modal.isOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
          <div style={{ background: "#fff", padding: "30px", borderRadius: "16px", maxWidth: "400px", width: "90%", boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}>
            <h3 style={{ margin: "0 0 15px 0", color: "#333", fontSize: "1.3rem" }}>{modal.type === "confirm" ? "Confirm Action" : "Notice"}</h3>
            <p style={{ color: "#666", lineHeight: 1.5, marginBottom: "25px", fontSize: "1rem" }}>{modal.message}</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              {modal.type === "confirm" && (
                <button onClick={closeModal} style={{ padding: "10px 20px", borderRadius: "8px", border: "1px solid #ddd", background: "#f8f8f8", color: "#555", cursor: "pointer", fontWeight: "bold" }}>Cancel</button>
              )}
              <button 
                onClick={() => {
                  if (modal.onConfirm) modal.onConfirm();
                  closeModal();
                }} 
                style={{ padding: "10px 20px", borderRadius: "8px", border: "none", background: "var(--rose, #d4848e)", color: "#fff", cursor: "pointer", fontWeight: "bold" }}
              >
                {modal.type === "confirm" ? "Delete" : "OK"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <h1 style={{ color: "var(--rose, #d4848e)", margin: "0 0 10px" }}>Photo Upload Admin Dashboard</h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>Upload photos here. They will instantly update on the live website via Vercel Blob!</p>
        <Link href="/" style={{ color: "var(--blush, #f4b8c1)", textDecoration: "underline" }}>&larr; Back to Website</Link>
      </div>

      <details open style={{ marginBottom: 40 }}>
        <summary style={{ fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer", padding: 15, background: "#fff", border: "1px solid #eee", borderRadius: 8, marginBottom: 20 }}>
          1. Hero Section (10 Images)
        </summary>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20, padding: 10 }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <UploadSlot key={i} title={`Slideshow Image ${i + 1}`} filename={`hero_${i + 1}.jpg`} />
          ))}
        </div>
      </details>

      <details open style={{ marginBottom: 40 }}>
        <summary style={{ fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer", padding: 15, background: "#fff", border: "1px solid #eee", borderRadius: 8, marginBottom: 20 }}>
          2. Through The Years (28 Images)
        </summary>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20, padding: 10 }}>
          {Array.from({ length: 28 }).map((_, i) => (
            <UploadSlot key={i} title={`Year ${i + 1}`} filename={`memory_${i + 1}.jpg`} />
          ))}
        </div>
      </details>

      <details open style={{ marginBottom: 40 }}>
        <summary style={{ fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer", padding: 15, background: "#fff", border: "1px solid #eee", borderRadius: 8, marginBottom: 20 }}>
          3. Roll of Memories (Film Strip - 8 Images)
        </summary>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20, padding: 10 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <UploadSlot key={i} title={`Film Photo ${i + 1}`} filename={`film_${i + 1}.jpg`} />
          ))}
        </div>
      </details>
    </div>
  );
}
