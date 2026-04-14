import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/atoms/Badge";
import { ServiceRequestForm } from "@/components/organisms/ServiceRequestForm";

const SERVICES_DATA: Record<
  string,
  {
    name: string;
    description: string;
    longDescription: string;
    base_price: number;
    delivery_hours_min: number;
    icon_emoji: string;
    features: string[];
  }
> = {
  deberes: {
    name: "Deberes & Tareas",
    description: "SoluciÃ³n completa de deberes universitarios.",
    longDescription:
      "Resolvemos cualquier tipo de deber universitario: ejercicios matemÃ¡ticos, problemas de fÃ­sica, talleres, cuestionarios, llenado de guÃ­as y mÃ¡s. Entrega en el plazo que necesites, con todos los pasos explicados.",
    base_price: 15,
    delivery_hours_min: 4,
    icon_emoji: "ðŸ“",
    features: ["SoluciÃ³n paso a paso", "Cualquier materia", "Revisiones incluidas", "Entrega express disponible"],
  },
  ensayos: {
    name: "Ensayos AcadÃ©micos",
    description: "RedacciÃ³n de ensayos con normas APA, IEEE o Vancouver.",
    longDescription:
      "Escribimos ensayos argumentativos, expositivos y analÃ­ticos con fuentes bibliogrÃ¡ficas reales, estructura acadÃ©mica correcta y las normas de citación que tu universidad requiere.",
    base_price: 25,
    delivery_hours_min: 8,
    icon_emoji: "âœï¸",
    features: ["Normas APA / IEEE / Vancouver", "Fuentes verificadas", "Anti-plagio", "Revisiones ilimitadas"],
  },
  investigaciones: {
    name: "Investigaciones",
    description: "Proyectos de investigaciÃ³n cientÃ­fica y bibliogrÃ¡fica.",
    longDescription:
      "Desarrollamos proyectos de investigaciÃ³n completos: planteamiento del problema, marco teÃ³rico, metodologÃ­a, anÃ¡lisis de resultados y conclusiones. Ideal para tesis, monografÃ­as y proyectos de titulaciÃ³n.",
    base_price: 50,
    delivery_hours_min: 24,
    icon_emoji: "ðŸ”¬",
    features: ["Marco teÃ³rico completo", "MetodologÃ­a rigurosa", "AnÃ¡lisis estadÃ­stico", "Formato de titulaciÃ³n"],
  },
  infografias: {
    name: "InfografÃ­as",
    description: "DiseÃ±o de infografÃ­as profesionales.",
    longDescription:
      "Creamos infografÃ­as visualmente impactantes para presentar informaciÃ³n compleja de forma clara y atractiva. Entregamos en alta resoluciÃ³n (PNG, PDF) listas para imprimir o presentar.",
    base_price: 20,
    delivery_hours_min: 6,
    icon_emoji: "ðŸŽ¨",
    features: ["Alta resoluciÃ³n", "PNG + PDF", "Paleta personalizada", "Entrega en 6h"],
  },
  videos: {
    name: "Videos AcadÃ©micos",
    description: "ProducciÃ³n de videos educativos en HD.",
    longDescription:
      "Producimos videos acadÃ©micos, exposiciones orales grabadas, tutoriales y presentaciones animadas en Full HD. Incluye ediciÃ³n, subtÃ­tulos y mÃºsica de fondo libre de derechos.",
    base_price: 40,
    delivery_hours_min: 12,
    icon_emoji: "ðŸŽ¬",
    features: ["Full HD 1080p", "EdiciÃ³n profesional", "SubtÃ­tulos", "MÃºsica libre de derechos"],
  },
  "mapas-conceptuales": {
    name: "Mapas Conceptuales",
    description: "Mapas conceptuales, mentales y sinÃ³pticos.",
    longDescription:
      "DiseÃ±amos mapas conceptuales, mentales y cuadros sinÃ³pticos claros, coloridos y con jerarquÃ­a visual correcta. Entregamos en formato editable y como imagen de alta resoluciÃ³n.",
    base_price: 12,
    delivery_hours_min: 2,
    icon_emoji: "ðŸ—ºï¸",
    features: ["Formato editable", "Alta resoluciÃ³n", "JerarquÃ­a visual", "Entrega en 2h"],
  },
};

export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];
  if (!service) return {};
  return {
    title: `${service.name} â€” AcademiaPro`,
    description: service.longDescription,
    alternates: { canonical: `https://academiapro.ec/servicios/${slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];
  if (!service) notFound();

  return (
    <div className="flex flex-col gap-0">
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden bg-navy-900">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-800 to-navy-700" aria-hidden="true" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{service.icon_emoji}</span>
                <Badge variant="gold">Servicio Premium</Badge>
              </div>
              <h1 className="font-playfair font-black text-4xl sm:text-5xl text-white">
                {service.name}
              </h1>
              <p className="font-dm text-white/60 text-lg leading-relaxed">
                {service.longDescription}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm font-dm text-white/70">
                    <span className="text-gold text-base" aria-hidden="true">âœ“</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4 pt-2">
                <div>
                  <p className="text-eyebrow">Desde</p>
                  <p className="font-playfair font-bold text-3xl text-gold">${service.base_price}</p>
                </div>
                <div className="w-px h-12 bg-gold/20" />
                <div>
                  <p className="text-eyebrow">Entrega mÃ­nima</p>
                  <p className="font-playfair font-bold text-xl text-white">{service.delivery_hours_min}h</p>
                </div>
              </div>
            </div>

            {/* Request form */}
            <ServiceRequestForm serviceName={service.name} serviceSlug={slug} />
          </div>
        </div>
      </section>
    </div>
  );
}
