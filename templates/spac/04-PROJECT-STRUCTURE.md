# 📁 {{PROJECT_NAME}} — Project Structure

## Version 1.0 | {{DATE}}

---

# 📌 OVERVIEW

## Monorepo — Turborepo + pnpm Workspaces

---

# 🗂 FOLDER STRUCTURE

```
{{PROJECT_NAME}}/
├── apps/
│   ├── web/                          # 🌐 Frontend (Next.js 15 — port 3000)
│   │   ├── src/
│   │   │   ├── app/                  # App Router — pages & layouts
│   │   │   │   ├── (public)/         # หน้าสาธารณะ
│   │   │   │   ├── (auth)/           # Login, Register
│   │   │   │   └── (dashboard)/      # หน้า authenticated
│   │   │   ├── components/
│   │   │   │   ├── ui/               # Shadcn/UI components
│   │   │   │   ├── layout/           # Header, Footer, Sidebar
│   │   │   │   └── shared/           # Shared components
│   │   │   ├── hooks/                # Custom React hooks
│   │   │   ├── stores/               # Zustand stores
│   │   │   ├── lib/                  # Utilities, API client
│   │   │   ├── types/                # TypeScript definitions
│   │   │   └── messages/             # i18n translations
│   │   ├── public/                   # Static assets
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   ├── api/                          # ⚙️ Backend (NestJS 11 — port 3001)
│   │   ├── src/
│   │   │   ├── modules/              # Feature modules
│   │   │   │   ├── auth/             # Authentication (JWT + OAuth)
│   │   │   │   ├── users/            # User management
│   │   │   │   └── ...               # แต่ละ module มี controller, service, dto, module
│   │   │   ├── common/               # Guards, Decorators, Filters, Interceptors
│   │   │   ├── config/               # App & DB configuration
│   │   │   └── main.ts               # Entry point
│   │   ├── nest-cli.json
│   │   └── package.json
│   │
│   └── admin/                        # 🔧 Admin Panel (Next.js 15 — port 3002)
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   └── ...                   # โครงสร้างคล้าย web
│       └── package.json
│
├── packages/
│   ├── database/                     # 🗄 Shared Prisma (@{{PROJECT_NAME}}/database)
│   │   ├── prisma/
│   │   │   ├── schema.prisma         # Database schema
│   │   │   └── seed.ts               # Seed script
│   │   ├── src/
│   │   │   └── client.ts             # Prisma client export
│   │   └── package.json
│   │
│   ├── config/                       # ⚙️ Shared Config (@{{PROJECT_NAME}}/config)
│   │   ├── eslint/                   # ESLint configs
│   │   └── tsconfig/                 # TypeScript configs
│   │
│   └── ui/                           # 🎨 Shared UI (@{{PROJECT_NAME}}/ui)
│       ├── src/
│       └── package.json
│
├── spac/                             # 📋 Specification documents
├── docker-compose.yml                # PostgreSQL + Redis
├── turbo.json                        # Turborepo config
├── pnpm-workspace.yaml               # Workspace config
├── package.json                      # Root scripts
├── .env.example                      # Environment template
└── README.md
```

<!-- TODO: ปรับโครงสร้างตามโปรเจคจริง -->

---

# 📱 APPS

| App | Path | Framework | Port | Description |
|-----|------|-----------|------|-------------|
| Web | `apps/web` | Next.js 15 | 3000 | <!-- TODO --> |
| API | `apps/api` | NestJS 11 | 3001 | <!-- TODO --> |
| Admin | `apps/admin` | Next.js 15 | 3002 | <!-- TODO --> |

---

# 📦 PACKAGES

| Package | Path | Description |
|---------|------|-------------|
| Database | `packages/database` | Prisma schema, client, migrations, seed |
| Config | `packages/config` | Shared ESLint & TypeScript configs |
| UI | `packages/ui` | Shared UI components |

---

# ⚙️ CONFIG FILES

| File | Purpose |
|------|---------|
| `turbo.json` | Turborepo pipeline config |
| `pnpm-workspace.yaml` | pnpm workspace definition |
| `docker-compose.yml` | PostgreSQL + Redis สำหรับ local dev |
| `.env.example` | Environment variables template |
| `eslint.config.mjs` | Root ESLint config |

---

# 🔑 ENVIRONMENT VARIABLES

## Root `.env` (Docker)

| Variable | Description |
|----------|-------------|
| `POSTGRES_USER` | DB username |
| `POSTGRES_PASSWORD` | DB password |
| `POSTGRES_DB` | DB name |
| `REDIS_HOST` | Redis host |

## `apps/api/.env` (Backend)

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `REDIS_URL` | Redis connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `PORT` | API port | Yes |
| `FRONTEND_URL` | Frontend URL (CORS) | Yes |
<!-- TODO: เพิ่ม env ตามต้องการ -->

## `apps/web/.env.local` (Frontend)

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |
<!-- TODO: เพิ่ม env ตามต้องการ -->

---

# 📜 SCRIPTS

| Script | Command | Description |
|--------|---------|-------------|
| Dev (all) | `pnpm dev` | รัน web + api + admin พร้อมกัน |
| Dev (web) | `pnpm dev:web` | รันเฉพาะ frontend |
| Dev (api) | `pnpm dev:api` | รันเฉพาะ backend |
| Build | `pnpm build` | Build ทั้งหมด |
| Lint | `pnpm lint` | Lint ทั้งหมด |
| Format | `pnpm format` | Prettier format |
| Type Check | `pnpm type-check` | TypeScript check |
| DB Up | `pnpm db:up` | Start Docker (PostgreSQL + Redis) |
| DB Migrate | `pnpm db:migrate` | Run Prisma migrations |
| DB Seed | `pnpm db:seed` | Seed initial data |
| DB Studio | `pnpm db:studio` | Open Prisma Studio |
