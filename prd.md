**Claiv Product Requirements Document (PRD)**  
**AI Internal Knowledge Copilot**  
**Version 1.0 – April 2026**  
**Prepared for: Antigravity IDE + Supabase Build**  
**Target Revenue: $25K–$100K per client (one-time enterprise deals)**

---

### 1. Product Overview & Vision

**Product Name**  
Claiv – Private AI Brain for Your Company

**Tagline**  
“Ask your company anything. Get instant, sourced, role-aware answers.”

**Vision**  
Claiv is an internal, secure, agentic RAG platform that eliminates knowledge fragmentation across documents, Slack, Drive, emails, and SOPs. It delivers accurate, citation-grounded answers while automatically respecting user roles and departments. It moves from “chatbot” to “autonomous teammate” with multi-agent orchestration, proactive insights, and ROI analytics that justify six-figure deals.

**Core Value Proposition**  
- Employees waste hours searching → Claiv answers in seconds with sources.  
- New hires ramp slowly → Claiv accelerates onboarding.  
- Knowledge is siloed → Claiv creates a living, permission-aware company brain.  
- Leadership can’t measure ROI → Claiv proves time saved and productivity gains.

**Differentiation**  
- Role- & department-scoped answers (HR sees only HR, Engineers see technical docs)  
- Enterprise-grade security & auditability  
- Built-in ROI dashboard that sells the product  
- BYOK + multi-LLM + agentic capabilities (not just basic RAG)

---

### 2. Business Objectives & Success Metrics

**Primary Goals**  
- Close first $25K–$100K client within 60 days of launch  
- Achieve SOC2-ready compliance for enterprise sales  
- Deliver measurable ROI (target: 40+ hours saved per employee per month)  

**Key KPIs**  
- **Product**: 95%+ answer accuracy with citations, <2s first-token latency  
- **Adoption**: 80% of users active weekly, 70% of queries answered without follow-up  
- **Business**: Average deal size $50K+, 3 clients in first 90 days, positive NPS >70  
- **Analytics Tracked**: Queries answered, time saved (estimated), most-asked topics, knowledge gaps

---

### 3. Target Users & Personas

**Core Segments**  
- Mid-size manufacturing, logistics, consulting, and tech companies (50–500 employees)  
- Departments: HR, Engineering, Operations, Finance, Legal  

**User Roles (5 Core Roles + Department Scoping)**  
1. **Super Admin** – Platform owner (multi-org management)  
2. **Admin** – Org-level admin (users, knowledge, analytics)  
3. **Dept. Manager** – Department head (team oversight, scoped data)  
4. **Employee** – Standard team member (department-scoped access)  
5. **Guest** – Limited read-only (shared/public knowledge only)  

Department scoping examples: HR, Engineering, Finance, Operations, Sales, Legal.

---

### 4. Key Features & Prioritization

**MVP (Must-Have – Phases 0–3)**  
- Universal knowledge search (RAG over PDFs, DOCX, CSVs, URLs, Notion exports)  
- Document ingestion & chunking pipeline  
- Streaming chat interface with sources panel  
- Role- & department-based answer scoping  
- Basic analytics (queries, usage)  
- BYOK for OpenAI, Anthropic, Gemini, Grok  

**Phase 2 Features (High Value – Phases 4–5)**  
- Hybrid search (vector + BM25) + reranking  
- Multi-agent orchestration (Planner + Retriever + Validator + Executor)  
- Real-time ingestion status  
- Slack/WhatsApp bot webhook  
- Advanced RBAC + audit log  

**Enterprise Differentiators ($100K Tier – Phase 6+)**  
- 100+ connectors (M365, Google Workspace, Jira, Notion, Salesforce)  
- Custom no-code agent builder  
- ROI dashboard with time-saved calculator & exportable reports  
- SSO/SCIM provisioning  
- Data residency & VPC options  
- Proactive insights & knowledge-gap detection  
- White-label / embeddable mode  

---

### 5. User Flows & Screens (22 Role-Specific Screens)

