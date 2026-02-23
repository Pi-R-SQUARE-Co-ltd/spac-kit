# 🚀 SPAC-KIT — Spec-Driven Development Kit

**by Pi R Square Co., LTD**

สร้าง spec templates สำหรับเริ่มต้นโปรเจคแบบ Spec-Driven Development
แค่รันคำสั่งเดียว → ได้โฟลเดอร์ `spac/` พร้อม spec documents ครบ → ส่งต่อให้ทีมหรือ AI ทำงานได้เลย

---

## ขั้นตอนการใช้งาน

### Step 1: สร้าง Spec

```bash
npx @pirsquare/spac-kit init
```

CLI จะถามทีละขั้น:

```
┌──────────────────────────────────────────────────┐
│  🚀 SPAC-KIT — Spec-Driven Development Kit     │
│  by Pi R Square Co., LTD                        │
└──────────────────────────────────────────────────┘

? ชื่อโปรเจค: my-awesome-app

? ประเภทโปรเจค:
  ❯ Web App (Full-stack)        — เว็บแอปทั่วไป
    API / Backend Service       — API-only
    E-commerce / Marketplace    — ร้านค้าออนไลน์
    SaaS Platform               — Multi-tenant SaaS
    Mobile App                  — React Native / Flutter
    Landing Page / Marketing    — เว็บโปรโมท
    Internal Tool / Admin       — ระบบหลังบ้าน

? เลือก spec เพิ่มเติม (required specs จะรวมอยู่แล้ว):
  ◉ API Design
  ◉ User Stories
  ◉ Roadmap
  ◉ Sitemap

✅ สร้างโปรเจค my-awesome-app สำเร็จ!
```

ผลลัพธ์ที่ได้:

```
my-awesome-app/
└── spac/
    ├── 00-SCOPE-OF-WORK.md       ← จุดเริ่มต้น (สำหรับทีมและ AI)
    ├── 01-PRD.md                  ← ⭐ Required
    ├── 02-TECH-STACK.md           ← ⭐ Required
    ├── 03-DATABASE-SCHEMA.md      ← ⭐ Required
    ├── 04-PROJECT-STRUCTURE.md    ← ⭐ Required
    ├── 05-API-DESIGN.md           ← 📎 Optional
    ├── 06-USER-STORIES.md         ← 📎 Optional
    ├── 07-ROADMAP.md              ← 📎 Optional
    └── 08-SITEMAP.md              ← 📎 Optional
```

> ถ้ารู้ชื่อโปรเจคแล้ว ใส่ชื่อตรงๆ ได้เลย: `npx @pirsquare/spac-kit init my-project`

---

### Step 2: กรอก Spec

เปิดแต่ละไฟล์ใน `spac/` แล้วกรอกข้อมูลตาม `<!-- TODO -->` ที่เป็น guide ไว้ให้

**ลำดับแนะนำ:**

| ลำดับ | ไฟล์ | กรอกอะไร |
|-------|------|----------|
| 1 | `01-PRD.md` | โปรเจคนี้คืออะไร? แก้ปัญหาอะไร? ใครใช้? MVP features? |
| 2 | `02-TECH-STACK.md` | ใช้ Framework, DB, Hosting อะไร? |
| 3 | `03-DATABASE-SCHEMA.md` | ตาราง, columns, relations, indexes |
| 4 | `04-PROJECT-STRUCTURE.md` | โฟลเดอร์จัดวางยังไง? scripts อะไรบ้าง? |
| 5+ | Optional specs | API endpoints, User stories, Roadmap, Sitemap |

> แต่ละไฟล์มี **Suggested hints** ตามประเภทโปรเจคที่เลือก เช่น E-commerce จะมี tables `products`, `orders`, `payments` พร้อมให้แล้ว

---

### Step 3: ส่งต่อให้ AI ทำงาน

เปิดไฟล์ `spac/00-SCOPE-OF-WORK.md` → มีคำแนะนำวิธีใช้กับ AI แต่ละตัว:

| AI Tool | วิธีใช้ |
|---------|--------|
| **Claude Code** | คัดลอกเนื้อหา `00-SCOPE-OF-WORK.md` ไปใส่ `CLAUDE.md` ที่ root ของโปรเจค แล้วเปิด Claude Code ได้เลย |
| **ChatGPT** | คัดลอก spec files ทั้งหมดวางเป็น context ก่อนเริ่มสั่งงาน |
| **Cursor / AI IDE** | เพิ่มโฟลเดอร์ `spac/` เป็น context files ในการตั้งค่า |
| **AI อื่นๆ** | ส่ง `00-SCOPE-OF-WORK.md` + spec files ที่เกี่ยวข้องเป็น reference |

AI จะอ่าน specs แล้วเข้าใจ context ทั้งหมดของโปรเจค → เขียนโค้ดตาม tech stack, DB schema, project structure ที่กำหนดไว้ได้เลย

---

## วิธีติดตั้ง

### npx (แนะนำ — ไม่ต้องติดตั้ง)

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
gh repo create my-project --template pirsquare/spac-kit-pirsquare
```

---

## ประเภทโปรเจค (Presets)

เมื่อเลือกประเภท จะได้ template ที่ปรับตาม context — เช่น DB tables, tech stack, features ที่แนะนำ

| ประเภท | ตัวอย่าง Hints |
|--------|---------------|
| **Web App (Full-stack)** | Next.js + Node.js + PostgreSQL, users/sessions tables |
| **API / Backend Service** | Express/Fastify + PostgreSQL + Redis, api_logs table |
| **E-commerce / Marketplace** | Next.js + Stripe, products/orders/categories tables |
| **SaaS Platform** | Multi-tenant, organizations/subscriptions/invitations tables |
| **Mobile App** | React Native (Expo), devices/push_tokens tables |
| **Landing Page / Marketing** | Astro/Next.js + CMS, contacts/subscribers tables |
| **Internal Tool / Admin** | Refine/AdminJS, audit_logs/role-based access tables |

---

## Spec Files

| # | ไฟล์ | Type | เนื้อหา |
|---|------|------|---------|
| 00 | SCOPE-OF-WORK.md | Auto | ภาพรวมโปรเจค, ลำดับการอ่าน, rules, วิธีใช้กับ AI |
| 01 | PRD.md | Required | Product Vision, Target Users, MVP Features, KPIs |
| 02 | TECH-STACK.md | Required | Frontend, Backend, Database, Infra |
| 03 | DATABASE-SCHEMA.md | Required | Tables, Relations, Indexes, Enums |
| 04 | PROJECT-STRUCTURE.md | Required | Folder Structure, Apps, Packages |
| 05 | API-DESIGN.md | Optional | Endpoints, Auth, Error Codes |
| 06 | USER-STORIES.md | Optional | Personas, User Flows, Acceptance Criteria |
| 07 | ROADMAP.md | Optional | Phases, Milestones, Timeline |
| 08 | SITEMAP.md | Optional | Pages, Navigation, Access Control |

---

## License

MIT — Pi R Square Co., LTD
