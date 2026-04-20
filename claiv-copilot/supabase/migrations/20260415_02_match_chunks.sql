-- ==============================================================================
-- CLAIV COPILOT - RAG VECTOR SEARCH RPC
-- ==============================================================================

-- Function to match chunks based on vector cosine similarity, enforcing RLS indirectly
-- since it executes with the caller's privileges (auth.uid()).
CREATE OR REPLACE FUNCTION public.match_chunks(
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT,
  filter_department TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  document_id UUID,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.document_id,
    c.content,
    c.metadata,
    1 - (c.embedding <=> query_embedding) AS similarity
  FROM public.chunks c
  -- Ensure the user inherently has access via RLS by standard SELECT
  -- Department filtering is applied manually if requested, but inherently 
  -- the RLS policies already prevent unauthorized departments from appearing.
  WHERE 1 - (c.embedding <=> query_embedding) > match_threshold
    AND (filter_department IS NULL OR c.department = filter_department)
  ORDER BY c.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
