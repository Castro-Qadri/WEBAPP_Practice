# GFC Showcase

Premium, scroll-driven product experiences for GFC fans, air coolers, and washing machines. Built with Next.js, GSAP, Express middleware, and Django.

## Stack
- Frontend: Next.js 14, React 18, Tailwind CSS, GSAP
- Middleware: Express (proxy + caching)
- Backend: Django + DRF

## Setup (Step by Step)

### 1) Frontend
```bash
cd gfc-showcase-production/frontend
npm install
npm run dev
```
Frontend runs at http://localhost:3000 (or 3001 if 3000 is busy).

### 2) Middleware
```bash
cd gfc-showcase-production/middleware
npm install
npm run dev
```
Middleware runs at http://localhost:5000.

### 3) Backend
```bash
cd gfc-showcase-production/backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver 8000
```
Backend runs at http://localhost:8000.

## Notes
- If you already have a backend venv, skip the venv creation step.
- If you see image placeholders, ensure the app can reach https://www.gfcfans.com.
