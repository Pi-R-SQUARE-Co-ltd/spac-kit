# 🚀 SPAC-KIT — Spec-Driven Development Kit

**by Pi R Square Co., LTD**

Generate spec templates for any project in seconds. One command gives you a complete `spac/` folder with everything your team (and AI) needs to start building.

---

## How It Works

### Step 1: Generate Specs

```bash
npx @pirsquare/spac-kit init
```

The CLI walks you through:

```
┌──────────────────────────────────────────────────┐
│  🚀 SPAC-KIT — Spec-Driven Development Kit     │
│  by Pi R Square Co., LTD                        │
└──────────────────────────────────────────────────┘

? Project name: my-awesome-app

? Project type:
  ❯ Web App (Full-stack)
    API / Backend Service
    E-commerce / Marketplace
    SaaS Platform
    Mobile App
    Landing Page / Marketing Site
    Internal Tool / Admin Dashboard

? Select additional specs (required specs are always included):
  ◉ API Design
  ◉ User Stories
  ◉ Roadmap
  ◉ Sitemap

✅ Project my-awesome-app created successfully!
```

Output:

```
my-awesome-app/
└── spac/
    ├── 00-SCOPE-OF-WORK.md       ← Entry point (for team & AI)
    ├── 01-PRD.md                  ← ⭐ Required
    ├── 02-TECH-STACK.md           ← ⭐ Required
    ├── 03-DATABASE-SCHEMA.md      ← ⭐ Required
    ├── 04-PROJECT-STRUCTURE.md    ← ⭐ Required
    ├── 05-API-DESIGN.md           ← 📎 Optional
    ├── 06-USER-STORIES.md         ← 📎 Optional
    ├── 07-ROADMAP.md              ← 📎 Optional
    └── 08-SITEMAP.md              ← 📎 Optional
```

> Already know your project name? Run directly: `npx @pirsquare/spac-kit init my-project`

---

### Step 2: Fill in Specs

Open each file in `spac/` and fill in the sections. Each template comes with pre-filled defaults and `<!-- TODO -->` guides.

**Recommended order:**

| Order | File | What to fill in |
|-------|------|-----------------|
| 1 | `01-PRD.md` | What is this project? What problem does it solve? Who uses it? |
| 2 | `02-TECH-STACK.md` | Framework, database, hosting, libraries |
| 3 | `03-DATABASE-SCHEMA.md` | Tables, columns, relations, indexes |
| 4 | `04-PROJECT-STRUCTURE.md` | Folder structure, apps, packages, scripts |
| 5+ | Optional specs | API endpoints, user stories, roadmap, sitemap |

> Each file includes **suggested hints** based on the project type you selected. For example, E-commerce comes with `products`, `orders`, `payments` tables ready to go.

---

### Step 3: Hand Off to AI

Open `spac/00-SCOPE-OF-WORK.md` for instructions on how to use with any AI tool:

| AI Tool | How to use |
|---------|-----------|
| **Claude Code** | Copy `00-SCOPE-OF-WORK.md` content into `CLAUDE.md` at the project root |
| **ChatGPT** | Paste all spec files as context before giving instructions |
| **Cursor / AI IDE** | Add `spac/` folder as context files in settings |
| **Other AI** | Send `00-SCOPE-OF-WORK.md` along with relevant spec files as reference |

The AI reads your specs and understands the full context — tech stack, database schema, project structure — then builds accordingly.

---

## Installation

### npx (recommended — no install needed)

```bash
npx @pirsquare/spac-kit init
```

### Global install

```bash
npm i -g @pirsquare/spac-kit
spac-kit init
```

### GitHub Template

```bash
gh repo create my-project --template Pi-R-SQUARE-Co-ltd/spac-kit
```

---

## Project Type Presets

When you select a project type, templates are customized with relevant defaults — database tables, tech stack suggestions, feature hints.

| Type | Hints |
|------|-------|
| **Web App (Full-stack)** | Next.js + Node.js + PostgreSQL, users/sessions tables |
| **API / Backend Service** | Express/Fastify + PostgreSQL + Redis, api_logs table |
| **E-commerce / Marketplace** | Next.js + Stripe, products/orders/categories tables |
| **SaaS Platform** | Multi-tenant, organizations/subscriptions/invitations tables |
| **Mobile App** | React Native (Expo), devices/push_tokens tables |
| **Landing Page / Marketing** | Astro/Next.js + CMS, contacts/subscribers tables |
| **Internal Tool / Admin** | Refine/AdminJS, audit_logs/role-based access tables |

---

## Spec Files

| # | File | Type | Contents |
|---|------|------|----------|
| 00 | SCOPE-OF-WORK.md | Auto | Project overview, reading order, rules, AI usage guide |
| 01 | PRD.md | Required | Product vision, target users, MVP features, KPIs |
| 02 | TECH-STACK.md | Required | Frontend, backend, database, infrastructure |
| 03 | DATABASE-SCHEMA.md | Required | Tables, relations, indexes, enums |
| 04 | PROJECT-STRUCTURE.md | Required | Folder structure, apps, packages, scripts |
| 05 | API-DESIGN.md | Optional | Endpoints, authentication, error codes |
| 06 | USER-STORIES.md | Optional | Personas, user flows, acceptance criteria |
| 07 | ROADMAP.md | Optional | Phases, milestones, timeline |
| 08 | SITEMAP.md | Optional | Pages, navigation, access control |

---

## License

MIT — Pi R Square Co., LTD
