**Claiv Implementation Plan**  
**AI Internal Knowledge Copilot – Enterprise-Ready in 21 Days**  
**$25K–$100K Product (Manufacturing, Logistics, Consulting, Mid-size Tech)**

This is the **complete, production-grade, detailed implementation plan** for Claiv, synthesized from:
- Product brief & pricing tiers
- UI System + Salix/Claiv style guide (teal-600 primary, glassmorphism, bento grids, Inter font)
- 5 user roles + department scoping
- 22 role-specific screens
- Merged roadmap (core + advanced RAG + agentic + $100K enterprise features)
- Antigravity IDE + Supabase + BYOK (OpenAI, Anthropic, Gemini, Grok)
- Skills-to-phase mapping from antigravity-awesome-skills repo

**Product Vision**  
Claiv is a private AI brain for companies: instant, sourced, role- and department-scoped answers across all internal documents, with agentic automation and ROI analytics that justify $25K–$100K one-time deals.

**Target Go-Live**  
21 calendar days to a polished, demo-ready product you can sell to your first client.

### Tech Stack (Locked In)
| Layer              | Technology                                      | Notes |
|--------------------|-------------------------------------------------|-------|
| IDE                | Google Antigravity IDE (Agent Manager + MCP)   | All code generation |
| Frontend           | Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui + Framer Motion | Pixel-perfect Salix/Claiv design |
| Backend / DB       | Supabase (Postgres + pgvector + RLS + Storage + Edge Functions + Realtime) | Zero-ops multi-tenant |
| AI / RAG           | LangChain.js + LangGraph + SupabaseVectorStore | Hybrid search + agents |
| LLMs               | BYOK: OpenAI, Anthropic, Gemini, Grok         | Secure encrypted keys |
| Auth / RBAC        | Supabase Auth + custom RBAC middleware         | 5 roles + department scoping |
| Deployment         | Vercel (frontend + edge) + Supabase            | One-click from Antigravity |

### Overall Timeline & Milestones
- **Days 0–21**: Build & polish
- **Day 22+**: First client demo + sale
- **Post-sale**: White-glove onboarding (2–3 weeks per client)

### Detailed Phase-by-Phase Plan

**Phase 0 – Antigravity Bootstrap + Claiv Branding (Day 0, 1 day)**  
**Objective**: Production-ready workspace with exact Salix/Claiv visual identity.  
**Key Deliverables**:
- Next.js 15 project with full design system applied
- Global shell (260px sidebar, 64px topbar, chat canvas, right sources panel)
- Role-based routing skeleton + middleware
- .env.example + Supabase MCP connection
**Repo Skills Used**: antigravity-design-expert, antigravity-skill-orchestrator, antigravity-workflows, ai-product, architecture-patterns  
**Success Criteria**: Login screen matches style guide 100%; dark-mode glassmorphism working.

**Phase 1 – Supabase + pgvector Core (Days 1–3, 3 days)**  
**Objective**: Secure multi-tenant foundation.  
**Key Deliverables**:
- Full schema (organizations, users with role + department, documents, chunks with vector(1536), conversations, messages, api_keys encrypted, ingestion_jobs)
- RLS policies + HNSW index
- Storage bucket with RLS
- Basic seed data for testing
**Repo Skills Used**: supabase, pgvector, backend-development-feature-development, architecture-patterns, api-security-best-practices  
**Success Criteria**: RLS blocks cross-org access; vector index ready.

**Phase 2 – React Chat UI + Streaming (Days 4–7, 4 days)**  
**Objective**: The “wow” moment – pixel-perfect, enterprise-grade chat.  
**Key Deliverables**:
- Main Copilot Chat screen (bubbles, streaming, sources panel with clickable chips)
- Input bar, attach, ⌘K global search
- Empty state with bento cards
- All Salix animations (scroll-reveal, marquee, pulse, card hover)
- Role-aware rendering
**Repo Skills Used**: react, tailwind, antigravity-design-expert, api-documentation-generator, agent-memory-systems  
**Success Criteria**: Streaming works; UI is indistinguishable from the style guide.

