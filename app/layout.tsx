import type { Metadata, Viewport } from "next";
import "./globals.css";
import { QueryProvider } from "./providers";
import { Logo } from "../src/components/Logo";

export const metadata: Metadata = {
  title: "Habit Love",
  description: "Couples habit tracker for Yero and Jacky",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#09090f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Habit Love" />
        <meta name="theme-color" content="#09090f" />
      </head>
      <body>
        <QueryProvider>
          <div className="app">
            <div className="blob b1" />
            <div className="blob b2" />
            <div className="blob b3" />
            <div className="blob b4" />
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}