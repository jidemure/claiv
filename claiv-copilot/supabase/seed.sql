-- Claiv Demo Dataset Seed (Manufacturing & Logistics Company)
-- Unified for UUID compatibility, Schema Sync columns, and AUTH.USERS support

-- 0. Insert MOCK entries into auth.users to satisfy foreign key constraints
-- This is essential for local Supabase environments where public.users references auth.users
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, confirmation_token, email_change, email_change_token_new, recovery_token)
VALUES
  ('a1b2c3d4-e5f6-4a5b-bc6d-7e8f9a0b1c2d', '00000000-0000-0000-0000-000000000000', 'ceo@apexlogistics.com', '', now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), 'authenticated', '', '', '', ''),
  ('b2c3d4e5-f6a1-4234-bc6d-7e8f9a0b1c2e', '00000000-0000-0000-0000-000000000000', 'it@apexlogistics.com', '', now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), 'authenticated', '', '', '', ''),
  ('c3d4e5f6-a1b2-4d22-bc6d-7e8f9a0b1c2f', '00000000-0000-0000-0000-000000000000', 'hr-lead@apexlogistics.com', '', now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), 'authenticated', '', '', '', ''),
  ('d4e5f6a1-b2c3-4e6c-bc6d-7e8f9a0b1c20', '00000000-0000-0000-0000-000000000000', 'eng1@apexlogistics.com', '', now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), 'authenticated', '', '', '', '')
ON CONFLICT (id) DO NOTHING;

-- 1. Insert Demo Organizations
INSERT INTO public.organizations (id, name, slug, settings)
VALUES
  ('73e27a6c-4824-4fc4-bc8c-02e3b8a1c8b3', 'Apex Logistics & Manufacturing', 'apex-logistics', '{"theme": "dark", "default_model": "text-embedding-3-small"}')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, slug = EXCLUDED.slug, settings = EXCLUDED.settings;

-- 2. Insert Demo Users into Public (Referencing the auth.users IDs above)
INSERT INTO public.users (id, org_id, full_name, role, department, metadata)
VALUES
  ('a1b2c3d4-e5f6-4a5b-bc6d-7e8f9a0b1c2d', '73e27a6c-4824-4fc4-bc8c-02e3b8a1c8b3', 'Alex Chen', 'super_admin', 'Executive', '{"email": "ceo@apexlogistics.com"}'),
  ('b2c3d4e5-f6a1-4234-bc6d-7e8f9a0b1c2e', '73e27a6c-4824-4fc4-bc8c-02e3b8a1c8b3', 'Sarah Jenkins', 'admin', 'IT', '{"email": "it@apexlogistics.com"}'),
  ('c3d4e5f6-a1b2-4d22-bc6d-7e8f9a0b1c2f', '73e27a6c-4824-4fc4-bc8c-02e3b8a1c8b3', 'David Kim', 'dept_manager', 'HR', '{"email": "hr-lead@apexlogistics.com"}'),
  ('d4e5f6a1-b2c3-4e6c-bc6d-7e8f9a0b1c20', '73e27a6c-4824-4fc4-bc8c-02e3b8a1c8b3', 'Emma Watson', 'employee', 'Engineering', '{"email": "eng1@apexlogistics.com"}')
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, role = EXCLUDED.role, department = EXCLUDED.department, metadata = EXCLUDED.metadata;

-- 3. Insert Demo Documents
INSERT INTO public.documents (id, org_id, user_id, title, content_type, source_url, metadata, status, department)
VALUES
  ('d1f5e8b2-1a4c-4e5a-8b8b-123456789abc', '73e27a6c-4824-4fc4-bc8c-02e3b8a1c8b3', 'c3d4e5f6-a1b2-4d22-bc6d-7e8f9a0b1c2f', 'Remote Work Policy Guidelines', 'application/pdf', 'gs://apex/hr/remote_work.pdf', '{"tags": ["HR", "Policy"]}', 'indexed', 'HR'),
  ('d2f5e8b2-1a4c-4e5a-8b8b-123456789abc', '73e27a6c-4824-4fc4-bc8c-02e3b8a1c8b3', 'a1b2c3d4-e5f6-4a5b-bc6d-7e8f9a0b1c2d', 'Q3 OKRs & Planning 2026', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'gs://apex/eng/q3_okrs.docx', '{"tags": ["Engineering", "OKRs"]}', 'indexed', 'Engineering'),
  ('d3f5e8b2-1a4c-4e5a-8b8b-123456789abc', '73e27a6c-4824-4fc4-bc8c-02e3b8a1c8b3', 'b2c3d4e5-f6a1-4234-bc6d-7e8f9a0b1c2e', 'Salix Design System Overview', 'text/markdown', 'gs://apex/design/salix_overview.md', '{"tags": ["Design", "System"]}', 'indexed', 'Global')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, content_type = EXCLUDED.content_type, status = EXCLUDED.status;

-- 4. Ingestion Jobs
INSERT INTO public.ingestion_jobs (id, org_id, status, file_name, file_size, total_chunks, error_message)
VALUES
  ('00000000-0000-0000-0000-000000000001', '73e27a6c-4824-4fc4-bc8c-02e3b8a1c8b3', 'completed', 'Salix Design System Overview', 1024, 45, NULL),
  ('00000000-0000-0000-0000-000000000002', '73e27a6c-4824-4fc4-bc8c-02e3b8a1c8b3', 'completed', 'Remote Work Policy Guidelines', 2048, 15, NULL)
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status, file_name = EXCLUDED.file_name;
