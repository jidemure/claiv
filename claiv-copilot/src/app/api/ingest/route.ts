import { NextResponse } from 'next/server';
import { processDocument } from '@/lib/rag/pipeline';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const department = formData.get('department') as string | null;
    
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // In a real application, orgId is extracted via session/middleware.
    const mockOrgId = '00000000-0000-0000-0000-000000000000'; // Mock UUID

    // Call the unified RAG pipeline module
    const result = await processDocument(buffer, file.name, mockOrgId, department || null);

    if (result.status === 'success') {
      return NextResponse.json({ 
        message: 'File successfully ingested', 
        docId: result.docId, 
        chunks: result.chunksIngested 
      });
    }

    return NextResponse.json({ error: 'Ingestion pipeline failed' }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
