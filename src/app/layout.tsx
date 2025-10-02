import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hello Farcaster Mini App",
  description: "A simple demo frame + webpage",
  openGraph: {
    images: ["https://domain.vercel.app/preview.png"], 
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://domain.vercel.app/preview.png", 
    "fc:frame:button:1": "Say Hello",
    "fc:frame:button:2": "Visit Site",
    "fc:frame:post_url": "https://domain.vercel.app/api/frame",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-purple-800 via-indigo-900 to-black text-white min-h-screen flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}
