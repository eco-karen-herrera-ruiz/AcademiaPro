import Link from "next/link";
import { Button } from "@/components/atoms/Button";

const footerServices = [
  { label: "Deberes & Tareas", href: "/servicios/deberes" },
  { label: "Ensayos", href: "/servicios/ensayos" },
  { label: "Investigaciones", href: "/servicios/investigaciones" },
  { label: "Infografías", href: "/servicios/infografias" },
  { label: "Videos Académicos", href: "/servicios/videos" },
  { label: "Mapas Conceptuales", href: "/servicios/mapas-conceptuales" },
];

const footerUniversities = [
  "PUCE", "UCE", "ESPOL", "UTE", "UTPL",
  "UDLA", "USFQ", "U. de Cuenca",
];

const footerContact = [
  { label: "WhatsApp", href: "https://wa.me/593XXXXXXXXX", icon: "📱" },
  { label: "Instagram", href: "https://instagram.com/academiapro", icon: "📸" },
  { label: "Email", href: "mailto:hola@academiapro.ec", icon: "✉️" },
];

export function Footer() {
  return (
    <footer className="bg-navy-800 border-t border-gold/15 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop: 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
                <span className="text-navy font-playfair font-bold text-sm">A</span>
              </div>
              <span className="font-playfair font-bold text-lg text-white">
                Academia<span className="text-gold">Pro</span>
              </span>
            </Link>
            <p className="text-sm font-dm text-white/50 leading-relaxed">
              La plataforma académica de mayor prestigio para universitarios ecuatorianos. Resultados garantizados, total confidencialidad.
            </p>
            <Button href="/cotizar" variant="outline" size="sm" className="mt-2 w-fit">
              Cotizar ahora →
            </Button>
          </div>

          {/* Col 2: Services — mobile accordion */}
          <FooterSection title="Servicios">
            <ul className="flex flex-col gap-2">
              {footerServices.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm font-dm text-white/50 hover:text-gold transition-colors duration-200"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Col 3: Universities */}
          <FooterSection title="Universidades">
            <ul className="flex flex-col gap-2">
              {footerUniversities.map((u) => (
                <li key={u} className="text-sm font-dm text-white/50">
                  {u}
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Col 4: Contact */}
          <FooterSection title="Contacto">
            <ul className="flex flex-col gap-3">
              {footerContact.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-dm text-white/50 hover:text-gold transition-colors duration-200"
                  >
                    <span>{c.icon}</span> {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterSection>
        </div>

        {/* Divider */}
        <div className="border-t border-gold/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-dm text-white/35 text-center sm:text-left">
            © {new Date().getFullYear()} AcademiaPro. Todos los derechos reservados.
          </p>
          <p className="text-xs font-dm text-white/25">
            Hecho con ♥ para universitarios ecuatorianos
          </p>
        </div>
      </div>
    </footer>
  );
}

/* Mobile accordion section */
function FooterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group lg:open" open>
      <summary className="flex items-center justify-between cursor-pointer lg:cursor-default list-none mb-4">
        <h3 className="font-playfair font-bold text-sm text-white/80 uppercase tracking-widest">
          {title}
        </h3>
        <svg
          className="w-4 h-4 text-gold/50 lg:hidden group-open:rotate-180 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      {children}
    </details>
  );
}
