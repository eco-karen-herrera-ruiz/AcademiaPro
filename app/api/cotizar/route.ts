import { NextResponse, type NextRequest } from "next/server";
import { quoteFullSchema } from "@/lib/validation/schemas";
import { sanitizeHtml } from "@/lib/utils";

/**
 * POST /api/cotizar — Submit a quote request.
 * Public endpoint (no auth required).
 * Validates input, sanitizes text fields.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = quoteFullSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Sanitize text inputs
    const sanitized = {
      ...data,
      name: sanitizeHtml(data.name),
      topic: sanitizeHtml(data.topic),
      instructions: data.instructions
        ? sanitizeHtml(data.instructions)
        : undefined,
    };

    // In production, this would:
    // 1. Send a WhatsApp notification via Twilio/WhatsApp Business API
    // 2. Store the quote in a Supabase "quotes" table
    // 3. Send a confirmation email
    // For now, log and return success
    console.log("[COTIZAR] New quote request:", sanitized);

    return NextResponse.json(
      {
        success: true,
        message:
          "Cotización recibida. Te contactaremos por WhatsApp en los próximos minutos.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
