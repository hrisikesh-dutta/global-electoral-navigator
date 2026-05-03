# GlobalElect — Electoral Navigator

A modern, full-stack electoral navigation platform designed to guide users through the 2026 elections. Built with React, Zustand, and Tailwind CSS, featuring a beautiful glassmorphism aesthetic and a fully functional gated state machine architecture.

## Tech Stack
- **Frontend Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS v4, custom Glassmorphism UI
- **State Management:** Zustand (for gated onboarding state), React Context (for Theme/Language)
- **Routing:** React Router v6
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Data Persistence:** LocalStorage (zero backend required)

## Features
- **Gated Onboarding:** A strict 5-step state machine (Location, Eligibility, EPIC Lookup, Booth Assign, Dashboard) ensuring users complete necessary verification.
- **Admin Panel:** Complete suite of administrative tools including a Data Manager, State Machine Editor, Elections drawer, and Roles access control.
- **Multilingual Support:** Dynamic language switching (English, Hindi, Bengali) using Context API.
- **Knowledge Hub:** Interactive AI chatbot simulation for answering voter queries.
- **Dark-Mode Glassmorphism:** Immersive UI with background gradient meshes, glowing accents, and frosted glass components.

## Running Locally

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the app at `http://localhost:5173`.
5. Access the Admin Panel at `http://localhost:5173/admin`.

## Deployment

This application is configured for seamless deployment on standard static hosting platforms (Vercel, Netlify, Apache).

### Vercel / Netlify
The repository includes `vercel.json` and `netlify.toml` pre-configured to handle SPA routing fallback (redirecting all requests to `/index.html`).
- Simply link your GitHub repository to Vercel/Netlify.
- Build command: `npm run build`
- Output directory: `dist`

### Custom Apache Server
A `.htaccess` file is included in the `/public` directory to ensure proper fallback routing on traditional Apache web servers.
