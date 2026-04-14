import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { OrderWithService } from "@/types/database";

const ORDERS_KEY = ["orders"] as const;

/**
 * Fetch all orders for the current user, joined with service info.
 */
export function useOrders() {
  const supabase = createClient();

  return useQuery<OrderWithService[]>({
    queryKey: ORDERS_KEY,
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No autenticado");

      const { data, error } = await supabase
        .from("orders")
        .select("*, service:services(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data ?? []) as unknown as OrderWithService[];
    },
  });
}

/**
 * Fetch a single order by ID.
 */
export function useOrderDetail(orderId: string | null) {
  const supabase = createClient();

  return useQuery<OrderWithService | null>({
    queryKey: [...ORDERS_KEY, orderId],
    enabled: !!orderId,
    queryFn: async () => {
      if (!orderId) return null;

      const { data, error } = await supabase
        .from("orders")
        .select("*, service:services(*)")
        .eq("id", orderId)
        .single();

      if (error) throw error;
      return data as unknown as OrderWithService;
    },
  });
}

/**
 * Create a new order via API route (mass-assignment protected server-side).
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (order: {
      service_id: string;
      title: string;
      description: string;
      instructions?: string | null;
      deadline: string;
      is_express: boolean;
      user_id: string;
      price: number;
      file_urls?: string[];
    }) => {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Error al crear pedido");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDERS_KEY });
    },
  });
}

/**
 * Dashboard stats for the current user.
 */
export function useDashboardStats() {
  const supabase = createClient();

  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No autenticado");

      const { data: orders, error } = await supabase
        .from("orders")
        .select("status, price")
        .eq("user_id", user.id);

      if (error) throw error;

      const all = (orders ?? []) as Array<{ status: string; price: number }>;
      return {
        total: all.length,
        pending: all.filter((o) => o.status === "pending").length,
        in_progress: all.filter((o) => o.status === "in_progress").length,
        delivered: all.filter((o) => o.status === "delivered").length,
        totalSpent: all
          .filter((o) => o.status === "delivered")
          .reduce((sum, o) => sum + Number(o.price), 0),
      };
    },
  });
}
