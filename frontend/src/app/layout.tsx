import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { NextFont } from "next/dist/compiled/@next/font";

export const metadata: Metadata = {
  title: "StarWiki",
  description: "I am your father",
  keywords: ['starwars', 'starwiki']
};

const roboto: NextFont = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
