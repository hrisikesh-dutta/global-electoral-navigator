# 🗳️ GlobalElect — Electoral Navigator

> **A production-ready voter guidance platform for India's 2026 elections.**  
> Built with Google Antigravity for the **Prompt Wars Virtual Challenge — Hack 2 Skill 2026**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://global-electoral-navigator.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/hrisikesh-dutta/global-electoral-navigator)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)

---

## 🌐 Live Demo

**→ [https://global-electoral-navigator.vercel.app](https://global-electoral-navigator.vercel.app)**

**Admin Panel → [/admin](https://global-electoral-navigator.vercel.app/admin)**  
Username: `admin` | Password: `GlobalElect@2026`

---

## 🎯 The Problem

India has **968 million registered voters** across 543 constituencies and 22 official languages. Most first-time voters have no simple, modern platform to:
- Check if their name is on the electoral roll
- Find their polling booth
- Understand the voting process
- Know who the candidates are

**GlobalElect solves this** — a full-stack, glassmorphic, multi-language voter guidance platform.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ **5-Stage Gate Flow** | Guided onboarding — Citizenship → State → Age → EPIC → Oath |
| 🔍 **Voter Roll Verification** | EPIC + Date of Birth lookup against electoral data |
| 📥 **Voter Slip Download** | PDF generation via Blob API |
| 🤖 **AI Electoral Chatbot** | Keyword-based Q&A on the Learn page (EVM, VVPAT, booth) |
| 📚 **FAQ Accordion** | 6 common electoral questions with smooth CSS transitions |
| 🌐 **Multi-Language** | English, हिंदी, বাংলা — 9 more languages coming soon |
| 🗃️ **Admin CRUD Panel** | Full Data Manager for Elections, Constituencies, Candidates, Voters |
| 🔒 **Admin Auth** | Session-based login gate with secure credentials |
| 📊 **State Machine Editor** | Manage election phase transitions |
| 🎨 **Glassmorphism UI** | Dark navy, animated orbs, backdrop-blur cards |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + Vite 6 |
| **Styling** | Tailwind CSS v4 + Custom CSS (glassmorphism) |
| **State Management** | Zustand (gate flow) + React Context (theme, language) |
| **Routing** | React Router v6 (SPA with protected routes) |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Fonts** | Syne (display) · Inter (body) · DM Mono (data) |
| **Deployment** | Vercel (frontend) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/hrisikesh-dutta/global-electoral-navigator.git
cd global-electoral-navigator

# Install dependencies
npm install

# Start development server
npm run dev
```

App runs at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── admin/           # Admin panel pages (DataManager, ElectionsManager...)
├── components/      # Reusable UI (Button, Card, Badge, Header, VoterVerifyModal...)
├── context/         # React contexts (Language, Theme, Journey)
├── data/            # Mock JSON data (elections, candidates, voters, constituencies)
├── i18n/            # Translation files (en.json, hi.json, bn.json)
├── pages/           # Route pages (Landing, GateFlow, Dashboard, Learn...)
├── store/           # Zustand stores (gateStore.js)
└── index.css        # Global design tokens + glassmorphism utilities
```

---

## 🌍 Routes

| Route | Page | Access |
|---|---|---|
| `/` | Landing Page | Public |
| `/navigate` | 5-Stage Gate Flow | Public |
| `/dashboard` | Voter Dashboard | Requires S5 complete |
| `/learn` | Electoral Knowledge Hub + Chatbot | Public |
| `/guide` | How to Vote | Public |
| `/timeline` | Election Timeline | Public |
| `/find` | Constituency Finder | Requires S2 complete |
| `/admin` | Admin Dashboard | Login required |
| `/admin/data` | Data Manager (CRUD) | Login required |

---

## 🔐 Admin Panel

Access at `/admin` with:
- **Username:** `admin`
- **Password:** `GlobalElect@2026`

Features: Elections Manager, Constituency Manager, Candidate Manager, Voter Manager, State Machine Editor, Localization Manager, Alerts Composer, Roles & Access.

---

## 🏆 Built For

This project was built using **Google Antigravity** for the  
**[Prompt Wars Virtual Challenge](https://promptwars.in) — Hack 2 Skill 2026**

---

## 📄 License

MIT — feel free to fork, modify, and build upon this project.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/hrisikesh-dutta">hrisikesh-dutta</a>
  <br/>
  <a href="https://global-electoral-navigator.vercel.app">🌐 Live Demo</a> · 
  <a href="https://global-electoral-navigator.vercel.app/admin">🔧 Admin Panel</a>
</div>
