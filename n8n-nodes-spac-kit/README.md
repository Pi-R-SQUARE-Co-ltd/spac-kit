# n8n-nodes-spac-kit-pirsquare

**n8n community node for [SPAC-KIT](https://github.com/Pi-R-SQUARE-Co-ltd/spac-kit)** — Spec-Driven Development Kit by Pi R Square Co., LTD

Generate spec templates for any project directly from your n8n workflows.

---

## Installation

### Via n8n UI (recommended)

1. Go to **Settings → Community Nodes**
2. Click **Install a community node**
3. Enter: `n8n-nodes-spac-kit-pirsquare`
4. Click **Install**

### Via CLI

```bash
cd ~/.n8n
npm install n8n-nodes-spac-kit-pirsquare
```

Then restart n8n.

---

## Operations

| Operation | Description | Input |
|-----------|-------------|-------|
| **Create Project** | Create a project with spec templates (`spac/` folder) | Project name, preset, target dir, optional specs |
| **Get Presets** | List all 7 project type presets | — |
| **Get Versions** | Fetch latest npm package versions | — |

---

## Project Type Presets

| Preset | Description |
|--------|-------------|
| Web App (Full-stack) | Frontend + Backend + Database |
| API / Backend Service | API-only — endpoints + database |
| E-commerce / Marketplace | Products, Orders, Payments, Cart |
| SaaS Platform | Multi-tenant, Subscription, Billing |
| Mobile App | React Native / Flutter + Backend |
| Landing Page | Marketing site, content + SEO |
| Internal Tool | Back-office, CRUD, Reports |

---

## Example Workflow

```
Webhook → SPAC-KIT (Create Project) → Send Email with spec files
```

```
Schedule → SPAC-KIT (Get Versions) → Slack Notification (version updates)
```

---

## Output Example (Create Project)

```json
{
  "success": true,
  "projectDir": "/tmp/my-app",
  "spacDir": "/tmp/my-app/spac",
  "files": [
    "00-SCOPE-OF-WORK.md",
    "01-PRD.md",
    "02-TECH-STACK.md",
    "03-DATABASE-SCHEMA.md",
    "04-PROJECT-STRUCTURE.md",
    "05-API-DESIGN.md",
    "06-USER-STORIES.md",
    "07-ROADMAP.md",
    "08-SITEMAP.md"
  ],
  "fileCount": 9
}
```

---

## Credentials (Optional)

The **SPAC-KIT API** credential accepts an Anthropic API key for the AI auto-fill feature. This is optional — the Create Project and Get Presets operations work without it.

---

## Links

- [SPAC-KIT on npm](https://www.npmjs.com/package/@pirsquare.auto/spac-kit)
- [GitHub Repository](https://github.com/Pi-R-SQUARE-Co-ltd/spac-kit)
- [n8n Community Nodes docs](https://docs.n8n.io/integrations/community-nodes/)

---

## License

MIT — Pi R Square Co., LTD
