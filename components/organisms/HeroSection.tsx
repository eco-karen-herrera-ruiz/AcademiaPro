import { StatCard } from "@/components/molecules/StatCard";
import { Button } from "@/components/atoms/Button";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      aria-label="Hero principal"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-800 to-navy-700" aria-hidden="true" />
      {/* Gold orb */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gold/3 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <div className="flex flex-col gap-6">
            <p className="text-eyebrow opacity-0 animate-fadeUp">
              ✦ Academia Profesional · Ecuador
            </p>

            <h1 className="font-playfair font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight opacity-0 animate-fadeUp-1">
              Tu éxito{" "}
              <span className="text-gold-gradient italic">
                académico
              </span>{" "}
              garantizado
            </h1>

            <p className="font-dm text-base lg:text-lg text-white/60 leading-relaxed max-w-lg opacity-0 animate-fadeUp-2">
              Deberes, ensayos, investigaciones, infografías, videos y mapas conceptuales para todas las carreras universitarias del Ecuador. Entrega puntual, total confidencialidad.
            </p>

            {/* Trust line */}
            <div className="flex items-center gap-3 opacity-0 animate-fadeUp-2">
              <div className="flex -space-x-2" aria-hidden="true">
                {["M", "S", "A", "D"].map((initial, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gold/20 border-2 border-navy flex items-center justify-center text-xs font-playfair text-gold font-bold"
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <span className="text-sm font-dm text-white/50">
                +2,400 estudiantes confían en nosotros
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 opacity-0 animate-fadeUp-3 pt-2">
              <Button href="/cotizar" variant="primary" size="lg">
                Cotiza tu trabajo →
              </Button>
              <Button href="/#servicios" variant="outline" size="lg">
                Ver servicios
              </Button>
            </div>
          </div>

          {/* Right: Stat Cards */}
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap md:flex-col lg:flex-row items-start justify-center md:justify-end gap-y-4 opacity-0 animate-fadeUp-3">
            <StatCard value="+2,400" label="Estudiantes atendidos" delay={0} />
            <StatCard value="98.7%" label="Satisfacción garantizada" delay={1} />
            <StatCard value="+50" label="Carreras cubiertas" delay={2} />
            <StatCard value="24/7" label="Soporte disponible" delay={0} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40" aria-hidden="true">
        <span className="text-[10px] font-dm tracking-widest uppercase text-gold">Descubre más</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent animate-pulse" />
      </div>
    </section>
  );
}
