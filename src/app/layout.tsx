import type { Metadata, Viewport } from "next";
import { Inter, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";
import { SITE, siteUrl } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const shippori = Shippori_Mincho({
  variable: "--font-shippori",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const TITLE_DEFAULT =
  "Artnaldo Tattoo | Estudio de Tatuajes Blackwork y Neo-Japonés en Bogotá";
const TITLE_TEMPLATE =
  "%s | Artnaldo Tattoo | Tatuajes Blackwork y Neo-Japonés en Bogotá";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: TITLE_DEFAULT,
    template: TITLE_TEMPLATE,
  },
  description:
    "Estudio de tatuajes en Bogotá especializado en Blackwork, Neo-Japonés, Realismo y Fine Line. Diseños a medida, cotización por WhatsApp.",
  keywords: [
    "estudio de tatuajes Bogotá",
    "tatuajes blackwork Bogotá",
    "tatuajes neo-japonés Bogotá",
    "realismo",
    "fine line",
    "cover up",
    "tatuaje a medida",
    "tatuador Bogotá",
    "artnaldo tattoo",
  ],
  applicationName: SITE.shortName,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    title: TITLE_DEFAULT,
    description:
      "Estudio de tatuajes en Bogotá: Blackwork, Neo-Japonés, Realismo y Fine Line. Diseños a medida, cotización por WhatsApp.",
    url: siteUrl,
    siteName: SITE.shortName,
    images: [
      {
        url: SITE.logo,
        width: 150,
        height: 150,
        alt: "Logo Artnaldo Tattoo Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description:
      "Estudio de tatuajes en Bogotá: Blackwork, Neo-Japonés, Realismo y Fine Line.",
    images: [SITE.logo],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${shippori.variable} h-full antialiased dark`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col relative bg-carbon-900 text-blanco-washi">
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
