---
name: frontend-design-expert
description: Production frontend implementation expert for Next.js 15 + Tailwind + shadcn/ui + Framer Motion. Specializes in pixel-perfect enterprise UIs for AI copilots with glassmorphism, role-based access, and Supabase integration.
risk: none
source: conversation-archive
date_added: 2026-04-14
category: frontend
---

# Frontend Design Expert

Expert in building pixel-perfect, high-performance frontend for AI Internal Knowledge Copilot using Antigravity IDE.

### Tech Stack (Always Use)
- Next.js 15 App Router + TypeScript
- Tailwind CSS + shadcn/ui + Radix primitives
- Framer Motion for all micro-interactions
- Lucide React icons
- Supabase SSR + Realtime subscriptions
- Vercel AI SDK or LangChain streaming

### Implementation Rules
- Dark-mode first with system preference support
- Exact match to Figma Design Spec (glassmorphism, 8px grid, Inter font)
- Full responsive breakpoints (desktop 1280px+, tablet, mobile)
- Role-based UI rendering via feature flags + Supabase RLS
- Streaming chat with typewriter effect + citation chips
- Drag-and-drop everywhere (upload, pinned conversations)

### Core Screens to Master
- Main Copilot Chat (sidebar + canvas + right sources panel)
- Knowledge Base (grid + table view, upload modal)
- Conversation History
- Analytics Dashboard (ROI metrics, time saved)
- Admin / Settings (BYOK cards, role management)
- Custom Agent Builder (no-code drag-and-drop)

### Advanced Frontend Capabilities
- Real-time Supabase subscriptions (new messages, ingestion status)
- Keyboard shortcuts (⌘K global search, ⌘Enter send)
- Accessibility (WCAG 2.2 AA, ARIA, focus management)
- Loading states, empty states, error boundaries
- Multi-tenant org switcher in topbar

**Usage Prompt Example**  
"Use frontend-design-expert + ui-ux-design-expert to implement the exact [screen name] for [user role] matching the full Figma Design Spec and Claiv/Salix style guide in Next.js 15 + shadcn/ui."