"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#universidades", label: "Universidades" },
  { href: "/#testimonios", label: "Testimonios" },
  { href: "/cotizar", label: "Cotizar" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] border-b border-gold/20 backdrop-blur-xl [-webkit-backdrop-filter:blur(20px)] bg-navy/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center shadow-gold">
                <span className="text-navy font-playfair font-bold text-sm">A</span>
              </div>
              <span className="font-playfair font-bold text-lg text-white group-hover:text-gold transition-colors duration-200">
                Academia<span className="text-gold">Pro</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-dm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <Button href="/cotizar" variant="primary" size="sm" className="hidden sm:inline-flex">
                Solicitar ahora
              </Button>
              <button
                aria-label="Abrir menú"
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-[200] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer panel */}
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-navy-800 border-l border-gold/20 animate-drawerIn shadow-card-hover">
            <div className="flex items-center justify-between p-4 border-b border-gold/10">
              <span className="font-playfair font-bold text-white">
                Academia<span className="text-gold">Pro</span>
              </span>
              <button
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="p-4 flex flex-col gap-1" aria-label="Navegación móvil">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-sm font-dm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-gold/10">
                <Button href="/cotizar" variant="primary" size="md" className="w-full">
                  Solicitar ahora
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
