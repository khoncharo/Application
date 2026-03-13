# Application

A full-stack event management application built with NestJS, React

## Tech Stack

**Backend:** NestJS, Prisma, PostgreSQL, JWT Auth  
**Frontend:** React, TypeScript, Vite, Tailwind CSS, Zustand  
**AI Assistant:** Groq (llama-3.1-8b-instant)

---

## Quick Start with Docker

```bash
git clone <https://github.com/khoncharo/Application.git>
cd radency-internship
docker compose up --build
```

-Frontend: http://localhost
-Backend API: http://localhost:3000
-API Docs (Swagger): http://localhost:3000/docs

The database is created and migrations run automatically on first start.

---

### Set up environment variable

```bash
cp .env.example .env
```

Open `.env` and fill in the required values:

**`GROQ_API_KEY`** — get your free key at [console.groq.com](https://console.groq.com) - API Keys - Create key. Paste it as:

```
GROQ_API_KEY=your_key
```

All other values are pre-filled with working defaults for local development.

---

## Storybook

Component library built with Storybook 8.

```bash
cd frontend/event-app

npm run storybook
```

Storybook runs at `http://localhost:6006`.

Includes stories for: `Button`, `Input`, `TagChip`, `EventCard`, `EventForm`, `DeleteModal`.

---

## Features

- **Authentication** — Register, login, JWT-based auth with refresh tokens
- **Events** — Create, view, edit, and delete events
- **Tags** — searchable, color-coded tags with ability to create custom ones
- **Filter drawer** — filter events by tag on the main listing page
- **Visibility** — Public events visible to everyone; private events visible only to logged-in users
- **Participation** — Join and leave events; capacity limits enforced
- **AI Assistant** — natural language queries about events powered by Groq (requires login)
- **Calendar** — Monthly, weekly, and agenda views for your events
