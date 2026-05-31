import "./globals.css";

export const metadata = {
  title: "Happy Birthday 🎂 — A Memory Just For You",
  description: "A premium, handcrafted digital scrapbook celebrating your special day with memories, love, and joy.",
  openGraph: {
    title: "Happy Birthday — A Memory Just For You",
    description: "A premium digital scrapbook celebrating your birthday.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
