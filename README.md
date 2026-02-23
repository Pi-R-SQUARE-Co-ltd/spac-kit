# 🚀 SPAC-KIT — Spec-Driven Development Kit

**by Pi R Square Co., LTD**

Generate spec templates for any project in seconds. One command gives you a complete `spac/` folder with everything your team (and AI) needs to start building.

---

## How It Works

### Step 1: Generate Specs

```bash
npx @pirsquare.auto/spac-kit init
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

> Already know your project name? Run directly: `npx @pirsquare.auto/spac-kit init my-project`

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
npx @pirsquare.auto/spac-kit init
```

### Global install

```bash
npm i -g @pirsquare.auto/spac-kit
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

## v2.0 — New Features

### MCP Server (for AI Tools)

spac-kit includes a built-in MCP server that lets AI tools like Claude Code and Cursor call spac-kit directly.

**Setup for Claude Code** — add to `~/.claude.json`:

```json
{
  "mcpServers": {
    "spac-kit": {
      "command": "npx",
      "args": ["-y", "-p", "@pirsquare.auto/spac-kit", "spac-kit-mcp"]
    }
  }
}
```

**Setup for Cursor** — add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "spac-kit": {
      "command": "npx",
      "args": ["-y", "-p", "@pirsquare.auto/spac-kit", "spac-kit-mcp"]
    }
  }
}
```

Then just tell the AI what you need:

> "Create specs for an e-commerce project called shopee-clone"

Available MCP tools:

| Tool | Description |
|------|-------------|
| `list_presets` | List all project type presets |
| `create_project` | Create a project with spec templates |
| `read_spec` | Read a specific spec file |
| `get_latest_versions` | Get latest npm package versions |
| `fill_specs` | AI auto-fill spec templates |

---

### AI Auto-Fill (`spac-kit fill`)

Let Claude AI fill in your spec templates automatically based on a project description.

```bash
# Set your API key
export ANTHROPIC_API_KEY=sk-ant-xxx

# Auto-fill all specs with TODO markers
spac-kit fill --description "Meeting room booking system for offices"

# Specify directory
spac-kit fill --dir ./my-project/spac --description "E-commerce for clothing"
```

Each spec file gets a specialized AI persona:
- PRD → Product Manager
- Database Schema → Database Architect  
- API Design → API Designer
- User Stories → Product Owner

Requires `@anthropic-ai/sdk` (installed as optional dependency).

---

### Programmatic API

Use spac-kit as a library in your own code:

```js
import { createProject, getPresets, readSpecFile } from '@pirsquare.auto/spac-kit';

// Create a project
const result = await createProject('my-app', {
  preset: 'saas',
  optionalSpecs: ['05-API-DESIGN.md', '06-USER-STORIES.md'],
  overwrite: true,
  targetDir: '/path/to/dir',
});

// List presets
const presets = getPresets();

// Read a spec file
const content = await readSpecFile('./my-app/spac', '01-PRD.md');
```

---

### n8n Node

Use spac-kit in n8n workflow automation:

```bash
npm install n8n-nodes-spac-kit-pirsquare
```

Or install via n8n UI: **Settings → Community Nodes → Install → `n8n-nodes-spac-kit-pirsquare`**

Operations: Create Project, Get Presets, Get Versions.


---

## License

MIT — Pi R Square Co., LTD
