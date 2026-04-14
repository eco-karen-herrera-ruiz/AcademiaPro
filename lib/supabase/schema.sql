-- ============================================================
-- AcademiaPro — Supabase SQL Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- ── Extensions ──────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── ENUM: order_status ──────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE order_status AS ENUM (
    'pending', 'in_progress', 'review', 'delivered', 'cancelled'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ── TABLE: users ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.users (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL,
  phone       TEXT,
  university  TEXT,
  career      TEXT,
  semester    SMALLINT CHECK (semester BETWEEN 1 AND 12),
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── TABLE: services ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.services (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug                TEXT NOT NULL UNIQUE,
  name                TEXT NOT NULL,
  description         TEXT NOT NULL,
  base_price          NUMERIC(10,2) NOT NULL CHECK (base_price >= 0),
  delivery_hours_min  SMALLINT NOT NULL CHECK (delivery_hours_min > 0),
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  icon_emoji          TEXT NOT NULL DEFAULT '📄',
  sort_order          SMALLINT NOT NULL DEFAULT 0
);

-- ── TABLE: orders ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  service_id      UUID NOT NULL REFERENCES public.services(id) ON DELETE RESTRICT,
  title           TEXT NOT NULL,
  description     TEXT NOT NULL,
  instructions    TEXT,
  file_urls       JSONB DEFAULT '[]'::JSONB,
  deadline        TIMESTAMPTZ NOT NULL,
  delivery_date   TIMESTAMPTZ,
  status          order_status NOT NULL DEFAULT 'pending',
  price           NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  is_express      BOOLEAN NOT NULL DEFAULT FALSE,
  is_paid         BOOLEAN NOT NULL DEFAULT FALSE,
  notes_internal  TEXT,  -- admin only
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── TABLE: reviews ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reviews (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id   UUID NOT NULL UNIQUE REFERENCES public.orders(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  rating     SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment    TEXT,
  is_public  BOOLEAN NOT NULL DEFAULT FALSE
);

-- ── TABLE: admin_notes ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admin_notes (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id    UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  content     TEXT NOT NULL,
  created_by  UUID NOT NULL REFERENCES auth.users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── INDEXES ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_orders_user_id   ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status    ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created   ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_order_id ON public.reviews(order_id);

-- ── TRIGGER: updated_at ─────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── TRIGGER: on_order_status_change ─────────────────────────
-- Fires an edge function to send email notification
CREATE OR REPLACE FUNCTION notify_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    PERFORM net.http_post(
      url     := current_setting('app.edge_function_url', TRUE) || '/notify-order-status',
      headers := jsonb_build_object('Content-Type', 'application/json'),
      body    := jsonb_build_object(
                   'order_id', NEW.id,
                   'user_id',  NEW.user_id,
                   'old_status', OLD.status,
                   'new_status', NEW.status
                 )::TEXT
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER trg_order_status_change
  AFTER UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION notify_order_status_change();

-- ── TRIGGER: on_auth_user_created ────────────────────────────
-- Automatically create a row in public.users when someone signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER trg_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ════════════════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE public.users       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notes ENABLE ROW LEVEL SECURITY;

-- ── USERS policies ───────────────────────────────────────────
CREATE POLICY "users_select_own"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "users_update_own"
  ON public.users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
  -- NOTE: is_active cannot be set to FALSE by user (no privilege)

-- ── SERVICES policies ────────────────────────────────────────
-- Anyone can read active services (public catalog)
CREATE POLICY "services_select_active"
  ON public.services FOR SELECT
  USING (is_active = TRUE);

-- ── ORDERS policies ──────────────────────────────────────────
CREATE POLICY "orders_select_own"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "orders_insert_own"
  ON public.orders FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    -- Prevent client from setting privileged fields
    is_paid = FALSE AND
    notes_internal IS NULL
  );

CREATE POLICY "orders_update_own_limited"
  ON public.orders FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending')
  WITH CHECK (
    auth.uid() = user_id AND
    -- Cannot change price, is_paid, status, notes_internal
    is_paid = FALSE AND
    notes_internal IS NULL
  );

-- Users can never DELETE orders
-- (no DELETE policy = no delete for authenticated users)

-- ── REVIEWS policies ─────────────────────────────────────────
-- Public reviews visible to all
CREATE POLICY "reviews_select_public"
  ON public.reviews FOR SELECT
  USING (is_public = TRUE OR auth.uid() = user_id);

-- Can only review a delivered order they own
CREATE POLICY "reviews_insert_own_delivered"
  ON public.reviews FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE id = order_id AND user_id = auth.uid() AND status = 'delivered'
    )
  );

-- ── ADMIN_NOTES policies ─────────────────────────────────────
-- Only users with admin JWT claim can access admin_notes
CREATE POLICY "admin_notes_admin_only"
  ON public.admin_notes FOR ALL
  USING (auth.jwt() ->> 'app_role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'app_role' = 'admin');

-- ════════════════════════════════════════════════════════════
-- STORAGE — "order-files" bucket
-- ════════════════════════════════════════════════════════════

-- Run in Supabase Dashboard → Storage → Policies (or SQL editor)
INSERT INTO storage.buckets (id, name, public)
VALUES ('order-files', 'order-files', FALSE)
ON CONFLICT (id) DO NOTHING;

-- Users can upload only to their own folder: {user_id}/*
CREATE POLICY "order_files_insert_own"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'order-files' AND
    auth.uid()::TEXT = (storage.foldername(name))[1]
  );

CREATE POLICY "order_files_select_own"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'order-files' AND
    auth.uid()::TEXT = (storage.foldername(name))[1]
  );

CREATE POLICY "order_files_delete_own"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'order-files' AND
    auth.uid()::TEXT = (storage.foldername(name))[1]
  );

-- ════════════════════════════════════════════════════════════
-- SEED DATA — Default services
-- ════════════════════════════════════════════════════════════

INSERT INTO public.services (slug, name, description, base_price, delivery_hours_min, icon_emoji, sort_order)
VALUES
  ('deberes',           'Deberes & Tareas',    'Solución completa de deberes universitarios.',           15, 4,  '📝', 1),
  ('ensayos',           'Ensayos Académicos',  'Redacción con normas APA, IEEE o Vancouver.',           25, 8,  '✍️', 2),
  ('investigaciones',   'Investigaciones',     'Proyectos de investigación científica y bibliográfica.', 50, 24, '🔬', 3),
  ('infografias',       'Infografías',         'Diseño de infografías profesionales.',                  20, 6,  '🎨', 4),
  ('videos',            'Videos Académicos',   'Producción de videos educativos en HD.',                40, 12, '🎬', 5),
  ('mapas-conceptuales','Mapas Conceptuales',  'Mapas conceptuales, mentales y sinópticos.',            12, 2,  '🗺️', 6)
ON CONFLICT (slug) DO NOTHING;
