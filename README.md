# DIVYANSH.OS — Interactive Developer Portfolio

An interactive, multi-experience developer portfolio and desktop operating system interface for **Divyansh Agarwal** (Full Stack Developer & AI Builder).

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)

---

## ✨ Features

- **Immersive Linear Portfolio (`/`)**: Kinetic typography, smooth Lenis scrolling, dynamic terminal preview, interactive lab cards, and case studies.
- **Interactive Desktop OS Mode (`/os`)**: Draggable, minimizable, and maximizable windows, a glassmorphic floating dock, app launcher, live top bar with system telemetry, and a custom wallpaper engine.
- **Recruiter View (`/recruiter`)**: Linear, high-contrast, distraction-free view tailored for hiring managers and recruiters, featuring quick resume download, skill matrices, and verified metrics.
- **Interactive Shell Terminal**: Fully functional client-side shell terminal with real commands (`help`, `about`, `skills`, `projects`, `sudo hire divyansh`, `clear`, etc.).
- **Live Signals & Command Center**: Real-time GitHub and LeetCode activity integration with resilient local fallback and caching.
- **Engineering Lab**: Experimental technical builds and proof-of-concepts categorized by AI, cloud infrastructure, full-stack, and developer tooling.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19, React Router 7
- **Styling**: Tailwind CSS, Vanilla CSS custom design system, Glassmorphism
- **Animations & Interaction**: Framer Motion 11, Lenis smooth scrolling, Lucide icons
- **Notifications & UI**: Sonner, Radix UI primitives

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Database**: MongoDB with Motor (AsyncIO)
- **HTTP Client**: HTTPX for asynchronous upstream API fetching (GitHub & LeetCode)
- **Security & Validation**: Pydantic v2, CORS middleware

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (3.10 or higher)
- **Git**

### 1. Clone the repository
```bash
git clone https://github.com/Divyansh7agl/portfolio.git
cd portfolio
```

### 2. Frontend Setup
```bash
cd frontend
cp .env.example .env
npm install
npm start
```
The frontend will run on [http://localhost:3000](http://localhost:3000).

### 3. Backend Setup (Optional for local API & stats proxy)
```bash
cd ../backend
cp .env.example .env
pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```
The API will run on [http://localhost:8000](http://localhost:8000).

---

## 🧭 Routes

| Route | Description |
|---|---|
| `/` | Main interactive portfolio landing page |
| `/os` / `/desktop` | Interactive Cybernetic Desktop OS with draggable windows |
| `/recruiter` | Executive Recruiter view with light/dark theme switch |

---

## 📄 License

This project is licensed under the MIT License.
