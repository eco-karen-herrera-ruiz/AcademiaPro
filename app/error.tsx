'use strict';
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/atoms/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Next.js Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-8 border border-[#C9A84C]/20 p-8 rounded-xl bg-[#111827]/50 backdrop-blur-sm">
        <h2 className="text-3xl font-serif text-[#C9A84C] mb-4">
          Error en el Sistema
        </h2>
        <p className="text-[#F5F5F7]/80 font-sans mb-8">
          Lo sentimos, ha ocurrido un problema inesperado en el Centro de Excelencia. 
          Nuestro equipo técnico ya ha sido notificado.
        </p>
        <div className="flex flex-col gap-4">
          <Button 
            onClick={() => reset()}
            className="w-full bg-[#C9A84C] hover:bg-[#B39440] text-[#0A0F1E] font-semibold py-3 rounded-lg transition-all"
          >
            Reintentar Acceso
          </Button>
          <a 
            href="/"
            className="text-[#F5F5F7]/60 hover:text-[#C9A84C] text-sm underline transition-colors"
          >
            Volver al Inicio
          </a>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-red-900/20 border border-red-900/50 rounded text-left overflow-auto max-h-40">
            <p className="text-red-400 text-xs font-mono break-all">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
