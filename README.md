# 💠 Claiv — Private AI Brain for Your Company

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Enterprise Ready](https://img.shields.io/badge/Enterprise-Ready-teal.svg)](#)

> **"Ask your company anything. Get instant, sourced, role-aware answers."**

Claiv is an internal, secure, agentic RAG (Retrieval-Augmented Generation) platform designed to eliminate knowledge fragmentation across documents, emails, and SOPs. It delivers accurate, citation-grounded answers while automatically respecting user roles and departments.

---

## ✨ Features

- 🧠 **Agentic RAG Engine**: Multi-agent orchestration (Planner + Retriever + Validator) for high-accuracy answers.
- 🔐 **Enterprise-Grade RBAC**: 5 core roles with granular department scoping and Row-Level Security (RLS).
- 📂 **Universal Knowledge Base**: Seamless ingestion of PDFs, DOCX, CSVs, and URLs with a live status tracker.
- 📊 **ROI Analytics Dashboard**: Real-time tracking of time saved, query volume, and knowledge gaps.
- 🔌 **BYOK (Bring Your Own Key)**: Support for OpenAI, Anthropic, Gemini, and Grok with encrypted key storage.
- 💎 **Industrial Precision Design**: Premium "Salix" aesthetic with glassmorphism, bento grids, and smooth animations.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), TypeScript, Tailwind CSS, Framer Motion.
- **Backend / Database**: [Supabase](https://supabase.com/) (Postgres + `pgvector` + RLS + Edge Functions).
- **AI Framework**: [LangChain.js](https://js.langchain.com/) & [LangGraph](https://langchain-ai.github.io/langgraphjs/).
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + Custom Design Tokens.

---

## 📁 Project Structure

```text
claiv/
├── claiv-copilot/          # Core Next.js 15 Application
│   ├── src/
│   │   ├── app/            # App Router (Pages & API Routes)
│   │   ├── components/     # UI & Feature components
│   │   ├── lib/            # RAG Pipeline, Auth & Helpers
│   │   └── supabase/       # Migrations & Seed scripts
│   └── public/             # Static assets
├── skills/                 # Custom AI Agent Skills
├── prd.md                  # Product Requirements Document
├── plan.md                 # 21-Day Implementation Roadmap
└── .gitignore              # Project-wide ignore rules
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Supabase CLI
- API Keys for your preferred LLM provider (OpenAI, Anthropic, etc.)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jidemure/claiv.git
   cd claiv/claiv-copilot
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Copy `.env.example` to `.env.local` and fill in your Supabase and LLM credentials.
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## 🗺️ Roadmap (21 Days to Launch)

- [x] **Phase 0**: Bootstrap + Branding (Salix UI System)
- [x] **Phase 1**: Supabase + `pgvector` Core (RLS & Schema)
- [x] **Phase 2**: React Chat UI + Streaming
- [ ] **Phase 3**: RAG Engine + Ingestion Pipeline (In Progress)
- [ ] **Phase 4**: Role Gating + 22 Screens
- [ ] **Phase 5**: ROI Dashboard & Polish
- [ ] **Phase 6**: Sales Assets & Launch

---

## 🎨 Design System

Claiv follows the **Salix "Industrial Precision"** style guide:
- **Primary Color**: `teal-600`
- **Backgrounds**: Tonal surfaces with subtle gradients.
- **Typography**: Inter (Modern, geometric).
- **Components**: Glassmorphism cards with inner-border highlights and bento-grid layouts.

---

## 🛡️ License

Private / Enterprise License. See `LICENSE` for details (Available soon for $25K+ clients).

---

Developed with 💠 by **jidemure** using **Antigravity AI**.
