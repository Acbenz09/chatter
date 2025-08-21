Chatter — Real-Time Chat with Hono, React, Bun & Prisma
[https://github.com/Acbenz09/chatter/releases](https://github.com/Acbenz09/chatter/releases)

[![Releases](https://img.shields.io/badge/Releases-v1.0.0-blue?logo=github)](https://github.com/Acbenz09/chatter/releases) [![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript)](https://www.typescriptlang.org/) [![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/) [![Hono](https://img.shields.io/badge/Hono-0.27-2b2b2b)](https://github.com/honojs/hono) [![Bun](https://img.shields.io/badge/Bun-1.0-ffcc00?logo=bun)](https://bun.sh/) [![Prisma](https://img.shields.io/badge/Prisma-4.8-2b6cb0?logo=prisma)](https://www.prisma.io/) [![PostgreSQL](https://img.shields.io/badge/Postgres-14-336791?logo=postgresql)](https://www.postgresql.org/) [![Socket.IO](https://img.shields.io/badge/Socket.IO-4.6-010101?logo=socket.io)](https://socket.io/) [![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Hero image  
![Chat UI](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1500&q=80)

Table of contents
- About
- Features
- Tech stack
- Quick start
  - Prerequisites
  - Environment
  - Database & Prisma
  - Run backend (Hono + Bun)
  - Run frontend (React + Vite)
- Releases
- Architecture
  - Auth
  - Realtime
  - Persistence
- Environment variables
- Testing
- Deployment
  - Docker
  - Production tips
- Contributing
- License
- Contact

About
Chatter is a full-stack chat app built with Hono for the backend and React for the frontend. It uses Bun for fast runtime performance, Prisma for the ORM, and PostgreSQL for storage. The app handles authentication, private rooms, and realtime messaging via Socket.IO. The README covers setup, development, and deployment.

Features
- User accounts with session-based auth
- OAuth hooks for providers (example providers included)
- Private and group rooms
- Message history with pagination
- Typing indicators
- Presence status
- Delivery receipts
- Strict TypeScript types across client and server
- Zero-downtime deploy pattern with migrations

Tech stack
- Hono — lightweight TypeScript web framework for the backend
- Bun — fast runtime and task runner
- React + Vite — client app with modern tooling
- Socket.IO — realtime channel and event handling
- Prisma ORM — typed DB layer
- PostgreSQL — persistent storage
- TypeScript — typed codebase end to end

Quick start

Prerequisites
- Bun (v1+)
- Node (for some Prisma tools) or bun-based npx shim
- PostgreSQL (local or hosted)
- Git

Clone
git clone https://github.com/Acbenz09/chatter.git
cd chatter

Environment
Create a .env file in the project root and in each subpackage as needed. See the Environment variables section for the full list.

Database & Prisma
1. Create a PostgreSQL database
2. Set DATABASE_URL in .env to the connection string:
   postgresql://user:password@localhost:5432/chatter
3. Generate Prisma client and run migrations:
   - cd server
   - bun install
   - npx prisma migrate dev --name init
   - npx prisma generate

Run backend (Hono + Bun)
- cd server
- bun install
- bun run dev
By default the Hono server listens on port 3000. The server exposes REST endpoints and Socket.IO on the same origin.

Run frontend (React + Vite)
- cd client
- bun install
- bun run dev
Vite serves the client on port 5173. Update the client env to point to the backend (REACT_APP_API_URL).

Releases
Download the official release artifact and run it locally:
- Visit https://github.com/Acbenz09/chatter/releases
- Download the release asset named chatter-v1.0.0-linux-x64.tar.gz
- Run:
  cd ~/Downloads
  curl -L -o chatter-v1.0.0-linux-x64.tar.gz "https://github.com/Acbenz09/chatter/releases/download/v1.0.0/chatter-v1.0.0-linux-x64.tar.gz"
  tar -xzf chatter-v1.0.0-linux-x64.tar.gz
  cd chatter
  ./chatter
The release provides a prebuilt server binary and a static client bundle. If the release link fails, check the Releases section on the repository page: https://github.com/Acbenz09/chatter/releases

Architecture

Overview
- Client (React) connects to the backend via REST for auth and initial data.
- Socket.IO handles realtime messaging and presence.
- Hono routes drive the API and act as the Socket.IO adapter.
- Prisma maps models to PostgreSQL tables and runs migrations.

Auth
- The server uses cookie-based sessions.
- Passwords use bcrypt.
- OAuth hooks for Google and GitHub live under /auth.
- The backend issues a short-lived access token and rotates refresh tokens.

Realtime
- Socket.IO uses namespaces for rooms.
- The server validates the session before allowing socket join.
- Events:
  - message:create — send a new message
  - message:receive — broadcast to room
  - user:typing — broadcast typing
  - presence:update — broadcast presence changes

Persistence
Prisma models:
- User { id, name, email, hash, createdAt }
- Room { id, name, isPrivate, createdAt }
- Message { id, roomId, userId, text, createdAt }
- Membership { id, userId, roomId, role }

Environment variables
- DATABASE_URL — full PostgreSQL connection string
- PORT — server port (default 3000)
- SESSION_SECRET — cryptographic secret for sessions
- OAUTH_GOOGLE_ID / OAUTH_GOOGLE_SECRET — OAuth config
- OAUTH_GITHUB_ID / OAUTH_GITHUB_SECRET
- CLIENT_URL — origin for the client
- REDIS_URL — optional cache/session store
Place variables in .env at root and in server/.env and client/.env where required.

Testing
- Unit tests use vitest for the client and bun test for simple server units.
- Integration tests use a docker-compose test database.
- Run unit tests:
  - cd client
  - bun test
  - cd ../server
  - bun test

Docker
A sample docker-compose sets up the app and Postgres.

docker-compose.yml (snippet)
version: "3.8"
services:
  db:
    image: postgres:14
    environment:
      POSTGRES_USER: chatter
      POSTGRES_PASSWORD: changeme
      POSTGRES_DB: chatter
    volumes:
      - pgdata:/var/lib/postgresql/data
  server:
    build: ./server
    env_file:
      - ./server/.env
    ports:
      - "3000:3000"
    depends_on:
      - db
volumes:
  pgdata:

Production tips
- Use a managed Postgres for reliability.
- Use Redis for socket session syncing in multi-host setup.
- Build the client into a static bundle and serve it via CDN.
- Run Prisma migrate deploy during deployment.

Contributing
- Fork the repo
- Create a feature branch
- Keep PRs small and focused
- Include tests for new features
- Use the same TypeScript config and lint rules

Issue templates
- bug: describe steps to reproduce, expected vs actual
- feature: describe the user story and API surface
- security: send private report to the repo owner

Code style
- Strict TypeScript
- ESLint + Prettier config included
- Keep endpoints small and focused

Security
- Hash passwords with bcrypt
- Use HTTPS in production
- Rotate SESSION_SECRET and OAuth secrets
- Sanitize all socket payloads

FAQ
Q: What ports does Chatter use?
A: Backend default 3000. Frontend dev at 5173. Socket.IO attaches to the backend port.

Q: Can I run the whole app with Bun?
A: Yes. Bun installs packages and runs the dev scripts. Prisma CLI may need node or npx; the repo includes guidance.

Q: How do I scale sockets?
A: Run multiple server instances and use Redis adapter for Socket.IO to share events.

Contact
Open an issue on GitHub or submit a PR. For release downloads and binaries, use the Releases page: https://github.com/Acbenz09/chatter/releases

Images and social
- Use hero images and screenshots for the client UI.
- Add a GIF demo in /docs if you add recorded flows.

License
This project uses the MIT license. See the LICENSE file for full terms.