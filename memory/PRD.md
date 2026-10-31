# Shan Brothers Manpower Consultants — Product Requirements

## Problem Statement (Verbatim)
Shan Brothers Manpower Consultants — Singapore (HQ) and India (Chennai sourcing).
Supply of blue-collar manpower (welders, electricians, plumbers, drivers, construction/road/airport/railway workers, housemaids etc.) from India to Singapore employers.
Full-service: interviews, visas, tickets, onboarding.

## User Personas
- **Employers (B2B)** — Singapore-based construction/marine/MEP/facilities companies needing skilled trade manpower.
- **Job Seekers (B2C)** — Blue-collar workers in India (and neighbouring countries) seeking placement in Singapore.
- **Admin (Internal)** — Shan Brothers recruitment team members managing submissions.

## Core Requirements
- Marketing website telling the Shan Brothers story with navy + red brand palette
- Publicly submittable candidate application form + employer enquiry form + contact message form
- Simple admin login (JWT) + dashboard to view / update status / delete / export submissions
- Two-office branding (Singapore HQ + India branch) surfaced throughout

## Architecture
- **Frontend**: React 19 + React Router + Tailwind + Shadcn UI + Sonner toasts. Chivo (headings) / Manrope (body).
- **Backend**: FastAPI + Motor async MongoDB + bcrypt + PyJWT. All routes under `/api`.
- **Auth**: Single seeded admin (env-driven), Bearer JWT (24h), token in localStorage.

## What's Implemented (2025-12-05)
- **Pages**: Home, About, Services, Trades, Apply, Hire, Contact, Admin Login, Admin Dashboard
- **Backend endpoints**:
  - Public: `POST /api/candidates`, `POST /api/employers`, `POST /api/contacts`, `GET /api/health`
  - Auth: `POST /api/auth/login`, `GET /api/auth/me`
  - Admin: `GET/PATCH/DELETE /api/admin/{candidates,employers,contacts}/[id]`, `GET /api/admin/stats`
- **Data model**: MongoDB collections `users`, `candidates`, `employers`, `contacts` (all UUID id, ISO datetime strings)
- **Testing**: 21 backend pytest cases + 7 UI Playwright flows — all passing

## Admin Credentials
- `admin@shanbrothers.sg` / `ShanAdmin@2025` (also in `/app/memory/test_credentials.md`)

## Backlog (P1 / P2)
- P1: Email notifications on new submissions (Resend/SendGrid integration) — needs API key
- P1: Resume file upload (currently URL only) — needs object storage
- P1: SEO — sitemap.xml, robots.txt, structured data (JobPosting schema)
- P2: WhatsApp Business API integration for direct chat
- P2: Multi-language toggle (Tamil/Hindi for candidates)
- P2: Public job listings board (currently only application form)
- P2: Rate limiting on public POST endpoints; brute-force lockout on admin login
- P2: Two-factor auth for admin
