import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { StatusBadge } from "@/components/atoms/Badge";

export const metadata: Metadata = {
  title: "Mi Panel — AcademiaPro",
  description: "Gestiona tus pedidos académicos.",
  robots: { index: false, follow: false },
};

export default async function PanelPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch orders with service join
  const { data: rawOrders, error } = await supabase
    .from("orders")
    .select("*, service:services(name, icon_emoji)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const orders = rawOrders as Array<{
    id: string;
    title: string;
    status: string;
    price: number;
    created_at: string;
    deadline: string;
    delivery_date: string | null;
    service: { name: string; icon_emoji: string } | null;
  }> | null;

  const displayName = user.user_metadata?.full_name ?? user.email ?? "Estudiante";

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-gradient-to-br from-navy via-navy-800 to-navy pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-10">
            <p className="text-eyebrow mb-2">Panel de cliente</p>
            <h1 className="font-playfair font-black text-3xl sm:text-4xl text-white">
              Hola, <span className="text-gold-gradient italic">{displayName.split(" ")[0]}</span> 👋
            </h1>
            <p className="font-dm text-white/50 mt-2">
              Aquí puedes ver el estado de todos tus pedidos.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Total pedidos", value: orders?.length ?? 0 },
              { label: "En proceso", value: orders?.filter((o) => o.status === "in_progress").length ?? 0 },
              { label: "Entregados", value: orders?.filter((o) => o.status === "delivered").length ?? 0 },
              { label: "Pendientes", value: orders?.filter((o) => o.status === "pending").length ?? 0 },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4 flex flex-col gap-1">
                <span className="font-playfair font-bold text-2xl text-gold">{stat.value}</span>
                <span className="text-[11px] font-dm text-white/40 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Orders table */}
          {error && (
            <div className="glass rounded-xl p-6 border border-red-500/30 text-red-400 font-dm text-sm">
              Error al cargar pedidos. Por favor recarga la página.
            </div>
          )}

          {!error && (!orders || orders.length === 0) && (
            <div className="glass rounded-2xl p-12 flex flex-col items-center gap-4 text-center">
              <div className="text-5xl">📭</div>
              <h2 className="font-playfair font-bold text-xl text-white">Aún no tienes pedidos</h2>
              <p className="font-dm text-white/50 text-sm">
                Cuando solicites un trabajo aparecerá aquí.
              </p>
              <a
                href="/cotizar"
                className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-navy font-dm font-semibold text-sm hover:bg-gold-light transition-colors duration-200"
              >
                Hacer mi primer pedido →
              </a>
            </div>
          )}

          {orders && orders.length > 0 && (
            <div className="flex flex-col gap-4">
              {orders.map((order) => {
                const svc = order.service as { name: string; icon_emoji: string } | null;
                return (
                  <div
                    key={order.id}
                    className="glass rounded-2xl p-5 sm:p-6 border border-gold/10 hover:border-gold/25 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{svc?.icon_emoji ?? "📄"}</span>
                        <div>
                          <h3 className="font-playfair font-bold text-white text-base">{order.title}</h3>
                          <p className="text-xs font-dm text-white/45 mt-0.5">{svc?.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <StatusBadge status={order.status} />
                        <span className="font-playfair font-bold text-gold text-lg">${order.price}</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-dm text-white/40">
                      <div>
                        <span className="block text-white/25 uppercase tracking-wider mb-0.5">Creado</span>
                        {new Date(order.created_at).toLocaleDateString("es-EC")}
                      </div>
                      <div>
                        <span className="block text-white/25 uppercase tracking-wider mb-0.5">Fecha límite</span>
                        {new Date(order.deadline).toLocaleDateString("es-EC")}
                      </div>
                      {order.delivery_date && (
                        <div>
                          <span className="block text-white/25 uppercase tracking-wider mb-0.5">Entregado</span>
                          {new Date(order.delivery_date).toLocaleDateString("es-EC")}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
