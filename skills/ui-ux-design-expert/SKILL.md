---
name: ui-ux-design-expert
description: Enterprise-grade UI/UX design system and Figma-to-code mastery for AI Internal Knowledge Copilot and similar high-ticket SaaS products ($25K–$100K+). Includes full design system, role-based scoping, glassmorphism, and premium enterprise UX principles.
risk: none
source: conversation-archive
date_added: 2026-04-14
category: design
---

# UI/UX Design Expert

Mastery of premium enterprise UI/UX for AI-powered internal tools. Specializes in translating exact Figma specs into production-ready, role-scoped, accessible interfaces that justify $25K–$100K deals.

### Core Design System (Always Apply)
- **Color Palette**: Teal primary (#0F6E56 / --teal-600), neutral grays, glassmorphism (backdrop-blur + rgba borders)
- **Typography**: Inter (400/500/600 weights), strict hierarchy (H1 32–40px, Body 16px, Caption 12px)
- **Spacing**: Strict 8px base grid
- **Effects**: Glassmorphism, soft shadows, cyan/violet AI gradients, focus rings
- **Animations**: 150–200ms ease-out, hover lift, shimmer loaders, streaming text

### Global Layout (All Screens)
- Fixed 56–64px topbar + 260–280px collapsible sidebar + flexible main content + optional 320px right panel (sources/citations)
- Dark-mode first with light fallback
- Responsive: Desktop-first, tablet collapse, mobile bottom-nav

### Role-Based Screen Access (Enforce Strictly)
- **Super Admin**: Global multi-org dashboard + full platform controls
- **Admin**: Full org management + analytics + connectors
- **Dept. Manager**: Department-scoped chat + documents + team analytics
- **Employee**: Department-scoped chat + personal history
- **Guest**: Read-only public knowledge only

### Reusable Component Library (Pixel-Perfect)
- Buttons (primary teal, ghost, destructive, loading states)
- Cards with glassmorphism + hover lift
- Chat bubbles (user right / AI left with orb avatar + citations)
- Data tables, modals, side panels, badges, skeletons, toasts
- Command menu (⌘K), drag-and-drop upload zones

### Key UX Principles
- Progressive disclosure
- Citation-first RAG experience (sources always visible)
- Keyboard-first (⌘K, ⌘Enter, Esc)
- Zero cognitive load for internal enterprise users
- Trust-building micro-interactions (typing animation, confidence indicators)

**Usage Prompt Example**  
"Apply ui-ux-design-expert to generate the exact screen for [role] in the AI Knowledge Copilot using the full Figma Design Spec and Claiv/Salix style guide."