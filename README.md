# Radency Events

A full-stack event management application built with NestJS, React, and PostgreSQL.

## Tech Stack

**Backend:** NestJS, Prisma, PostgreSQL, JWT Auth  
**Frontend:** React, TypeScript, Vite, Tailwind CSS, Zustand

---

## Quick Start with Docker

The easiest way to run the project. Requires [Docker](https://www.docker.com/get-started) to be installed.

```bash
git clone <your-repo-url>
cd radency-internship
docker compose up --build
```

- Frontend: http://localhost
- Backend API: http://localhost:3000
- API Docs (Swagger): http://localhost:3000/docs

The database is created and migrations run automatically on first start.

---

## Manual Setup (for development)

### Prerequisites

- Node.js 20+
- PostgreSQL running locally

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd radency-internship
```

### 2. Backend setup

```bash
# Install dependencies
npm install

# Set up the database (runs migrations and generates Prisma client)
npx prisma migrate dev

# Start the backend in development mode
npm run start:dev
```

Backend runs on http://localhost:3000  
Swagger docs at http://localhost:3000/docs

### 3. Frontend setup

Open a second terminal:

```bash
cd frontend/event-app

# Install dependencies
npm install

# Start the frontend dev server
npm run dev
```

Frontend runs on http://localhost:5173

> **Note:** Make sure to open http://localhost:5173 (not http://127.0.0.1:5173) to avoid CORS issues.

---

## Environment Variables

The `.env` file in the project root controls backend configuration:

| Variable                | Description                       |
| ----------------------- | --------------------------------- |
| `DATABASE_URL`          | PostgreSQL connection string      |
| `JWT_SECRET`            | Secret key for signing JWT tokens |
| `JWT_AUDIENCE`          | JWT audience claim                |
| `JWT_ISSUER`            | JWT issuer claim                  |
| `JWT_ACCESS_TOKEN_TTL`  | Access token lifetime in seconds  |
| `JWT_REFRESH_TOKEN_TTL` | Refresh token lifetime in seconds |

---

## Features

- **Authentication** — Register, login, JWT-based auth with refresh tokens
- **Events** — Create, view, edit, and delete events
- **Visibility** — Public events visible to everyone; private events visible only to logged-in users
- **Participation** — Join and leave events; capacity limits enforced
- **Calendar** — Monthly, weekly, and agenda views for your events
- **Responsive** — Works on desktop and mobile