**Global Layout** (All screens)  
- 260px left sidebar (Ask Claiv, Documents, Analytics, Settings, Admin)  
- 64px topbar (org switcher, global search ⌘K, model badge, profile)  
- Main content + toggleable right sources panel  

**Core Screens (Implemented for all roles with visibility rules)**  
1. **Login / Landing**  
2. **Main Copilot Chat** (streaming + sources + bento empty state)  
3. **Knowledge Base / Documents** (upload table/grid, drag-drop)  
4. **Conversation History**  
5. **Analytics Dashboard** (ROI metrics, charts)  
6. **Admin / Settings** (BYOK, users, roles, departments)  

**Role-Specific Visibility** (22 total screens when expanded)  
- Super Admin: Global analytics, multi-org dashboard, connectors, billing  
- Admin: Full org management, ingestion jobs, audit log  
- Dept. Manager: Department metrics + team management  
- Employee: Personal chat + history + scoped knowledge  
- Guest: Read-only chat + public documents  

All screens follow Salix/Claiv style guide (teal-600 primary, glassmorphism cards, Inter typography, 8px grid, scroll-reveal animations, pulse dots, bento grids).

---

### 6. Technical Requirements

**Architecture**  
- Multi-tenant (org_id + RLS everywhere)  
- RAG pipeline: chunk → embed → SupabaseVectorStore (hybrid search)  
- Secure BYOK key storage (encrypted in Supabase)  
- LangGraph for multi-agent flows  
- Real-time updates via Supabase Realtime  

**Non-Functional Requirements**  
- **Security**: SOC2-ready (encryption at rest/transit, audit log, PII redaction)  
- **Performance**: <2s first token, <500ms retrieval  
- **Scalability**: 500+ concurrent users per org  
- **Accessibility**: WCAG 2.2 AA  
- **Availability**: 99.9% uptime target  

---

### 7. Pricing & Packaging

| Tier         | Price (One-Time) | Target Customers          | Key Features Included                     |
|--------------|------------------|---------------------------|-------------------------------------------|
| Starter      | $25,000         | Small teams               | Basic RAG, 500 docs, 2 departments        |
| Pro          | $50,000         | Growing companies         | Unlimited docs, 5 departments, analytics  |
| Enterprise   | $75K–$100K+     | Mid-market + enterprise   | Connectors, agents, SSO/SCIM, dedicated   |

Annual billing discount available. Custom SLAs for Enterprise.

---

### 8. Assumptions, Dependencies & Risks

**Assumptions**  
- Access to Antigravity IDE with MCP for Supabase  
- Client provides sample documents for demo  
- BYOK model APIs remain available  

**Dependencies**  
- Supabase project + pgvector enabled  
- Antigravity-awesome-skills repo (28 mapped skills)  

**Risks & Mitigations**  
- RAG hallucination → Strict system prompt + citation enforcement + hybrid search  
- Scope creep → Strict 21-day phase gates  
- Security review failure → RLS + encryption from day 1  

---

### 9. Phased Delivery Roadmap (21 Days)

**Phase 0** – Bootstrap + Branding (Day 0)  
**Phase 1** – Supabase + pgvector Core (Days 1–3)  
**Phase 2** – React Chat UI + Streaming (Days 4–7)  
**Phase 3** – RAG Engine + Ingestion (Days 8–10)  
**Phase 4** – RBAC + 22 Screens (Days 11–13)  
**Phase 5** – Polish + Demo Features (Days 14–17)  
**Phase 6** – Onboarding + Sales Assets (Days 18–21)  

Full detailed build sequence and Antigravity prompts already prepared.

---

### 10. Appendices

- **Style Guide Reference**: Salix/Claiv (teal-600 primary, glassmorphism, bento grids, pulse animations) – full HTML/CSS provided  
- **Skills Map**: 22 core skills across 6 disciplines (Design, Frontend, Backend, AI/ML, Product/Business, DevOps/Security)  
- **Repo Skills Integration**: 28 pre-built Antigravity skills already mapped to phases  
- **Demo Dataset**: Sample manufacturing/logistics company documents (to be created in Phase 6)

---

**Approval & Next Steps**  
This PRD is ready for immediate execution in Antigravity IDE.