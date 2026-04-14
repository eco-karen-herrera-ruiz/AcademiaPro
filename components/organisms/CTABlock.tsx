import { Button } from "@/components/atoms/Button";

export function CTABlock() {
  return (
    <section
      id="cta"
      className="py-24 lg:py-32 relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-navy via-navy-700 to-navy-800"
        aria-hidden="true"
      />
      {/* Gold glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/8 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6">
        {/* Gold decorative line */}
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden="true" />

        <p className="text-eyebrow">¿Listo para empezar?</p>

        <h2
          id="cta-heading"
          className="font-playfair font-black text-3xl sm:text-4xl lg:text-5xl text-white"
        >
          Tu trabajo entregado{" "}
          <span className="text-gold-gradient italic">a tiempo,</span>{" "}
          siempre
        </h2>

        <p className="font-dm text-base text-white/55 max-w-lg">
          Únete a más de 2,400 universitarios ecuatorianos que confían en AcademiaPro para alcanzar sus metas académicas sin estrés.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button href="/cotizar" variant="primary" size="lg">
            Cotiza gratis ahora →
          </Button>
          <Button href="https://wa.me/593XXXXXXXXX" variant="outline" size="lg">
            💬 WhatsApp directo
          </Button>
        </div>

        <p className="text-xs font-dm text-white/30 mt-2">
          Sin compromisos · Respuesta en minutos · 100% confidencial
        </p>
      </div>
    </section>
  );
}
