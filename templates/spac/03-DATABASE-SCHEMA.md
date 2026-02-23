# 🗄 {{PROJECT_NAME}} — Database Schema

## Version 1.0 | {{DATE}}

---

# 📌 OVERVIEW

## Database Type
PostgreSQL 17

## ORM
Prisma 6

## Naming Convention
- Tables: `snake_case` (plural)
- Columns: `snake_case`
- Primary Key: `id` (UUID/CUID)
- Timestamps: `created_at`, `updated_at`

---

# 📊 ENTITY RELATIONSHIP DIAGRAM

```
┌──────────┐       ┌──────────────┐
│  users   │──1:N──│   sessions   │
└──────────┘       └──────────────┘
     │
    1:N
     │
┌──────────┐
│  posts   │
└──────────┘
```

<!-- TODO: Update ER Diagram with actual tables -->

---

# 📋 TABLES

{{DB_TABLES_HINT}}

---

# 🔗 RELATIONS

| From | To | Type | FK Column | On Delete |
|------|----|------|-----------|-----------|
| sessions | users | N:1 | `user_id` | CASCADE |
<!-- TODO: Add more relations -->

---

# 📑 INDEXES

| Table | Columns | Type | Reason |
|-------|---------|------|--------|
| users | `email` | UNIQUE | Login lookup |
| sessions | `token` | UNIQUE | Token validation |
| sessions | `user_id` | BTREE | User sessions query |
<!-- TODO: Add more indexes -->

---

# 🏷 ENUMS

### user_role
| Value | Description |
|-------|-------------|
| `user` | Regular user |
| `admin` | Administrator |

<!-- TODO: Add more enums -->

---

# 🌱 SEED DATA

```sql
-- Default admin user
INSERT INTO users (id, email, name, role)
VALUES ('...', 'admin@example.com', 'Admin', 'admin');
```

<!-- TODO: Add seed data for development -->
