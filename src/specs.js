export const requiredSpecs = [
  { file: '01-PRD.md', name: 'Product Requirements Document (PRD)' },
  { file: '02-TECH-STACK.md', name: 'Tech Stack' },
  { file: '03-DATABASE-SCHEMA.md', name: 'Database Schema' },
  { file: '04-PROJECT-STRUCTURE.md', name: 'Project Structure' },
];

export const optionalSpecs = [
  { file: '05-API-DESIGN.md', name: 'API Design' },
  { file: '06-USER-STORIES.md', name: 'User Stories' },
  { file: '07-ROADMAP.md', name: 'Roadmap' },
  { file: '08-SITEMAP.md', name: 'Sitemap' },
];

export const projectTypes = [
  {
    value: 'fullstack',
    name: 'Web App (Full-stack)',
    description: 'General web app — Frontend + Backend + Database',
    defaultOptionalSpecs: ['05-API-DESIGN.md', '06-USER-STORIES.md', '07-ROADMAP.md', '08-SITEMAP.md'],
    hints: {
      TECH_HINT: 'Next.js / Nuxt + Node.js API + PostgreSQL',
      DB_TABLES_HINT: `## Table: \`users\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| email | VARCHAR(255) | UNIQUE, NOT NULL | |
| name | VARCHAR(255) | NOT NULL | |
| password_hash | VARCHAR(255) | NOT NULL | |
| role | ENUM | DEFAULT 'user' | user, admin |
| created_at | TIMESTAMP | DEFAULT NOW() | |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

## Table: \`sessions\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| user_id | UUID | FK → users.id | |
| token | VARCHAR(500) | UNIQUE | |
| expires_at | TIMESTAMP | NOT NULL | |
| created_at | TIMESTAMP | DEFAULT NOW() | |`,
      FEATURES_HINT: 'Authentication, Dashboard, CRUD operations, User management',
      API_HINT: 'REST API with JWT Auth — users, resources CRUD',
      PAGES_HINT: `Home, Login, Register, Dashboard, Profile, Settings`,
    },
  },
  {
    value: 'api',
    name: 'API / Backend Service',
    description: 'API-only — no frontend, focused on endpoints + database',
    defaultOptionalSpecs: ['05-API-DESIGN.md', '07-ROADMAP.md'],
    hints: {
      TECH_HINT: 'Node.js (Express/Fastify/Hono) + PostgreSQL + Redis',
      DB_TABLES_HINT: `## Table: \`users\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| email | VARCHAR(255) | UNIQUE, NOT NULL | |
| api_key | VARCHAR(255) | UNIQUE | For API authentication |
| created_at | TIMESTAMP | DEFAULT NOW() | |

## Table: \`api_logs\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| user_id | UUID | FK → users.id | |
| endpoint | VARCHAR(255) | NOT NULL | |
| method | VARCHAR(10) | NOT NULL | |
| status_code | INT | NOT NULL | |
| response_time_ms | INT | | |
| created_at | TIMESTAMP | DEFAULT NOW() | |`,
      FEATURES_HINT: 'RESTful Endpoints, API Key Auth, Rate Limiting, Logging',
      API_HINT: 'REST/GraphQL API — versioned endpoints, API key + JWT auth, rate limiting',
      PAGES_HINT: 'API Documentation, Health Check endpoint',
    },
  },
  {
    value: 'ecommerce',
    name: 'E-commerce / Marketplace',
    description: 'Online store — Products, Orders, Payments, Cart',
    defaultOptionalSpecs: ['05-API-DESIGN.md', '06-USER-STORIES.md', '07-ROADMAP.md', '08-SITEMAP.md'],
    hints: {
      TECH_HINT: 'Next.js + Node.js API + PostgreSQL + Stripe/Payment Gateway',
      DB_TABLES_HINT: `## Table: \`users\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| email | VARCHAR(255) | UNIQUE, NOT NULL | |
| name | VARCHAR(255) | NOT NULL | |
| phone | VARCHAR(20) | | |
| address | JSONB | | Shipping address |
| created_at | TIMESTAMP | DEFAULT NOW() | |

## Table: \`products\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| name | VARCHAR(255) | NOT NULL | Product name |
| slug | VARCHAR(255) | UNIQUE | URL-friendly name |
| description | TEXT | | Product description |
| price | DECIMAL(10,2) | NOT NULL | Price |
| stock | INT | DEFAULT 0 | Stock quantity |
| category_id | UUID | FK → categories.id | |
| images | JSONB | | Product images |
| is_active | BOOLEAN | DEFAULT true | |
| created_at | TIMESTAMP | DEFAULT NOW() | |

## Table: \`orders\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| user_id | UUID | FK → users.id | |
| status | ENUM | DEFAULT 'pending' | pending, paid, shipped, delivered, cancelled |
| total | DECIMAL(10,2) | NOT NULL | Order total |
| shipping_address | JSONB | NOT NULL | Shipping address |
| payment_method | VARCHAR(50) | | |
| paid_at | TIMESTAMP | | |
| created_at | TIMESTAMP | DEFAULT NOW() | |

## Table: \`order_items\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| order_id | UUID | FK → orders.id | |
| product_id | UUID | FK → products.id | |
| quantity | INT | NOT NULL | |
| price | DECIMAL(10,2) | NOT NULL | Price at order time |

## Table: \`categories\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| name | VARCHAR(255) | NOT NULL | |
| slug | VARCHAR(255) | UNIQUE | |
| parent_id | UUID | FK → categories.id, NULLABLE | Parent category |`,
      FEATURES_HINT: 'Product Catalog, Shopping Cart, Checkout, Payment, Order Tracking, Admin Panel',
      API_HINT: 'REST API — products, cart, orders, payments, categories, reviews',
      PAGES_HINT: 'Home, Products, Product Detail, Cart, Checkout, Order History, Admin Dashboard',
    },
  },
  {
    value: 'saas',
    name: 'SaaS Platform',
    description: 'Multi-tenant SaaS — Subscription, Billing, Teams',
    defaultOptionalSpecs: ['05-API-DESIGN.md', '06-USER-STORIES.md', '07-ROADMAP.md', '08-SITEMAP.md'],
    hints: {
      TECH_HINT: 'Next.js + Node.js + PostgreSQL + Stripe Billing + Redis',
      DB_TABLES_HINT: `## Table: \`organizations\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| name | VARCHAR(255) | NOT NULL | Organization name |
| slug | VARCHAR(255) | UNIQUE | URL-friendly name |
| plan | ENUM | DEFAULT 'free' | free, pro, enterprise |
| stripe_customer_id | VARCHAR(255) | | |
| created_at | TIMESTAMP | DEFAULT NOW() | |

## Table: \`users\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| org_id | UUID | FK → organizations.id | |
| email | VARCHAR(255) | UNIQUE, NOT NULL | |
| name | VARCHAR(255) | NOT NULL | |
| role | ENUM | DEFAULT 'member' | owner, admin, member |
| created_at | TIMESTAMP | DEFAULT NOW() | |

## Table: \`subscriptions\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| org_id | UUID | FK → organizations.id | |
| stripe_subscription_id | VARCHAR(255) | | |
| plan | ENUM | NOT NULL | free, pro, enterprise |
| status | ENUM | DEFAULT 'active' | active, past_due, cancelled |
| current_period_start | TIMESTAMP | | |
| current_period_end | TIMESTAMP | | |
| created_at | TIMESTAMP | DEFAULT NOW() | |

## Table: \`invitations\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| org_id | UUID | FK → organizations.id | |
| email | VARCHAR(255) | NOT NULL | |
| role | ENUM | DEFAULT 'member' | |
| token | VARCHAR(255) | UNIQUE | |
| expires_at | TIMESTAMP | NOT NULL | |
| created_at | TIMESTAMP | DEFAULT NOW() | |`,
      FEATURES_HINT: 'Multi-tenant, Team Management, Subscription Billing, Dashboard, Settings',
      API_HINT: 'REST API — organizations, users, subscriptions, billing, invitations',
      PAGES_HINT: 'Landing, Pricing, Login, Dashboard, Team Settings, Billing, Admin',
    },
  },
  {
    value: 'mobile',
    name: 'Mobile App',
    description: 'Mobile app — React Native / Flutter + Backend API',
    defaultOptionalSpecs: ['05-API-DESIGN.md', '06-USER-STORIES.md', '07-ROADMAP.md'],
    hints: {
      TECH_HINT: 'React Native (Expo) / Flutter + Node.js API + PostgreSQL',
      DB_TABLES_HINT: `## Table: \`users\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| email | VARCHAR(255) | UNIQUE, NOT NULL | |
| name | VARCHAR(255) | NOT NULL | |
| avatar_url | VARCHAR(500) | | |
| push_token | VARCHAR(500) | | For push notifications |
| platform | ENUM | | ios, android |
| created_at | TIMESTAMP | DEFAULT NOW() | |

## Table: \`devices\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| user_id | UUID | FK → users.id | |
| device_id | VARCHAR(255) | | |
| platform | ENUM | NOT NULL | ios, android |
| app_version | VARCHAR(20) | | |
| last_active_at | TIMESTAMP | | |
| created_at | TIMESTAMP | DEFAULT NOW() | |`,
      FEATURES_HINT: 'Authentication, Push Notifications, Offline Support, Profile, Settings',
      API_HINT: 'REST API for mobile — auth, push notifications, sync, media upload',
      PAGES_HINT: 'Splash, Login, Home (Tab), Profile, Settings, Notifications',
    },
  },
  {
    value: 'landing',
    name: 'Landing Page / Marketing Site',
    description: 'Marketing site — lightweight backend, content + SEO focused',
    defaultOptionalSpecs: ['07-ROADMAP.md', '08-SITEMAP.md'],
    hints: {
      TECH_HINT: 'Next.js / Astro + Tailwind CSS + CMS (Contentful/Sanity)',
      DB_TABLES_HINT: `## Table: \`contacts\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| name | VARCHAR(255) | NOT NULL | |
| email | VARCHAR(255) | NOT NULL | |
| message | TEXT | | |
| source | VARCHAR(100) | | Source page |
| created_at | TIMESTAMP | DEFAULT NOW() | |

## Table: \`subscribers\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| email | VARCHAR(255) | UNIQUE, NOT NULL | |
| subscribed_at | TIMESTAMP | DEFAULT NOW() | |
| unsubscribed_at | TIMESTAMP | NULLABLE | |`,
      FEATURES_HINT: 'Hero Section, Features, Pricing, Testimonials, Contact Form, Blog',
      API_HINT: 'Contact form API, Newsletter subscription, CMS integration',
      PAGES_HINT: 'Home, About, Features, Pricing, Blog, Contact, Privacy Policy',
    },
  },
  {
    value: 'internal',
    name: 'Internal Tool / Admin Dashboard',
    description: 'Back-office system — CRUD, Reports, User Management',
    defaultOptionalSpecs: ['05-API-DESIGN.md', '06-USER-STORIES.md', '07-ROADMAP.md'],
    hints: {
      TECH_HINT: 'Next.js / Refine / AdminJS + Node.js + PostgreSQL',
      DB_TABLES_HINT: `## Table: \`users\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| email | VARCHAR(255) | UNIQUE, NOT NULL | |
| name | VARCHAR(255) | NOT NULL | |
| role | ENUM | DEFAULT 'viewer' | super_admin, admin, editor, viewer |
| department | VARCHAR(100) | | Department |
| is_active | BOOLEAN | DEFAULT true | |
| last_login_at | TIMESTAMP | | |
| created_at | TIMESTAMP | DEFAULT NOW() | |

## Table: \`audit_logs\`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| user_id | UUID | FK → users.id | |
| action | VARCHAR(50) | NOT NULL | create, update, delete |
| resource | VARCHAR(100) | NOT NULL | Modified resource name |
| resource_id | UUID | | |
| changes | JSONB | | Changed data |
| ip_address | VARCHAR(45) | | |
| created_at | TIMESTAMP | DEFAULT NOW() | |`,
      FEATURES_HINT: 'CRUD Management, Reports, Role-based Access, Audit Logs, Data Export',
      API_HINT: 'REST API — CRUD endpoints, reports, export (CSV/Excel), audit logs',
      PAGES_HINT: 'Login, Dashboard, Data Tables, Create/Edit Forms, Reports, Settings, User Management',
    },
  },
];
