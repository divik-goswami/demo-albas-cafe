import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alba's Cafe | The Art of Extraction",
  description: "An immersive, artisanal coffee experience that blends retro aesthetics with the physics of roasting and extraction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfairDisplay.variable} ${dmSans.variable}`}>
      <body>
        <div className="noise-overlay"></div>
        {children}
      </body>
    </html>
  );
}
