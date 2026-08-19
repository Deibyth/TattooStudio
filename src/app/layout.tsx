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
  "Artnaldo Tattoo | Estudio de Tatuajes Blackwork y Japonés en Bogotá";
const TITLE_TEMPLATE =
  "%s | Artnaldo Tattoo | Tatuajes Blackwork y Japonés en Bogotá";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: TITLE_DEFAULT,
    template: TITLE_TEMPLATE,
  },
  description:
    "Estudio de tatuajes en Bogotá especializado en Blackwork, Japonés, Realismo y Fine Line. Diseños a medida, cotización por WhatsApp.",
  keywords: [
    "estudio de tatuajes Bogotá",
    "tatuajes blackwork Bogotá",
    "tatuajes japonés Bogotá",
    "realismo",
    "fine line",
    "cover up",
    "tatuaje a medida",
    "tatuador Bogotá",
    "artnaldo tattoo",
  ],
  authors: [{ name: "Artnaldo Tattoo Studio", url: siteUrl }],
  creator: "Artnaldo Tattoo Studio",
  publisher: "Artnaldo Tattoo Studio",
  applicationName: SITE.shortName,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    title: TITLE_DEFAULT,
    description:
      "Estudio de tatuajes en Bogotá: Blackwork, Japonés, Realismo y Fine Line. Diseños a medida, cotización por WhatsApp.",
    url: siteUrl,
    siteName: SITE.shortName,
    images: [
      {
        url: SITE.logo,
        width: 1200,
        height: 630,
        alt: "Artnaldo Tattoo Studio - Blackwork y Japonés en Bogotá",
        type: "image/jpeg",
      },
      {
        url: SITE.logo,
        width: 150,
        height: 150,
        alt: "Logo Artnaldo Tattoo Studio",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description:
      "Estudio de tatuajes en Bogotá: Blackwork, Japonés, Realismo y Fine Line.",
    images: [SITE.logo],
    creator: "@artnaldotattoo",
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
  verification: {
    google: "google170448f359b6e5e2",
  },
  icons: {
    icon: "/icon-192.png",
    shortcut: "/icon-192.png",
    apple: "/icon-192.png",
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
  other: {
    // SEO Local / Geo (Bogotá, Colombia)
    "geo.region": "CO-DC",
    "geo.placename": "Bogotá",
    "geo.position": "4.7110;-74.0721",
    ICBM: "4.7110, -74.0721",

    // PWA / iOS / Mobile
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Artnaldo Tattoo",
    "mobile-web-app-capable": "yes",
    "application-name": "Artnaldo Tattoo",

    // Theme color para todos los navegadores
    "theme-color": SITE.themeColor,
    "msapplication-TileColor": SITE.themeColor,
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
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