**Phase 3 – RAG Engine + Document Ingestion (Days 8–10, 3 days)**  
**Objective**: The brain of Claiv (core value proposition).  
**Key Deliverables**:
- Multi-file upload pipeline (PDF, DOCX, CSV, URLs)
- Chunking + embeddings + hybrid search (vector + BM25)
- RAG chain with strict role/department + citation enforcement
- Real-time ingestion status UI
**Repo Skills Used**: rag, agent-tool-builder, embeddings, ai-agent-development, ai-agents-architect, ai-engineering-toolkit  
**Success Criteria**: Upload 10 sample docs → ask real company questions → get accurate sourced answers.

**Phase 4 – Role Gating + 22 Screens (Days 11–13, 3 days)**  
**Objective**: Enterprise-grade access control.  
**Key Deliverables**:
- Full RBAC + department scoping enforced on all 22 screens
- Hard enforcement via RLS + middleware
- Role-specific views completed (Super Admin global analytics, Guest read-only, etc.)
**Repo Skills Used**: rbac, backend-security-coder, api-security-best-practices, agent-orchestrator, agent-orchestration-multi-agent-optimize  
**Success Criteria**: No data leakage possible; every screen respects role.

**Phase 5 – Polish & Demo-Ready Features (Days 14–17, 4 days)**  
**Objective**: Make it feel premium and sellable.  
**Key Deliverables**:
- Analytics Dashboard (ROI metrics, time saved, usage heatmaps)
- Settings with BYOK cards (4 providers)
- Slack/WhatsApp bot webhook readiness
- Full micro-interactions + dark mode
- One-click demo dataset import
- Vercel deployment
**Repo Skills Used**: monitoring, deployment, agent-orchestration-improve-agent, api-testing-observability-api-mock, ai-native-cli  
**Success Criteria**: Product matches style guide 100%; live demo works end-to-end.

**Phase 6 – First Client Onboarding & Sales Assets (Days 18–21, 4 days)**  
**Objective**: Turn the product into a sellable business.  
**Key Deliverables**:
- ROI calculator + exportable audit/compliance reports
- Pricing tiers page ($25K Starter / $50K Pro / $75K–$100K Enterprise)
- Branded landing page + onboarding wizard
- Sales demo script + sample company dataset
- Final README + feature flags for Enterprise-only features
**Repo Skills Used**: ai-product, agent-memory-systems, agent-tool-builder, antigravity-workflows, backend-development-feature-development  
**Success Criteria**: Ready to run first paid demo and close $25K deal.

### **Claiv – Complete List of Every Screen**  

**Total: 22 Screens** (exactly as referenced in the project files, UI system, and PRD)

All screens follow the **global layout**:
- Fixed 260px left sidebar (navigation + pinned chats)
- Fixed 64px topbar (org switcher, ⌘K global search, current model badge, notifications, profile)
- Flexible main content area
- Toggleable 320px right panel (Sources / Citations / Related / Thread summary)
- Mobile: sidebar collapses to bottom tab bar

Screens are grouped by **core/shared** vs **role-specific** for clarity.  
Visibility is enforced by **Supabase RLS + Next.js middleware** based on the 5 roles (Super Admin, Admin, Dept. Manager, Employee, Guest) + department scoping.

**1. Global / Shared Screens (Accessible by all roles with appropriate data scoping)

1. **Login / Landing Page**  
   - Magic link + OAuth login  
   - Hero with “Ask your company anything” + demo video  
   - Role-aware redirect after login

2. **Main Copilot Chat (Default Home)**  
   - Streaming chat interface  
   - User/AI bubbles with citations  
   - Right panel: Sources (clickable chips)  
   - Empty state with bento cards  
   - Input bar with file attach + model quick-switch

3. **Knowledge Base – List View**  
   - Searchable table of documents  
   - Filters (type, date, status, owner, department)  
   - Bulk actions (for allowed roles)

