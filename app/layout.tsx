import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://academiapro.ec"),
  title: {
    default: "AcademiaPro — Servicios Académicos de Élite en Ecuador",
    template: "%s | AcademiaPro",
  },
  description:
    "Deberes, ensayos, investigaciones, infografías, videos y mapas conceptuales para universitarios ecuatorianos. Resultados garantizados, entrega puntual y total confidencialidad.",
  keywords: [
    "deberes universitarios",
    "ensayos académicos",
    "investigaciones Ecuador",
    "infografías académicas",
    "tareas universitarias",
    "asesoría académica Ecuador",
  ],
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: "https://academiapro.ec",
    siteName: "AcademiaPro",
    title: "AcademiaPro — Servicios Académicos de Élite",
    description:
      "La plataforma académica de mayor prestigio para universitarios ecuatorianos.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AcademiaPro — Servicios Académicos de Élite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AcademiaPro — Servicios Académicos de Élite",
    description:
      "La plataforma académica de mayor prestigio para universitarios ecuatorianos.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://academiapro.ec",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-dm bg-navy text-white antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
