import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { orderCreateSchema } from "@/lib/validation/schemas";

/**
 * POST /api/orders — Create a new order.
 * Requires authentication. Mass-assignment protected via Zod schema.
 */
export async function POST(request: NextRequest) {
  try {
    const supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Auth check
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    // Parse and validate body — prevents mass assignment
    const body = await request.json();
    const parsed = orderCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const validData = parsed.data;

    // Verify service exists
    const { data: service, error: svcError } = await supabase
      .from("services")
      .select("id, base_price")
      .eq("id", validData.service_id)
      .eq("is_active", true)
      .single();

    if (svcError || !service) {
      return NextResponse.json(
        { error: "Servicio no encontrado o inactivo" },
        { status: 404 }
      );
    }

    // Calculate price (base * express multiplier)
    const price = validData.is_express
      ? Number(service.base_price) * 1.5
      : Number(service.base_price);

    // Insert order — privileged fields are hardcoded, never from client
    const { data: order, error: insertError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        service_id: validData.service_id,
        title: validData.title,
        description: validData.description,
        instructions: validData.instructions ?? null,
        file_urls: [],
        deadline: validData.deadline,
        is_express: validData.is_express,
        price,
        // Hardcoded — never from client input
        status: "pending",
        is_paid: false,
        notes_internal: null,
      })
      .select("*")
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: "Error al crear el pedido" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: order }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
