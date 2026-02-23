# 🛠 {{PROJECT_NAME}} — Tech Stack

## Version 1.0 | {{DATE}}

> **Suggested stack:** {{TECH_HINT}}

---

# 🎨 FRONTEND

| Item | Technology | Why |
|------|-----------|-----|
| Framework | Next.js 15 (App Router) | Full-stack React, SSR/SSG, Server Components |
| Language | TypeScript 5.7 | Type safety, better DX |
| Styling | Tailwind CSS 4 | Utility-first, rapid prototyping |
| UI Components | Shadcn/UI (Radix UI) | Accessible, customizable, copy-paste |
| State Management | Zustand | Lightweight, simple API |
| Data Fetching | TanStack Query v5 | Caching, auto-refetch, optimistic updates |
| Forms | React Hook Form + Zod | Performant forms + schema validation |
| i18n | next-intl | Multi-language support |

<!-- TODO: Adjust based on your actual stack -->

---

# ⚙️ BACKEND

| Item | Technology | Why |
|------|-----------|-----|
| Runtime | Node.js 22+ | LTS, stable |
| Framework | NestJS 11 | Modular, scalable, enterprise-ready |
| API Style | REST | Standard, easy to consume |
| Auth | JWT + OAuth (Google) | Stateless auth + social login |
| Validation | Class Validator + Zod | DTO validation |
| Email | Resend | Developer-friendly email API |

<!-- TODO: Adjust based on your actual stack -->

---

# 🗄 DATABASE

| Item | Technology | Why |
|------|-----------|-----|
| Primary DB | PostgreSQL 17 | Reliable, feature-rich, extensions |
| ORM | Prisma 6 | Type-safe queries, migrations, studio |
| Cache | Redis 7 | Fast caching, session, queue |
| File Storage | Cloudflare R2 (S3-compatible) | Affordable, no egress fees |

---

# 🏗 INFRASTRUCTURE & HOSTING

| Item | Technology | Why |
|------|-----------|-----|
| Hosting | Vercel (Frontend) + Railway/AWS (Backend) | <!-- TODO --> |
| CI/CD | GitHub Actions | <!-- TODO --> |
| Containerization | Docker Compose | PostgreSQL + Redis local dev |
| Monitoring | Sentry | Error tracking, performance |
| Analytics | <!-- TODO: e.g. PostHog, Mixpanel --> | |

---

# 🔧 DEVELOPMENT TOOLS

| Item | Technology |
|------|-----------|
| Package Manager | pnpm 9+ |
| Monorepo | Turborepo |
| Linter | ESLint |
| Formatter | Prettier |
| Testing | Vitest + Playwright |
| UI Dev | Shadcn CLI (`npx shadcn-ui@latest add <component>`) |

---

# 📦 ARCHITECTURE DIAGRAM

```
                        ┌─────────────┐
                        │   Vercel     │
                        │  (Frontend)  │
                        └──────┬──────┘
                               │
┌──────────┐            ┌──────▼──────┐            ┌──────────────┐
│  Client  │───────────▶│   NestJS    │───────────▶│ PostgreSQL   │
│ (Browser)│            │   (API)     │            │ + Redis      │
└──────────┘            └──────┬──────┘            └──────────────┘
                               │
                        ┌──────▼──────┐
                        │ Cloudflare  │
                        │     R2      │
                        └─────────────┘
```
