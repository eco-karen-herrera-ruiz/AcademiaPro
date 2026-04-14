import type { Metadata } from "next";
import { Header } from "@/components/organisms/Header";
import { HeroSection } from "@/components/organisms/HeroSection";
import { UniversitiesStrip } from "@/components/organisms/UniversitiesStrip";
import { ServicesGrid } from "@/components/organisms/ServicesGrid";
import { TestimonialsSection } from "@/components/organisms/TestimonialsSection";
import { CTABlock } from "@/components/organisms/CTABlock";
import { Footer } from "@/components/organisms/Footer";

export const metadata: Metadata = {
  title: "AcademiaPro — Servicios Académicos de Élite en Ecuador",
  description:
    "Deberes, ensayos, investigaciones, infografías, videos y mapas conceptuales para universitarios ecuatorianos. Resultados garantizados, entrega puntual y total confidencialidad.",
  alternates: { canonical: "https://academiapro.ec" },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <UniversitiesStrip />
        <ServicesGrid />
        <TestimonialsSection />
        <CTABlock />
      </main>
      <Footer />
    </>
  );
}
