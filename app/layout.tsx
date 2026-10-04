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
import { SITE_URL } from "@/lib/seo";

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

const DESCRIPTION =
  "Software engineer building AI-powered products. Selected work, case studies, and experiments.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shada Daab — Software Engineer & Designer",
    template: "%s · Shada Daab",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Shada Daab",
    title: "Shada Daab — Software Engineer & Designer",
    description: DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@itsshdab",
  },
};

// Runs before first paint. If the browser can't get a hardware-accelerated
// WebGL context, it's almost certainly rendering everything on the CPU —
// tag <html class="lite"> so the heavy blur/blend/animation effects switch off.
const LITE_MODE_SCRIPT = `(function(){try{var c=document.createElement("canvas");var gl=c.getContext("webgl",{failIfMajorPerformanceCaveat:true});if(!gl){document.documentElement.classList.add("lite");return;}var l=gl.getExtension("WEBGL_lose_context");if(l)l.loseContext();}catch(e){document.documentElement.classList.add("lite");}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrumentSerif.variable} ${fraunces.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} fonts-editorial theme-midnight`}
      // The lite-mode script below may add a class before hydration.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LITE_MODE_SCRIPT }} />
      </head>
      <body className="font-sans bg-ink-base text-text-high antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
