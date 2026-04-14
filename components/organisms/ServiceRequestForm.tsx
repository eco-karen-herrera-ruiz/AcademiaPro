"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Textarea, Select } from "@/components/atoms/FormFields";
import { Button } from "@/components/atoms/Button";

const schema = z.object({
  name: z.string().min(2, "Nombre requerido (mín. 2 caracteres)"),
  phone: z.string().min(7, "Número de contacto requerido"),
  university: z.string().min(1, "Selecciona tu universidad"),
  topic: z.string().min(5, "Describe el tema (mín. 5 caracteres)"),
  instructions: z.string().optional(),
  deadline: z.string().min(1, "Indica la fecha límite"),
});

type FormData = z.infer<typeof schema>;

const UNIVERSITIES = [
  "PUCE", "UCE", "ESPOL", "UTE", "UTPL", "UDLA", "UPS",
  "U. de Cuenca", "U. de Guayaquil", "USFQ", "UTN", "ESPE",
  "U. del Azuay", "ULEAM", "UNL", "UTC", "UNIANDES", "UCSG", "Otra",
].map((u) => ({ value: u, label: u }));

interface ServiceRequestFormProps {
  serviceName: string;
  serviceSlug: string;
}

export function ServiceRequestForm({ serviceName, serviceSlug }: ServiceRequestFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    // TODO: connect to Supabase createOrder
    console.log("Order data:", { ...data, serviceSlug });
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="glass rounded-2xl p-8 flex flex-col items-center gap-4 text-center shadow-gold">
        <div className="text-5xl">✅</div>
        <h3 className="font-playfair font-bold text-2xl text-white">¡Solicitud enviada!</h3>
        <p className="font-dm text-white/60">
          Te contactaremos por WhatsApp en los próximos minutos para confirmar los detalles y precio.
        </p>
        <Button href="/" variant="outline" size="md" className="mt-2">
          Volver al inicio
        </Button>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 sm:p-8 shadow-card">
      <h2 className="font-playfair font-bold text-xl text-white mb-1">
        Solicitar: {serviceName}
      </h2>
      <p className="text-sm font-dm text-white/50 mb-6">
        Completa el formulario y recíbete respuesta en minutos.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Tu nombre"
            placeholder="Ej. María García"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="WhatsApp"
            type="tel"
            placeholder="+593 99 999 9999"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>

        <Select
          label="Universidad"
          options={UNIVERSITIES}
          error={errors.university?.message}
          {...register("university")}
        />

        <Input
          label="Tema o materia"
          placeholder="Ej. Cálculo diferencial — ejercicios de límites"
          error={errors.topic?.message}
          {...register("topic")}
        />

        <Textarea
          label="Instrucciones adicionales"
          placeholder="Número de páginas, normas específicas, formato, etc."
          {...register("instructions")}
        />

        <Input
          label="Fecha límite de entrega"
          type="datetime-local"
          error={errors.deadline?.message}
          {...register("deadline")}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          className="w-full mt-2"
        >
          Enviar solicitud →
        </Button>

        <p className="text-xs text-center font-dm text-white/30">
          🔒 Tu información es 100% confidencial
        </p>
      </form>
    </div>
  );
}
