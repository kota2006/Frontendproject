# Student Wellness — Fullstack Example

This repository contains a lightweight full-stack student health & wellness application.

Stack
- Backend: Node.js, Express, MongoDB (Mongoose)
- Frontend: React (Vite)
- Auth: JWT

Quick start
1. Prerequisites: Node.js, npm, MongoDB (or Atlas). Clone the repo and cd into the workspace root.

2. Backend
   - cd backend
   - copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
   - npm install
   - npm run seed   # seeds sample admin (admin@example.com/adminpass) and student
   - npm run dev    # starts server on PORT (default 5000)

3. Frontend
   - cd frontend
   - npm install
   - set API URL: create `.env` with `VITE_API_URL=http://localhost:5000` (optional)
   - npm run dev

Sample data
- Admin: admin@example.com / adminpass
- Student: student@example.com / studentpass

API highlights
- POST /api/auth/register
- POST /api/auth/login
- GET /api/resources
- POST /api/resources (admin only)
- GET /api/programs
- POST /api/programs (admin only)
- POST /api/programs/:id/join
- GET /api/metrics (admin only)

Notes & next steps
- Add validation, unit tests, file uploads, and richer UI.
- Add rate-limiting and stronger security for production.

Admin UI (step-by-step)
1. Start the backend and seed the database (see Quick start above). The seed creates an admin account `admin@example.com` with password `adminpass`.
2. Start the frontend and open the dev URL (usually http://localhost:5173).
3. Login with the admin account.
4. On the Admin Dashboard you will find:
   - Platform Metrics: counts of users, resources and programs.
   - Manage Resources: create, edit, and delete health resources (e.g., campus counseling, nutrition workshop).
   - Create Wellness Programs: create new programs and add an initial session topic.
   - Program List: existing programs are listed with Edit and Delete buttons. Use Edit to change title, description or category.

Quick admin UI test flow
- Login as admin (admin@example.com/adminpass).
- Create a resource (title, category, optional link). Confirm it appears in the resource list and on Student Dashboard.
- Edit the resource and confirm changes.
- Delete the resource and confirm removal.
- Create a program and confirm it appears in the Program List; try editing and deleting programs.

Screenshots
- If you'd like, I can add annotated screenshots of the Admin Dashboard and resource/program forms. Tell me which views you want captured, and I will add them to the README (or create an images/ folder).
