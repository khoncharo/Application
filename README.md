# appication

A full-stack event management application built with NestJS, React, and PostgreSQL.

## Tech Stack

**Backend:** NestJS, Prisma, PostgreSQL, JWT Auth  
**Frontend:** React, TypeScript, Vite, Tailwind CSS, Zustand

---

## Quick Start with Docker

```
git clone https://github.com/khoncharo/Application
cd radency-internship
docker compose up --build
```

- Frontend: http://localhost
- Backend API: http://localhost:3000
- API Docs (Swagger): http://localhost:3000/docs

The database is created and migrations run automatically on first start.

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
