-- ==============================================================================
-- SCHEMA SYNC - Adding missing columns for Enterprise Features
-- ==============================================================================

-- 1. Organizations: Add slug and settings
ALTER TABLE public.organizations 
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS settings JSONB DEFAULT '{}'::jsonb;

-- 2. Users: Align with seed requirements
-- We'll add metadata if missing or keep it flexible
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- 3. Documents: Add user_id, status, and content_type
ALTER TABLE public.documents 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES public.users(id),
ADD COLUMN IF NOT EXISTS content_type TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- 4. Ingestion Jobs: Add granular tracking fields
ALTER TABLE public.ingestion_jobs 
ADD COLUMN IF NOT EXISTS file_name TEXT,
ADD COLUMN IF NOT EXISTS file_size BIGINT,
ADD COLUMN IF NOT EXISTS total_chunks INTEGER,
ADD COLUMN IF NOT EXISTS error_message TEXT;
