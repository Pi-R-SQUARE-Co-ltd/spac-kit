# 👤 {{PROJECT_NAME}} — User Stories

## Version 1.0 | {{DATE}}

> **Suggested features:** {{FEATURES_HINT}}

---

# 📌 PERSONAS

| Persona | Role | Goals | Pain Points |
|---------|------|-------|-------------|
| Alex | End User | Quick access, easy to use | Complicated UIs, slow loading |
| Jordan | Admin | Manage users, view reports | Manual tasks, no visibility |
<!-- TODO: Add more personas -->

---

# 📖 USER STORIES

## Epic 1: Authentication

### Story 1.1 — User Registration
> As a **new user**, I want to **create an account**, so that **I can access the platform**.

**Acceptance Criteria:**
- [ ] User can input email, password, and name
- [ ] Password must be at least 8 characters
- [ ] Email must be unique
- [ ] User is redirected to dashboard after registration

**Priority:** High | **Points:** 3

### Story 1.2 — User Login
> As a **registered user**, I want to **log in**, so that **I can access my account**.

**Acceptance Criteria:**
- [ ] User can login with email and password
- [ ] Invalid credentials show error message
- [ ] Session persists across page refresh

**Priority:** High | **Points:** 2

<!-- TODO: Add more stories -->

---

## Epic 2: Dashboard

### Story 2.1 — View Dashboard
> As a **logged-in user**, I want to **see my dashboard**, so that **I get an overview of my data**.

**Acceptance Criteria:**
- [ ] Dashboard loads within 2 seconds
- [ ] Shows key metrics and recent activity
- [ ] Responsive on mobile devices

**Priority:** High | **Points:** 5

<!-- TODO: Add more stories -->

---

# 🔄 USER FLOWS

## Flow 1: Registration → First Use

```
Landing Page → Click "Sign Up"
  → Registration Form (email, password, name)
  → Submit → Email verification (optional)
  → Redirect to Dashboard
  → Onboarding tooltip / tour
```

## Flow 2: Login → Key Action

```
Login Page → Enter credentials → Submit
  → Dashboard → Navigate to feature
  → Perform action → See confirmation
```

<!-- TODO: Add more flows -->

---

# 📊 STORY MAP

| Activity | MVP | Phase 2 | Phase 3 |
|----------|-----|---------|---------|
| **Auth** | Register, Login, Logout | Forgot password, OAuth | 2FA, SSO |
| **Dashboard** | View stats | Export data | Custom widgets |
| **Profile** | View, Edit | Avatar upload | Preferences |
| **Admin** | User list | Roles, Permissions | Audit logs |

<!-- TODO: Expand story map -->
