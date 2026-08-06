import type { Metadata } from "next";
import { Inter, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const shippori = Shippori_Mincho({
  variable: "--font-shippori",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artnaldo Tattoo",
  description: "Blackwork / Neo-Japanese tattoo studio site. Tinta & Sombra.",
  icons: {
    icon: "/logo.jpg",
  },
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
