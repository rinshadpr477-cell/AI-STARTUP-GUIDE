# Startup Navigator

An AI-powered knowledge platform that helps early-stage founders navigate company registration, funding, legal compliance, hiring, branding, marketing, taxation, and business growth — with answers grounded in a real, curated knowledge base rather than open-ended AI guesses.

## Live Demo

- **Live URL:** https://ai-startup-guide-xbh2.vercel.app/
- **GitHub Repo:** https://github.com/rinshadpr477-cell/AI-STARTUP-GUIDE
- **Admin login:** `admin@startupnavigator.com` / `Admin@123`

## Overview

Startup Navigator lets any visitor browse a structured library of startup topics and articles, ask natural-language questions through an AI search that answers strictly from that knowledge base, and (for logged-in users) track their search history and progress. Admins manage all knowledge base content — articles, resources, and topics — through a dedicated CMS with role-gated access.

## Features

- **Marketing pages** — Home, Explore (topics + articles), Resources, About, Contact
- **Authentication** — email/password signup and login (Auth.js v5), session-based, with `USER` and `ADMIN` roles
- **Role-protected routing** — middleware blocks `/dashboard` and `/ai-search` for logged-out users, and `/admin` for non-admins, each redirecting to `/login` with a contextual toast
- **Admin CMS** — full create/edit/delete for Articles and Resources, with Zod-validated forms and toast-confirmed actions (including a styled delete confirmation dialog)
- **AI Search** — ask a question in plain language; the app retrieves the most relevant articles and asks Gemini to answer using only that context, with source links and an honest "I don't have enough information" fallback when nothing matches
- **User Dashboard** — total searches, monthly searches, topics explored, and recent search history (all computed from real data, no mocked stats)
- **Admin Analytics** — aggregate usage stats across all users
- **Toast notifications** (Sonner) — feedback on admin CRUD actions and auth redirects
- **Resilient AI calls** — automatic retry with backoff on transient Gemini overload (503/429) errors
- **Polish** — custom error and 404 pages, route-level loading skeletons, responsive layout

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui (Base UI primitives) |
| Database | PostgreSQL (Neon, serverless) |
| ORM | Prisma ORM v7 (driver adapter: `@prisma/adapter-pg`) |
| Auth | Auth.js v5 (`next-auth@beta`), Credentials provider, bcrypt password hashing |
| AI | Google Gemini (`@google/genai`, `gemini-3.5-flash`) |
| Validation | Zod |
| Notifications | Sonner |
| Hosting | Vercel |

## Architecture
<img width="970" height="1007" alt="image" src="https://github.com/user-attachments/assets/ede830ec-ab87-4e7e-bfb7-984cc557aaff" />
User Browser
│
▼
Next.js App Router (single full-stack app)
┌───────────────┬─────────────────────┬──────────────────┐
│ UI Components │ Server Actions / API│  Auth & Roles     │
│ Pages/layouts │ Handles requests    │  Session + RBAC   │
└───────────────┴─────────────────────┴──────────────────┘
│
▼
Application Services (business logic)
│
▼
Prisma ORM (type-safe database access)
│
▼
PostgreSQL Database (Neon)

Everything runs as a single Next.js application — there is no separate backend service. Server Actions (`"use server"`) handle all mutations (auth, admin CRUD, AI search), and Prisma provides type-safe access to Postgres. Middleware enforces role-based access before requests reach protected pages, with matching server-side checks inside every admin mutation as defense in depth.

## AI Search / RAG Workflow

Startup Navigator uses a lightweight, keyword-based retrieval approach rather than vector embeddings:

