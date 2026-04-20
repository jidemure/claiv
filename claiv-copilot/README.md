# Claiv — AI Internal Knowledge Copilot

> **Industrial-grade RAG infrastructure for mission-critical organizational intelligence.**

Claiv is a high-performance, multi-tenant AI Copilot designed to transform fragmented corporate data into a unified, secure knowledge engine. Built with a focus on **Industrial Precision**, Claiv enforces strict Role-Based Access Control (RBAC) and Row-Level Security (RLS) to ensure that no department's data ever leaks across organizational boundaries.

---

## 💎 The $100K Value Proposition

Claiv isn't just a chat bot. It is an **Enterprise Intelligence Layer**:

1. **Massive ROI**: Autonomously indexes thousands of PDF/DOCX/URL sources, saving up to 40% of employee time spent on internal search.
2. **Strict Compliance**: Full audit logs and departmental silos ensure ISO and SOC2 readiness.
3. **Bring Your Own Key (BYOK)**: Total control over LLM costs and data residency via OpenAI, Anthropic, or Gemini.
4. **Industrial Scale**: Built for logistics, manufacturing, and pharma-scale documentation.

---

## 🚀 Sales Demo Script (10-Minute Walkthrough)

### 1. The Hook (Landing Page)
- **Action**: Open `/landing`.
- **Script**: "Welcome to the future of organizational intelligence. Claiv is designed for the high-stakes environments of logistics and manufacturing. Notice the 'Industrial Precision'—this isn't consumer software; it's infrastructure."

### 2. The Implementation (Onboarding Wizard)
- **Action**: Navigate to `/onboarding`.
- **Script**: "Deployment takes minutes, not months. We define your organizational namespace here, establish RLS boundaries between HR and Engineering, and begin the ingestion of your legacy document clusters."

### 3. The Evidence (ROI Analytics Dashboard)
- **Action**: Go to `/` (Dashboard).
- **Script**: "As an executive, you need to see the proof. In this view, we track exactly how many hours your team is saving. Look at the **Department Adoption**—you can see Engineering is 85% integrated, while Sales is just starting. This is total transparency for your AI investment."
- **Action**: Click "Export Audit Report".
- **Script**: "For your compliance team, we provide one-click audit trails ensuring data isolation is 100% enforced."

### 4. The Utility (Copilot Chat)
- **Action**: Open `/chat`.
- **Script**: "Finally, the user experience. An employee can ask 'What is our remote work policy in the Singapore office?' and get a cited, sourced answer instantly. Only documents they are authorized to see are queried. This is the ultimate internal truth engine."

---

## 🏗️ Technical Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion.
- **Backend**: Supabase (PostgreSQL), pgvector (HNSW Indexing).
- **Security**: Supabase Auth + strict RLS + Next.js Middleware RBAC.
- **RAG**: OpenAI Embeddings + Hybrid Vector/Keyword Search.

---

## ⚙️ Quick Start

1. **Clone & Install**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Copy `.env.example` to `.env.local` and add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OPENAI_API_KEY`

3. **Deploy Database**:
   Run the scripts in `supabase/migrations/` and `supabase/seed.sql` to initialize the Apex Logistics demo environment.

4. **Launch**:
   ```bash
   npm run dev
   ```

---

*Claiv: Built for the ones who build.*
