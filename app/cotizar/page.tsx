"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Input, Textarea, Select } from "@/components/atoms/FormFields";
import { Button } from "@/components/atoms/Button";

// Step schemas
const step1Schema = z.object({
  service: z.string().min(1, "Selecciona un servicio"),
  is_express: z.boolean().optional(),
});

const step2Schema = z.object({
  university: z.string().min(1, "Selecciona tu universidad"),
  career: z.string().min(2, "Indica tu carrera"),
  topic: z.string().min(5, "Describe el tema"),
  instructions: z.string().optional(),
  deadline: z.string().min(1, "Indica la fecha límite"),
});

const step3Schema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  phone: z.string().min(7, "Número de contacto requerido"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
});

type Step1 = z.infer<typeof step1Schema>;
type Step2 = z.infer<typeof step2Schema>;
type Step3 = z.infer<typeof step3Schema>;

const SERVICES = [
  { value: "deberes", label: "📝 Deberes & Tareas — desde $15" },
  { value: "ensayos", label: "✍️ Ensayos Académicos — desde $25" },
  { value: "investigaciones", label: "🔬 Investigaciones — desde $50" },
  { value: "infografias", label: "🎨 Infografías — desde $20" },
  { value: "videos", label: "🎬 Videos Académicos — desde $40" },
  { value: "mapas-conceptuales", label: "🗺️ Mapas Conceptuales — desde $12" },
];

const UNIVERSITIES = [
  "PUCE","UCE","ESPOL","UTE","UTPL","UDLA","UPS","U. de Cuenca",
  "U. de Guayaquil","USFQ","UTN","ESPE","U. del Azuay","ULEAM",
  "UNL","UTC","UNIANDES","UCSG","Otra",
].map((u) => ({ value: u, label: u }));

const STEPS = ["Servicio", "Detalles", "Contacto"];

export default function CotizarPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Step1 & Step2 & Step3>>({});
  const [submitted, setSubmitted] = useState(false);

  const form1 = useForm<Step1>({ resolver: zodResolver(step1Schema), defaultValues: formData });
  const form2 = useForm<Step2>({ resolver: zodResolver(step2Schema), defaultValues: formData });
  const form3 = useForm<Step3>({ resolver: zodResolver(step3Schema), defaultValues: formData });

  async function onStep1(data: Step1) {
    setFormData((p) => ({ ...p, ...data }));
    setStep(1);
  }

  async function onStep2(data: Step2) {
    setFormData((p) => ({ ...p, ...data }));
    setStep(2);
  }

  async function onStep3(data: Step3) {
    const final = { ...formData, ...data };
    console.log("Final form data:", final);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="pt-16 min-h-screen flex items-center justify-center bg-navy">
          <div className="glass rounded-2xl p-12 flex flex-col items-center gap-6 text-center max-w-lg mx-auto shadow-gold">
            <div className="text-6xl">🎉</div>
            <h1 className="font-playfair font-black text-3xl text-white">¡Cotización enviada!</h1>
            <p className="font-dm text-white/60">
              Recibimos tu solicitud. En los próximos minutos te contactaremos directamente por WhatsApp con el presupuesto.
            </p>
            <Button href="/" variant="primary">Volver al inicio</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-gradient-to-br from-navy via-navy-800 to-navy flex items-center justify-center py-20">
        <div className="max-w-xl w-full mx-auto px-4">
          {/* Step indicator */}
          <div className="mb-8 flex items-center justify-center gap-2" aria-label="Pasos del formulario">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-dm font-bold border transition-all duration-300 ${
                  i < step ? "bg-gold border-gold text-navy" :
                  i === step ? "bg-gold/20 border-gold text-gold" :
                  "bg-transparent border-white/20 text-white/30"
                }`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={`text-xs font-dm hidden sm:block ${i === step ? "text-gold" : "text-white/30"}`}>
                  {label}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={`w-8 h-px mx-1 ${i < step ? "bg-gold" : "bg-white/10"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="glass rounded-2xl p-6 sm:p-8 shadow-card">
            {step === 0 && (
              <form onSubmit={form1.handleSubmit(onStep1)} className="flex flex-col gap-5">
                <div>
                  <h1 className="font-playfair font-bold text-2xl text-white">¿Qué necesitas?</h1>
                  <p className="text-sm font-dm text-white/50 mt-1">Selecciona el tipo de trabajo</p>
                </div>
                <Select
                  label="Tipo de servicio"
                  options={SERVICES}
                  error={form1.formState.errors.service?.message}
                  {...form1.register("service")}
                />
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gold/40 bg-surface accent-gold"
                    {...form1.register("is_express")}
                  />
                  <span className="text-sm font-dm text-white/70 group-hover:text-white transition-colors">
                    ⚡ Entrega express (aplica recargo)
                  </span>
                </label>
                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Continuar →
                </Button>
              </form>
            )}

            {step === 1 && (
              <form onSubmit={form2.handleSubmit(onStep2)} className="flex flex-col gap-5">
                <div>
                  <h2 className="font-playfair font-bold text-2xl text-white">Detalles del trabajo</h2>
                  <p className="text-sm font-dm text-white/50 mt-1">Cuéntanos qué necesitas exactamente</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select label="Universidad" options={UNIVERSITIES} error={form2.formState.errors.university?.message} {...form2.register("university")} />
                  <Input label="Carrera" placeholder="Ej. Ingeniería Industrial" error={form2.formState.errors.career?.message} {...form2.register("career")} />
                </div>
                <Input label="Tema o materia" placeholder="Ej. Cálculo — límites y derivadas" error={form2.formState.errors.topic?.message} {...form2.register("topic")} />
                <Textarea label="Instrucciones adicionales" placeholder="Páginas, normas, formato esperado..." {...form2.register("instructions")} />
                <Input label="Fecha límite" type="datetime-local" error={form2.formState.errors.deadline?.message} {...form2.register("deadline")} />
                <div className="flex gap-3">
                  <Button type="button" variant="ghost" size="lg" onClick={() => setStep(0)} className="flex-1">← Atrás</Button>
                  <Button type="submit" variant="primary" size="lg" className="flex-1">Continuar →</Button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={form3.handleSubmit(onStep3)} className="flex flex-col gap-5">
                <div>
                  <h2 className="font-playfair font-bold text-2xl text-white">Tus datos de contacto</h2>
                  <p className="text-sm font-dm text-white/50 mt-1">Para enviarte el presupuesto</p>
                </div>
                <Input label="Nombre completo" placeholder="Ej. María García" error={form3.formState.errors.name?.message} {...form3.register("name")} />
                <Input label="WhatsApp" type="tel" placeholder="+593 99 999 9999" error={form3.formState.errors.phone?.message} {...form3.register("phone")} />
                <Input label="Email (opcional)" type="email" placeholder="maria@universidad.edu.ec" {...form3.register("email")} />
                <p className="text-xs font-dm text-white/40 text-center">🔒 Tus datos son 100% confidenciales y nunca compartidos</p>
                <div className="flex gap-3">
                  <Button type="button" variant="ghost" size="lg" onClick={() => setStep(1)} className="flex-1">← Atrás</Button>
                  <Button type="submit" variant="primary" size="lg" loading={form3.formState.isSubmitting} className="flex-1">
                    Enviar cotización →
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