1. **Normalize** the user's question (trim, lowercase, length validation between 3–300 characters).
2. **Retrieve** — score every published article by matches against its title, tags, topic name, and content, and take the top 3 matches.
3. **Ground** — if no article scores above zero, skip the AI call entirely and return an honest "I don't have enough information in the knowledge base" message. This avoids the AI hallucinating an answer with no real basis.
4. **Generate** — if matches exist, the top 3 articles are formatted as context and sent to Gemini with a system prompt that strictly instructs it to answer only from the provided context.
5. **Respond** — the answer is returned along with clickable source links back to the originating articles, and (for logged-in users) saved to their search history along with the topics touched.
6. **Resilience** — if Gemini returns a transient error (503 overloaded, 429 rate-limited), the call is retried up to 3 times with increasing backoff before surfacing a "temporarily unavailable" message to the user.

## Database Design

- **User** — id, name, email, hashed password, role (`USER` | `ADMIN`)
- **Topic** — id, name, slug, description
- **Article** — id, title, slug, content, tags (string array), published flag, topicId, authorId
- **Resource** — id, title, url, type, description, authorId
- **SearchHistory** — id, question, answer, topics touched (string array), userId, createdAt

## Folder Structure
src/
app/                    # Routes (App Router) — pages, admin section, server actions
components/
ui/                   # shadcn/ui primitives
admin/                # Admin CMS forms, delete confirmations, toast-on-load
ai/                    # AI Search client + formatted answer rendering
site/                  # Shared marketing UI (topic/article/resource cards, empty states)
layout/                # Navbar, footer
dashboard/             # Dashboard stat cards
providers/             # Auth session provider
lib/
actions/               # Server actions (auth, admin CRUD, AI search)
queries/                # Read-only DB queries (topics, articles, dashboard stats)
ai/                     # Gemini client, retrieval scoring, grounded prompt builder
validations/            # Zod schemas
db.ts                   # Prisma client singleton (adapter-based)
auth.ts / auth.config.ts  # Auth.js setup (full + edge-safe split config)
middleware.ts             # Route protection
prisma/
schema.prisma
seed.ts

## AI Tools & Prompts Used

This project was built collaboratively with Claude (Anthropic) as a pair-programming assistant, following a phased plan derived from an architecture blueprint and coding prompt playbook prepared before development started:

1. Project setup + design system
2. Database schema + Prisma
3. Marketing pages
4. Authentication
5. Admin CMS
6. AI Search (retrieval + Gemini generation)
7. User dashboard
8. Polish + testing (error states, loading skeletons, toast notifications, retry logic)
9. Deployment + documentation

Each phase was implemented as complete, working code reviewed and tested locally before moving to the next, with real errors (Prisma v7 breaking changes, Auth.js middleware role propagation, Gemini model deprecation, transient API overload) debugged interactively from actual terminal output rather than guessed at.

## Getting Started (Local Setup)

```bash
git clone https://github.com/rinshadpr477-cell/AI-STARTUP-GUIDE.git
cd AI-STARTUP-GUIDE
npm install
```

Create a `.env` file in the project root (see Environment Variables below), then:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Visit `http://localhost:3000`.

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `AUTH_SECRET` | Auth.js session secret (generate with `npx auth secret`) |
| `GEMINI_API_KEY` | Google Gemini API key |

## Deployment

Hosted on Vercel, connected to this GitHub repository for automatic deployments on push to `main`. Environment variables are set in the Vercel project settings. The `postinstall` script (`prisma generate`) ensures the Prisma client is regenerated on every build, since the generated client is not committed to the repo.
## Testing Performed

- Manual testing of registration, login, logout, and role-based redirects (user vs admin, logged-out vs logged-in)
- Full CRUD testing on Articles and Resources through the admin CMS
- AI Search tested with valid questions, empty input, over-length input, and questions with no knowledge-base match
- Responsive layout checked at mobile widths
- Error and 404 pages verified

## Known Limitations

- Retrieval uses keyword/token matching rather than vector embeddings, so semantic (non-literal) matches may be missed
- No password reset or email verification flow
- No UI for promoting a user to admin — the seed script creates the only admin account
- No automated test suite; all testing was manual

  <img width="1882" height="1015" alt="image" src="https://github.com/user-attachments/assets/3efdd4c7-a35a-445f-b042-fe6115cec791" />

- No file/image upload support for articles or resources 




