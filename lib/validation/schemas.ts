import { z } from "zod";

// ── Quote Form Schemas (multi-step) ──────────────────────

export const quoteStep1Schema = z.object({
  service: z.string().min(1, "Selecciona un servicio"),
  is_express: z.boolean().optional().default(false),
});

export const quoteStep2Schema = z.object({
  university: z.string().min(1, "Selecciona tu universidad"),
  career: z.string().min(2, "Indica tu carrera"),
  topic: z.string().min(5, "Describe el tema (mín. 5 caracteres)"),
  instructions: z.string().max(2000, "Máximo 2000 caracteres").optional(),
  deadline: z
    .string()
    .min(1, "Indica la fecha límite")
    .refine(
      (val) => new Date(val) > new Date(),
      "La fecha límite debe ser en el futuro"
    ),
});

export const quoteStep3Schema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  phone: z
    .string()
    .min(7, "Número de contacto requerido")
    .regex(/^[+\d\s()-]+$/, "Formato de teléfono inválido"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
});

export const quoteFullSchema = quoteStep1Schema
  .merge(quoteStep2Schema)
  .merge(quoteStep3Schema);

export type QuoteStep1 = z.infer<typeof quoteStep1Schema>;
export type QuoteStep2 = z.infer<typeof quoteStep2Schema>;
export type QuoteStep3 = z.infer<typeof quoteStep3Schema>;
export type QuoteFull = z.infer<typeof quoteFullSchema>;

// ── Order Creation Schema (server-side) ──────────────────

export const orderCreateSchema = z.object({
  service_id: z.string().uuid("ID de servicio inválido"),
  title: z
    .string()
    .min(3, "El título es muy corto")
    .max(200, "El título es muy largo"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(5000, "Máximo 5000 caracteres"),
  instructions: z.string().max(2000).optional().nullable(),
  deadline: z
    .string()
    .refine(
      (val) => new Date(val) > new Date(),
      "La fecha límite debe ser en el futuro"
    ),
  is_express: z.boolean().default(false),
});

export type OrderCreate = z.infer<typeof orderCreateSchema>;

// ── Review Schema ────────────────────────────────────────

export const reviewSchema = z.object({
  order_id: z.string().uuid("ID de orden inválido"),
  rating: z
    .number()
    .int()
    .min(1, "Calificación mínima: 1")
    .max(5, "Calificación máxima: 5"),
  comment: z.string().max(1000, "Máximo 1000 caracteres").optional(),
  is_public: z.boolean().default(false),
});

export type ReviewInput = z.infer<typeof reviewSchema>;

// ── User Profile Schema ──────────────────────────────────

export const userProfileSchema = z.object({
  full_name: z
    .string()
    .min(2, "Nombre muy corto")
    .max(100, "Nombre muy largo"),
  phone: z
    .string()
    .regex(/^[+\d\s()-]+$/, "Formato de teléfono inválido")
    .optional()
    .nullable(),
  university: z.string().max(100).optional().nullable(),
  career: z.string().max(100).optional().nullable(),
  semester: z
    .number()
    .int()
    .min(1, "Semestre mínimo: 1")
    .max(12, "Semestre máximo: 12")
    .optional()
    .nullable(),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;
