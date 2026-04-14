import { HeroSection } from "@/components/organisms/HeroSection";
import { ServicesGrid } from "@/components/organisms/ServicesGrid";
import { UniversitiesStrip } from "@/components/organisms/UniversitiesStrip";
import { TestimonialsSection } from "@/components/organisms/TestimonialsSection";
import { CTABlock } from "@/components/organisms/CTABlock";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <HeroSection />
      <UniversitiesStrip />
      <ServicesGrid />
      <TestimonialsSection />
      <CTABlock />
    </div>
  );
}
