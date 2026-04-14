import { TestimonialCard } from "@/components/molecules/TestimonialCard";

const TESTIMONIALS = [
  {
    quote:
      "Entregaron mi investigación antes del plazo, con todas las citas correctas en APA. El profesor quedó impresionado. Sin duda el mejor servicio académico del Ecuador.",
    name: "Valeria M.",
    role: "Ingeniería Industrial",
    university: "ESPOL",
    rating: 5,
    initials: "VM",
  },
  {
    quote:
      "Llevaba tres materias atrasadas y AcademiaPro me salvó el semestre. La calidad de los ensayos es impecable y el trato es súper profesional y discreto.",
    name: "David R.",
    role: "Derecho",
    university: "PUCE",
    rating: 5,
    initials: "DR",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonios"
      className="py-20 lg:py-28 bg-navy-700/30"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-eyebrow mb-3">✦ Testimonios</p>
          <h2
            id="testimonials-heading"
            className="font-playfair font-black text-3xl sm:text-4xl text-white"
          >
            Lo que dicen{" "}
            <span className="text-gold-gradient italic">nuestros clientes</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
