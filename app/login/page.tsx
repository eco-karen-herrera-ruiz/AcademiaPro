"use client";

import { useState, useTransition, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/FormFields";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/panel";

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Ingresa un email vÃ¡lido");
      return;
    }

    startTransition(async () => {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
        },
      });

      if (authError) {
        setError(authError.message);
      } else {
        setSent(true);
      }
    });
  }

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <Link href="/" className="flex items-center justify-center gap-2 mb-10 group">
        <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center shadow-gold">
          <span className="text-navy font-playfair font-bold text-lg">A</span>
        </div>
        <span className="font-playfair font-bold text-2xl text-white group-hover:text-gold transition-colors duration-200">
          Academia<span className="text-gold">Pro</span>
        </span>
      </Link>

      <div className="glass rounded-2xl p-8 sm:p-10 shadow-gold">
        {sent ? (
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-3xl">
              âœ‰ï¸
            </div>
            <h1 className="font-playfair font-bold text-2xl text-white">
              Revisa tu email
            </h1>
            <p className="font-dm text-white/60 text-sm leading-relaxed">
              Enviamos un enlace mÃ¡gico a{" "}
              <span className="text-gold font-medium">{email}</span>. Haz
              clic en el enlace para acceder a tu panel.
            </p>
            <p className="text-xs font-dm text-white/35">
              Â¿No lo ves? Revisa tu carpeta de spam.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSent(false);
                setEmail("");
              }}
            >
              Usar otro email
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <p className="text-eyebrow mb-3">Acceso privado</p>
              <h1 className="font-playfair font-bold text-3xl text-white mb-2">
                Iniciar sesiÃ³n
              </h1>
              <p className="font-dm text-white/50 text-sm">
                Accede a tu panel para ver el estado de tus pedidos
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input
                label="Email universitario"
                type="email"
                placeholder="tu@universidad.edu.ec"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error ?? undefined}
                autoComplete="email"
                autoFocus
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={isPending}
              >
                Enviar enlace mÃ¡gico
              </Button>

              <p className="text-xs font-dm text-white/35 text-center">
                ðŸ”’ Sin contraseÃ±as. RecibirÃ¡s un enlace seguro por email.
              </p>
            </form>
          </>
        )}
      </div>

      <p className="text-center mt-6 text-xs font-dm text-white/30">
        Â¿Primera vez?{" "}
        <Link
          href="/cotizar"
          className="text-gold hover:text-gold-light transition-colors underline underline-offset-2"
        >
          Cotiza tu primer trabajo
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-navy via-navy-800 to-navy flex items-center justify-center px-4">
      {/* Gold orb */}
      <div
        className="fixed top-1/3 left-1/3 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-10 h-10 bg-gold/20 rounded-xl" />
          <div className="h-64 w-80 bg-white/5 rounded-2xl" />
        </div>
      }>
        <LoginForm />
      </Suspense>
    </main>
  );
}