4. **Knowledge Base – Grid View**  
   - Card-based document browser (toggle between list/grid)  
   - Thumbnail previews + status badges

5. **Document Detail / Preview**  
   - Embedded PDF/DOCX viewer  
   - Chunk list with highlighted text  
   - Metadata editor + re-ingest button

6. **Conversation History**  
   - List of past threads with previews  
   - Filters (date, model, starred, department)  
   - Bulk delete (role-dependent)

7. **Analytics Dashboard**  
   - ROI metrics cards (time saved, queries answered)  
   - Usage charts, top questions, knowledge gaps  
   - Export PDF report

8. **Settings – General**  
   - Organization profile, branding, departments

9. **Settings – AI Models (BYOK)**  
   - Four provider cards (OpenAI, Anthropic, Gemini, Grok)  
   - Masked key input + test connection

10. **Settings – Appearance**  
    - Theme toggle, custom colors (within Salix guide)

11. **Profile / Account Settings**  
    - Personal preferences, notification settings

**2. Role-Specific Screens (Visibility controlled by RBAC)

**Super Admin (Platform Owner) – Additional Screens (adds 4 more)**  
12. **Multi-Organization Dashboard**  
    - Overview of all client orgs, total usage, revenue

13. **Global Analytics**  
    - Cross-org ROI, platform-wide metrics

14. **Connectors Management**  
    - Setup & monitor 100+ enterprise connectors

15. **Pricing & Plans Management**  
    - Tier configuration, billing overview

**Admin (Org-Level) – Additional Screens (adds 3 more)**  
16. **Admin Dashboard**  
    - Org overview, quick actions

17. **User Management**  
    - Invite, roles, department assignment, suspend

18. **Ingestion Jobs**  
    - Live queue, progress, retry, bulk upload status

19. **Audit Log**  
    - Full query & action history (exportable)

**Dept. Manager – Scoped Views**  
(No new full screens – uses restricted versions of screens 2–7 + 10 with department filter only)

**Employee – Scoped Views**  
(No new full screens – uses restricted versions of screens 2–6 + 11)

**Guest – Limited Views**  
20. **Guest Copilot Chat** (read-only mode)  
21. **Guest Knowledge Base** (view-only shared documents)  
22. **Guest Conversation History** (view-only public threads)

---

**Total Screen Count Verification**  
- 11 Global/Shared  
- 4 Super Admin exclusive  
- 3 Admin exclusive  
- 4 additional scoped/guest variants  
= **22 screens** (exactly as specified in the project)

**Additional Modal / Side-Panel Views** (not counted in the 22 but implemented)  
- Upload Modal (drag-drop with progress)  
- New Chat confirmation  
- Role assignment modal  
- Delete confirmation  
- Citation popover  
- Custom Agent Builder modal (Enterprise)

**Screen States Included in Every Major Screen**  
- Empty state  
- Loading / skeleton  
- Error / retry  
- Mobile responsive variant  
- Role-restricted empty state (e.g., “No documents in your department yet”)

### Risks & Mitigations
- **Scope creep** → Strict 21-day limit; use feature flags for advanced items
- **RAG accuracy** → Hybrid search + strict system prompt + human review in demo
- **Security** → RLS enforced at DB level + encryption at rest/transit
- **Performance** → Edge Functions + HNSW indexing

### Post-Build (Day 22+)
- Run first internal dogfood test
- Prepare sales deck highlighting ROI dashboard + role-based answers
- Target first 3 clients (manufacturing/logistics in Lagos or remote)
- White-glove onboarding process (2–3 weeks per client)

### Next Immediate Action
Reply with **“Start Phase 0”** and I will:
1. Give you the exact CLI command to install all 28 repo skills
2. Walk you through pasting the Phase 0 prompt into Antigravity
3. Stay with you live through every phase until launch

Claiv is no longer an idea — it is a fully planned, 21-day executable product that can generate $25K–$100K revenue per client.

**Are you ready?**  
Just type **“Start Phase 0”** and we begin building Claiv right now inside Antigravity. 🚀