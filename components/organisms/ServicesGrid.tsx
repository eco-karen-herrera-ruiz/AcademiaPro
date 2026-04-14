import { ServiceCard, ServiceCardSkeleton } from "@/components/molecules/ServiceCard";
import type { ServiceRow } from "@/types/database";

const FEATURED_SERVICES: ServiceRow[] = [
  {
    id: "1",
    slug: "deberes",
    name: "Deberes & Tareas",
    description: "Solución completa de deberes universitarios con explicaciones detalladas y entrega en el plazo acordado.",
    base_price: 15,
    delivery_hours_min: 4,
    is_active: true,
    icon_emoji: "📝",
    sort_order: 1,
  },
  {
    id: "2",
    slug: "ensayos",
    name: "Ensayos Académicos",
    description: "Redacción de ensayos argumentativos y expositivos con normas APA, IEEE o Vancouver según tu carrera.",
    base_price: 25,
    delivery_hours_min: 8,
    is_active: true,
    icon_emoji: "✍️",
    sort_order: 2,
  },
  {
    id: "3",
    slug: "investigaciones",
    name: "Investigaciones",
    description: "Proyectos de investigación científica, bibliográfica y de campo con metodología rigurosa.",
    base_price: 50,
    delivery_hours_min: 24,
    is_active: true,
    icon_emoji: "🔬",
    sort_order: 3,
  },
  {
    id: "4",
    slug: "infografias",
    name: "Infografías",
    description: "Diseño de infografías profesionales y visualmente impactantes para presentaciones académicas.",
    base_price: 20,
    delivery_hours_min: 6,
    is_active: true,
    icon_emoji: "🎨",
    sort_order: 4,
  },
  {
    id: "5",
    slug: "videos",
    name: "Videos Académicos",
    description: "Producción de videos educativos, exposiciones grabadas y presentaciones animadas en HD.",
    base_price: 40,
    delivery_hours_min: 12,
    is_active: true,
    icon_emoji: "🎬",
    sort_order: 5,
  },
  {
    id: "6",
    slug: "mapas-conceptuales",
    name: "Mapas Conceptuales",
    description: "Creación de mapas conceptuales, mentales y sinópticos claros y profesionalmente estructurados.",
    base_price: 12,
    delivery_hours_min: 2,
    is_active: true,
    icon_emoji: "🗺️",
    sort_order: 6,
  },
];

interface ServicesGridProps {
  services?: ServiceRow[];
  loading?: boolean;
}

export function ServicesGrid({ services = FEATURED_SERVICES, loading = false }: ServicesGridProps) {
  return (
    <section id="servicios" className="py-20 lg:py-28" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-eyebrow mb-3">✦ Nuestros Servicios</p>
          <h2
            id="services-heading"
            className="font-playfair font-black text-3xl sm:text-4xl lg:text-5xl text-white"
          >
            Todo lo que{" "}
            <span className="text-gold-gradient italic">necesitas</span>
          </h2>
          <p className="mt-4 text-white/55 font-dm text-base max-w-xl mx-auto">
            Servicios académicos profesionales para todas las materias y carreras universitarias del Ecuador.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <ServiceCardSkeleton key={i} />)
            : services.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
        </div>
      </div>
    </section>
  );
}
