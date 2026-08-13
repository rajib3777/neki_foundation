# নেকী ফাউন্ডেশন (Neki Foundation) — Frontend Platform

**Neki Foundation** is a modern, enterprise-grade, humanitarian digital platform built to stand for **Justice, Humanity, and Social Responsibility** (ন্যায়, মানবতা ও সামাজিক দায়বদ্ধতা).

This repository contains the complete frontend platform foundation engineered in React, Vite, TypeScript, and Tailwind CSS. The codebase is architected with a decoupled Service/Repository pattern (`src/services/`), allowing a backend (e.g. Django + Django REST Framework) to be integrated seamlessly without rewriting any UI components or page logic.

---

## 🏛️ Core Identity & Humanitarian Services

Neki Foundation provides a unified platform for multi-category social impact:
* ⚖️ **Legal Assistance (আইনী সহায়তা)**: District-wise free & low-cost legal aid through verified panel lawyers.
* 🌳 **Tree Plantation (বৃক্ষরোপণ)**: Environmental protection & climate resilience campaigns.
* 🩸 **Blood Donation (রক্তদান)**: Voluntary donor connecting & emergency blood drives.
* 🛡️ **Social Protection (সামাজিক সুরক্ষা)**: Relief, winter assistance, and community welfare programs.
* 🎓 **Community Support (কমিউনিটি উন্নয়ন)**: Primary education & vocational training for underprivileged youth.

---

## 🔒 Architectural Rules & Guidelines

1. **Strict Human Image Restriction (Hard Rule)**:
   * **Zero human photographs or realistic human faces** are used anywhere in the platform.
   * Visual identity relies on custom geometric monograms, SVG iconography, abstract architectural graphics, and environmental artwork.
2. **Editorial + Institutional Visual Direction**:
   * Clean transparent/solid top navbar, subtle border backdrop on scroll, restrained shadow, strong typography, active navigation indicator.
   * Generic AI glassmorphism and excessive neon gradient blobs are strictly avoided.
3. **Explicit Demo Labelling**:
   * All sample lawyer entries are clearly titled `Demo Lawyer 01`, `Demo Lawyer 02`, etc., and bear prominent `[ডেমো প্রোফাইল]` badges to ensure visitors know they are demo placeholders.
4. **Client-Editable Configuration Layer**:
   * Site branding, contact info, header/footer navigation, services, role matrices, districts, and hero content are completely configuration-driven via `src/config/`.

---

## 👥 Role Matrix & Dashboards

The platform supports 4 distinct roles accessible via the header **Role Context Switcher**:

1. **Public Visitor (সাধারণ দর্শনার্থী)**:
   * Access to Home, About, Services Hub, Legal Assistance Landing, District-wise Lawyer Directory & Profiles, Transparency Reports, News & Contact.
2. **Beneficiary (সেবাগ্রহীতা / আবেদনকারী)**:
   * `/beneficiary/dashboard`: Active request tracking, timeline stepper, document vault, payment history.
   * Multi-step Legal Aid Request flow (`/legal-assistance/apply`) & mock payment checkout.
3. **Lawyer (নিবন্ধিত আইনজীবী)**:
   * `/lawyer/dashboard`: Application review status banner, profile completion indicator, assigned cases table, document vault.
   * 6-Step Lawyer Onboarding Wizard (`/auth/register/lawyer`).
4. **Admin (ফাউন্ডেশন এডমিন)**:
   * `/admin/dashboard`: Executive stats, Lawyer Application Review screen (Approve / Reject with modal reason input), Legal Aid request monitor, and System Audit Logs.

---

## 🛠️ Tech Stack

* **Core**: React 18, Vite 6, TypeScript 5 (Strict Mode enabled).
* **Styling**: Tailwind CSS v4, Custom Bangla Font Stack (`Hind Siliguri` / `Noto Sans Bengali` + `Inter`).
* **Icons**: Lucide React.
* **Forms & Validation**: React Hook Form, Zod.
* **State & Data**: TanStack Query (React Query) architecture.
* **Routing**: React Router v7 with role-aware route structure.

---

## 📁 Folder Structure

```
galaxy_naki/
├── public/
├── src/
│   ├── app/                # App entry, QueryClient, Providers
│   ├── assets/             # SVG & visual asset definitions
│   ├── components/
│   │   ├── layout/         # Editorial Navbar, Footer, Sidebar
│   │   └── ui/             # Reusable primitives (Button, Card, Input, Modal, FileUpload, StatusBadge, DataTable)
│   ├── config/             # Site, Navigation, Services, Roles, Districts, Image configs
│   ├── data/mock/          # Mock data repositories (Lawyers, Requests, Users, Audit, News)
│   ├── layouts/            # PublicLayout, AuthLayout, DashboardLayout
│   ├── pages/
│   │   ├── admin/          # Admin Dashboard & Approval UI
│   │   ├── auth/           # Login, Beneficiary & Lawyer Registration
│   │   ├── beneficiary/    # Beneficiary Dashboard & Tracking
│   │   ├── lawyer/         # Lawyer Dashboard & Profile Manager
│   │   └── public/         # Home, About, Services, Legal Aid, Directory, Detail, Contact, News, Transparency
│   ├── routes/             # AppRoutes router configuration
│   ├── services/           # Service Abstraction Layer (auth, lawyer, legalAid, document, payment, admin)
│   └── types/              # Domain interfaces & TypeScript models
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Running Locally

No Docker required. Run directly with Node.js & npm:

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Type check & production build verification
npx tsc --noEmit
npm run build
```

---

## 🔌 Future Django REST API Integration Guide

All UI components consume async service interfaces exported from `src/services/`.
To connect a Django REST Framework backend:

1. Update `VITE_ENABLE_MOCK_API=false` in `.env`.
2. Update the HTTP calls inside `src/services/*.service.ts` to use `fetch` or `axios` against `VITE_API_BASE_URL`.
3. **No UI components, forms, or page components will need to be rewritten.**
