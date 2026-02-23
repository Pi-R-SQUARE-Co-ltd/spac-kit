# 🛠 {{PROJECT_NAME}} — Tech Stack

## Version 1.0 | {{DATE}}

> **Suggested stack:** {{TECH_HINT}}

---

# 🎨 FRONTEND

| Item | Technology | Why |
|------|-----------|-----|
| Framework | Next.js {{VERSION_NEXTJS}} (App Router) | Full-stack React, SSR/SSG, Server Components |
| Language | TypeScript {{VERSION_TYPESCRIPT}} | Type safety, better DX |
| Styling | Tailwind CSS {{VERSION_TAILWIND}} | Utility-first, rapid prototyping |
| UI Components | Shadcn/UI {{VERSION_SHADCN}} (Radix UI) | Accessible, customizable, copy-paste |
| State Management | Zustand {{VERSION_ZUSTAND}} | Lightweight, simple API |
| Data Fetching | TanStack Query {{VERSION_TANSTACK_QUERY}} | Caching, auto-refetch, optimistic updates |
| Forms | React Hook Form {{VERSION_REACT_HOOK_FORM}} + Zod {{VERSION_ZOD}} | Performant forms + schema validation |
| i18n | next-intl {{VERSION_NEXT_INTL}} | Multi-language support |

<!-- TODO: Adjust based on your actual stack -->

---

# ⚙️ BACKEND

| Item | Technology | Why |
|------|-----------|-----|
| Runtime | Node.js {{VERSION_NODE}}+ | LTS, stable |
| Framework | NestJS {{VERSION_NESTJS}} | Modular, scalable, enterprise-ready |
| API Style | REST | Standard, easy to consume |
| Auth | JWT + OAuth (Google) | Stateless auth + social login |
| Validation | Class Validator + Zod | DTO validation |
| Email | Resend {{VERSION_RESEND}} | Developer-friendly email API |

<!-- TODO: Adjust based on your actual stack -->

---

# 🗄 DATABASE

| Item | Technology | Why |
|------|-----------|-----|
| Primary DB | PostgreSQL {{VERSION_POSTGRESQL}} | Reliable, feature-rich, extensions |
| ORM | Prisma {{VERSION_PRISMA}} | Type-safe queries, migrations, studio |
| Cache | Redis {{VERSION_REDIS}} | Fast caching, session, queue |
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
| Package Manager | pnpm {{VERSION_PNPM}}+ |
| Monorepo | Turborepo {{VERSION_TURBOREPO}} |
| Linter | ESLint {{VERSION_ESLINT}} |
| Formatter | Prettier {{VERSION_PRETTIER}} |
| Testing | Vitest {{VERSION_VITEST}} + Playwright {{VERSION_PLAYWRIGHT}} |
| UI Dev | Shadcn CLI (`npx shadcn@latest add <component>`) |

---

{{ARCHITECTURE_HINT}}
