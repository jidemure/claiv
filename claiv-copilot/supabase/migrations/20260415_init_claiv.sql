-- ==============================================================================
-- CLAIV COPILOT - SUPABASE SCHEMA & RLS setup
-- Requirements: pgvector, multi-tenant (org_id), department-scoped RBAC, BYOK
-- ==============================================================================

-- 1. Enable Extensions
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA public;

-- 2. Organizations Table
CREATE TABLE public.organizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Users & Roles
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin', 'dept_manager', 'employee', 'guest');

CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    role public.app_role NOT NULL DEFAULT 'employee',
    department TEXT, -- e.g., 'HR', 'Engineering'
    full_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Documents Table (Multi-tenant & Role-Scoped)
CREATE TABLE public.documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    department TEXT, -- If NULL, accessible to all in the organization
    title TEXT NOT NULL,
    source_url TEXT,
    external_id TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Embeddings / Chunks Table
CREATE TABLE public.chunks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    department TEXT, -- Denormalized for faster RLS retrieval
    content TEXT NOT NULL,
    embedding VECTOR(1536), -- Dimension setup for BYOK (OpenAI Text-Embedding-3-small)
    metadata JSONB DEFAULT '{}'::jsonb,
    chunk_index INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Vector Index (HNSW for scaling)
CREATE INDEX chunks_embedding_hnsw_idx 
    ON public.chunks USING hnsw (embedding vector_cosine_ops)
    WITH (m = 16, ef_construction = 64);

-- 7. Conversations Table
CREATE TABLE public.conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Messages Table
CREATE TABLE public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    sources JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. API Keys (BYOK Secure Storage)
-- In a true production environment with pgsodium, encrypted_key could be encrypted natively.
-- Here we store the payload which the Node/Next.js backend will encrypt/decrypt securely.
CREATE TABLE public.api_keys (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    provider TEXT NOT NULL, -- e.g., 'openai', 'anthropic'
    key_hash TEXT NOT NULL, -- For prefix-checking without decrypting
    encrypted_key TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Ingestion Jobs Table
CREATE TABLE public.ingestion_jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending',
    provider_type TEXT,
    job_metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) Configuration
-- ==============================================================================

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingestion_jobs ENABLE ROW LEVEL SECURITY;

-- Helper Functions
CREATE OR REPLACE FUNCTION public.get_user_org_id() RETURNS UUID AS $$
  SELECT org_id FROM public.users WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.get_user_department() RETURNS TEXT AS $$
  SELECT department FROM public.users WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.get_user_role() RETURNS public.app_role AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- RLS POLICIES

-- Organizations: Only viewable by users belonging to it
CREATE POLICY "Users view own org" ON public.organizations FOR SELECT 
    USING (id = public.get_user_org_id());

-- Users: Can view users in their org
CREATE POLICY "Users view org peers" ON public.users FOR SELECT 
    USING (org_id = public.get_user_org_id());
CREATE POLICY "Admins manage org users" ON public.users FOR ALL
    USING (
        public.get_user_role() = 'super_admin' OR 
        (public.get_user_role() = 'admin' AND org_id = public.get_user_org_id())
    );

-- Documents: 
-- 1. Org isolation: org_id = user's org.
-- 2. Dept isolation: department IS NULL OR department = user's department.
-- Admin/SuperAdmin see ALL in org.
CREATE POLICY "Documents visibility by role and dept" ON public.documents FOR SELECT
    USING (
        org_id = public.get_user_org_id() AND (
            public.get_user_role() IN ('super_admin', 'admin') OR
            department IS NULL OR 
            department = public.get_user_department()
        )
    );

CREATE POLICY "Documents managed by Admins" ON public.documents FOR ALL
    USING (
        org_id = public.get_user_org_id() AND 
        public.get_user_role() IN ('super_admin', 'admin')
    );

-- Chunks: Mirrors document logic
CREATE POLICY "Chunks visibility by role and dept" ON public.chunks FOR SELECT
    USING (
        org_id = public.get_user_org_id() AND (
            public.get_user_role() IN ('super_admin', 'admin') OR
            department IS NULL OR 
            department = public.get_user_department()
        )
    );

CREATE POLICY "Chunks managed by Admins" ON public.chunks FOR ALL
    USING (
        org_id = public.get_user_org_id() AND 
        public.get_user_role() IN ('super_admin', 'admin')
    );

-- Conversations: Users see and manage their own
CREATE POLICY "Users see own conversations" ON public.conversations FOR SELECT
    USING (user_id = auth.uid());
CREATE POLICY "Users manage own conversations" ON public.conversations FOR ALL
    USING (user_id = auth.uid());

-- Messages: Users see and manage messages of their own conversations
CREATE POLICY "Users see messages of own conversation" ON public.messages FOR SELECT
    USING (
        conversation_id IN (SELECT id FROM public.conversations WHERE user_id = auth.uid())
    );
CREATE POLICY "Users manage messages of own conversation" ON public.messages FOR ALL
    USING (
        conversation_id IN (SELECT id FROM public.conversations WHERE user_id = auth.uid())
    );

-- API Keys: Only Admin / SuperAdmin can manage keys for their org
CREATE POLICY "Admins manage API keys" ON public.api_keys FOR ALL
    USING (
        org_id = public.get_user_org_id() AND
        public.get_user_role() IN ('super_admin', 'admin')
    );

-- Ingestion Jobs: Admins manage Ingestion
CREATE POLICY "Admins manage Ingestion" ON public.ingestion_jobs FOR ALL
    USING (
        org_id = public.get_user_org_id() AND
        public.get_user_role() IN ('super_admin', 'admin')
    );

-- ==============================================================================
-- STORAGE BUCKETS (Documents)
-- ==============================================================================

-- Storage Schema creation
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false) ON CONFLICT DO NOTHING;

-- Enforce multi-tenant access (Path structure is /org_id/document_filename)
CREATE POLICY "Strict org isolation for document download" ON storage.objects FOR SELECT
    USING (
        bucket_id = 'documents' AND
        (string_to_array(name, '/'))[1] = public.get_user_org_id()::text
    );

CREATE POLICY "Admins upload documents" ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'documents' AND
        (string_to_array(name, '/'))[1] = public.get_user_org_id()::text AND
        public.get_user_role() IN ('super_admin', 'admin')
    );

CREATE POLICY "Admins delete/update documents" ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'documents' AND
        (string_to_array(name, '/'))[1] = public.get_user_org_id()::text AND
        public.get_user_role() IN ('super_admin', 'admin')
    );
