export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type OrderStatus =
  | "pending"
  | "in_progress"
  | "review"
  | "delivered"
  | "cancelled";

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          full_name: string;
          phone: string | null;
          university: string | null;
          career: string | null;
          semester: number | null;
          created_at: string;
          updated_at: string;
          is_active: boolean;
        };
        Insert: {
          id: string;
          full_name: string;
          phone?: string | null;
          university?: string | null;
          career?: string | null;
          semester?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string;
          phone?: string | null;
          university?: string | null;
          career?: string | null;
          semester?: number | null;
          is_active?: boolean;
        };
      };
      services: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string;
          base_price: number;
          delivery_hours_min: number;
          is_active: boolean;
          icon_emoji: string;
          sort_order: number;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description: string;
          base_price: number;
          delivery_hours_min: number;
          is_active?: boolean;
          icon_emoji?: string;
          sort_order?: number;
        };
        Update: {
          slug?: string;
          name?: string;
          description?: string;
          base_price?: number;
          delivery_hours_min?: number;
          is_active?: boolean;
          icon_emoji?: string;
          sort_order?: number;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          service_id: string;
          title: string;
          description: string;
          instructions: string | null;
          file_urls: Json | null;
          deadline: string;
          delivery_date: string | null;
          status: OrderStatus;
          price: number;
          is_express: boolean;
          is_paid: boolean;
          created_at: string;
          updated_at: string;
          notes_internal: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          service_id: string;
          title: string;
          description: string;
          instructions?: string | null;
          file_urls?: Json | null;
          deadline: string;
          delivery_date?: string | null;
          status?: OrderStatus;
          price: number;
          is_express?: boolean;
          is_paid?: boolean;
          created_at?: string;
          updated_at?: string;
          notes_internal?: string | null;
        };
        Update: {
          title?: string;
          description?: string;
          instructions?: string | null;
          file_urls?: Json | null;
          deadline?: string;
          delivery_date?: string | null;
          status?: OrderStatus;
          price?: number;
          is_express?: boolean;
          is_paid?: boolean;
          notes_internal?: string | null;
        };
      };
      reviews: {
        Row: {
          id: string;
          order_id: string;
          user_id: string;
          rating: number;
          comment: string | null;
          is_public: boolean;
        };
        Insert: {
          id?: string;
          order_id: string;
          user_id: string;
          rating: number;
          comment?: string | null;
          is_public?: boolean;
        };
        Update: {
          rating?: number;
          comment?: string | null;
          is_public?: boolean;
        };
      };
      admin_notes: {
        Row: {
          id: string;
          order_id: string;
          content: string;
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          content: string;
          created_by: string;
          created_at?: string;
        };
        Update: {
          content?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      order_status: OrderStatus;
    };
  };
}

/* Convenience aliases */
export type UserRow = Database["public"]["Tables"]["users"]["Row"];
export type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
export type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
export type ReviewRow = Database["public"]["Tables"]["reviews"]["Row"];
export type AdminNoteRow = Database["public"]["Tables"]["admin_notes"]["Row"];

export interface OrderWithService extends OrderRow {
  service: ServiceRow;
}
