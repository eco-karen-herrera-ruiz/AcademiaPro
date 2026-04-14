import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Supabase auth callback handler.
 * Exchanges the code for a session and redirects to the intended page.
 * Includes open-redirect protection by whitelisting internal paths.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const redirectParam = searchParams.get("redirect") ?? "/panel";

  // Prevent open redirect — only allow internal paths
  const safeRedirect = redirectParam.startsWith("/") ? redirectParam : "/panel";

  if (code) {
    const response = NextResponse.redirect(`${origin}${safeRedirect}`);

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return response;
    }
  }

  // If code exchange fails, redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
