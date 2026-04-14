import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0F1E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://academiapro.ec"),
  title: {
    default: "AcademiaPro | Centro de Excelencia Académica",
    template: "%s | AcademiaPro",
  },
  description: "Servicios académicos de élite en Ecuador. Ensayos, investigaciones y proyectos universitarios con resultados garantizados.",
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: "https://academiapro.ec",
    siteName: "AcademiaPro",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AcademiaPro | Excelencia Académica",
    description: "Tu éxito académico, redefinido.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased bg-[#0A0F1E] min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
