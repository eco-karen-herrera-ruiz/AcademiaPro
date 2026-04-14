<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%">
  
  # 🏆 AcademiaPro
  **Centro de Excelencia Académica: Tu éxito académico, redefinido.**
  
  [![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
  [![Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
  [![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js)](https://nextjs.org)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  
  <p align="center">
    <b>AcademiaPro</b> es una plataforma de élite diseñada para transformar la experiencia educativa en Ecuador. 
    Desde la <b>UNEMI</b> hasta la <b>ESPOL</b>, ofrecemos una infraestructura digital segura y lujosa para la gestión de servicios académicos de alto impacto.
  </p>

  <a href="#-vista-previa">Vista Previa</a> •
  <a href="#-stack-tecnológico">Stack Técnico</a> •
  <a href="#-arquitectura-de-roles">Arquitectura de Roles</a> •
  <a href="#-seguridad-y-normativa">Seguridad</a> •
  <a href="#-guía-de-inicio">Instalación</a>
</div>

---

## ✨ Identidad Visual & UX: "Dark Luxury"

AcademiaPro no es solo una web de tareas; es una declaración de autoridad académica.

* **Estética:** Lujo editorial oscuro (Dark Luxury).
* **Paleta de Colores:** * `Navy Profundo (#0A0F1E)` - Autoridad y seriedad.
    * `Dorado Academia (#C9A84C)` - Éxito y excelencia.
    * `Blanco Crema` - Claridad y lectura.
* **Tipografía:** *Playfair Display* (Elegancia clásica) & *DM Sans* (Modernidad técnica).

---

## 🛠️ Stack Tecnológico de Grado Producción

| Capa | Tecnología | Implementación |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 14** | App Router, Server Components & SEO dinámico. |
| **Backend** | **Supabase** | PostgreSQL, Realtime engine & Edge Functions. |
| **Diseño** | **Tailwind CSS** | Sistema de diseño basado en tokens y Atomic Design. |
| **Seguridad** | **CISO Protocol** | Row Level Security (RLS) + Middleware de Auth. |
| **Infra** | **Vercel** | CI/CD, Edge Network & Caching avanzado. |

---

## 🏛️ Arquitectura de Ingeniería (Estrategia de Roles)

Este proyecto ha sido desarrollado bajo una metodología de **micro-especialización por agentes**, garantizando que cada área cumpla con estándares de nivel Senior:

### 💻 Frontend & UI/UX
* **Diseño Atómico:** Componentes divididos en *Atoms, Molecules, Organisms y Templates*.
* **Performance:** LCP < 2.5s mediante pre-renderizado y optimización de fuentes de Google Fonts.
* **Responsividad:** Estrategia *Mobile-First* adaptada para dispositivos de gama baja y pantallas 2K.

### ⚙️ Backend & Base de Datos
Esquema relacional en Supabase optimizado para escalabilidad:
* **Users & Profiles:** Extensión de `auth.users` con metadatos universitarios.
* **Orders System:** Gestión de estados (Pending → In Progress → Delivered).
* **Realtime:** Notificaciones instantáneas al cliente sobre el estado de sus trabajos.

### 🛡️ Seguridad & Pentesting (OWASP Top 10)
* **CISO Compliance:** Implementación estricta de **Row Level Security (RLS)**. El usuario X jamás podrá ver la orden del usuario Y.
* **Protección API:** Rate Limiting con **Upstash Redis** para prevenir ataques de fuerza bruta y spam en cotizaciones.
* **Headers:** CSP, X-Frame-Options y HSTS configurados en `next.config.js`.

---

## 📊 Esquema de Datos (SQL Preview)

```sql
-- Ejemplo de Política RLS para Seguridad Extrema
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Los estudiantes solo ven sus propios pedidos"
ON orders FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Solo admins pueden ver todas las órdenes"
ON orders FOR ALL
TO authenticated
USING ( (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true );
```