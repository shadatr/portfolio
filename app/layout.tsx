import type { Metadata } from "next";
import {
  Instrument_Serif,
  Bricolage_Grotesque,
  Inter,
  JetBrains_Mono,
  Fraunces,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

// === Editorial set ===
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

// === Refined set ===
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

// === Mono-tech set ===
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

// === Body sans (shared, always-loaded) ===
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Shada Daab — Software Engineer & Designer",
  description:
    "Software engineer building AI-powered products. Selected work, case studies, and experiments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrumentSerif.variable} ${fraunces.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} fonts-editorial theme-midnight`}
    >
      <body className="font-sans bg-ink-base text-text-high antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
