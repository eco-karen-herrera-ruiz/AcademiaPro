import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { ServiceRow } from "@/types/database";

const SERVICES_KEY = ["services"] as const;

/**
 * Fetch all active services, ordered by sort_order.
 */
export function useServices() {
  const supabase = createClient();

  return useQuery<ServiceRow[]>({
    queryKey: SERVICES_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return (data ?? []) as ServiceRow[];
    },
    staleTime: 5 * 60 * 1000, // services rarely change
  });
}

/**
 * Fetch a single service by slug.
 */
export function useServiceBySlug(slug: string | null) {
  const supabase = createClient();

  return useQuery<ServiceRow | null>({
    queryKey: [...SERVICES_KEY, slug],
    enabled: !!slug,
    queryFn: async () => {
      if (!slug) return null;

      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data as ServiceRow;
    },
    staleTime: 5 * 60 * 1000,
  });
}
