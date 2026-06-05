import "./globals.css";
import { list } from '@vercel/blob';
import { BlobProvider } from "@/components/BlobContext";

export const dynamic = 'force-dynamic'; // Ensures images are freshly loaded on the server

export const metadata = {
  title: "Happy Birthday 🎂 — A Memory Just For You",
  description: "A premium, handcrafted digital scrapbook celebrating your special day with memories, love, and joy.",
  openGraph: {
    title: "Happy Birthday — A Memory Just For You",
    description: "A premium digital scrapbook celebrating your birthday.",
    type: "website",
  },
};

export default async function RootLayout({ children }) {
  // Fetch images on the server before the page even loads to eliminate the "flash" of old images!
  const { blobs } = await list().catch(() => ({ blobs: [] }));

  return (
    <html lang="en">
      <body>
        <BlobProvider initialBlobs={blobs}>
          {children}
        </BlobProvider>
      </body>
    </html>
  );
}
