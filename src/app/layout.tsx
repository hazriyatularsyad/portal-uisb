import type { Metadata } from "next";
import {
  Newsreader,
  Public_Sans,
  Geist_Mono,
  Faster_One,
} from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fasterOne = Faster_One({
  variable: "--font-faster-one",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Portal Informasi Mahasiswa - UISB",
  description:
    "Pusat informasi resmi pengumuman, kegiatan, beasiswa, dan kalender akademik Universitas Islam Sumatera Barat (UISB).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${publicSans.variable} ${newsreader.variable} ${geistMono.variable} ${fasterOne.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
