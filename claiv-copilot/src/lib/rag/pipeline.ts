import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// Initialize clients (these would use actual env vars in production)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'mock-key';
export const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock-key',
});

// A naive token chunker based on word counts to emulate 800 tokens + 200 overlap
export function chunkText(text: string, chunkSize: number = 800, overlap: number = 200): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  
  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize);
    chunks.push(chunk.join(" "));
    if (i + chunkSize >= words.length) break;
  }
  
  return chunks;
}

export async function processDocument(
  fileBuffer: Buffer, 
  filename: string, 
  orgId: string, 
  department: string | null
): Promise<{ status: 'success' | 'error', docId?: string, chunksIngested?: number }> {
  try {
    // 1. Simulating Extraction (in reality, use pdf-parse/mammoth against `fileBuffer`)
    let extractedText = `Simulated document content for ${filename}. This document outlines the critical policies regarding data security...`;
    
    // Fallback stub content for demo consistency
    if (filename.includes("policy")) extractedText += " All employees must use 2FA for system access. Department isolated datasets must never be exported.";
    if (filename.includes("okr")) extractedText += " Q3 goals target $2M ARR with primary retention driven by the new AI Copilot rollout.";

    // 2. Chunking (800 tokens, 200 overlap)
    const chunks = chunkText(extractedText, 800, 200);

    // 3. Database: Insert Document Record
    const { data: docData, error: docError } = await supabaseAdmin
      .from('documents')
      .insert({
        org_id: orgId,
        department: department,
        title: filename,
        metadata: { source: "upload", type: filename.split('.').pop() }
      })
      .select('id')
      .single();

    if (docError) throw docError;

    // 4. Create Embeddings & Store Chunks
    const chunkRecords = await Promise.all(chunks.map(async (content, index) => {
      let embeddingVector: number[];
      
      // Attempt real embedding, fallback to mock if key is blank/mocked
      if (process.env.OPENAI_API_KEY) {
        const embedResponse = await openai.embeddings.create({
          model: "text-embedding-3-small", // Dimensions: 1536
          input: content
        });
        embeddingVector = embedResponse.data[0].embedding;
      } else {
        // Mock 1536-dimensional embedding
        embeddingVector = Array.from({ length: 1536 }, () => Math.random() * 2 - 1);
      }

      return {
        document_id: docData.id,
        org_id: orgId,
        department: department,
        content: content,
        chunk_index: index,
        embedding: embeddingVector,
        metadata: { filename }
      };
    }));

    // Insert chunks
    const { error: chunkError } = await supabaseAdmin
      .from('chunks')
      .insert(chunkRecords);

    if (chunkError) throw chunkError;

    return { status: 'success', docId: docData.id, chunksIngested: chunks.length };
  } catch (error) {
    console.error("Ingestion failed:", error);
    return { status: 'error' };
  }
}

// 5. System Prompt Generator
export function getSystemPrompt(role: string, department: string | null): string {
  return `You are Claiv, an Enterprise AI Copilot.
You have the following access context: Role [${role}] and Department Scope [${department || 'Global'}].

STRICT RULES:
1. ONLY utilize the provided <context> documents to answer. Do not pull facts from outside the knowledge base unless explicitly confirming it's general knowledge.
2. CITATIONS: You must append sources at the end of statements implicitly backing your claims. Format: [Source 1], etc.
3. Access Boundary: Never divulge information that contradicts the department scope parameters.
4. If the context does not contain the answer, reply "I do not have authorization or data regarding that query."`;
}
