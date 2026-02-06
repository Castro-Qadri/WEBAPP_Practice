@echo off
REM GFC Showcase - Quick Start Script for Windows

echo ==================================================
echo GFC Showcase - Production Setup (Windows)
echo ==================================================

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo Python is not installed
    pause
    exit /b 1
)

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed
    pause
    exit /b 1
)

echo [OK] Python and Node.js found

REM Setup Backend
echo.
echo Setting up Django Backend...
cd backend

if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

call venv\Scripts\activate.bat
pip install -q -r requirements.txt
python manage.py migrate
python manage.py load_products

echo [OK] Django backend setup complete
cd ..

REM Setup Middleware
echo.
echo Setting up Express Middleware...
cd middleware
call npm install -q
echo [OK] Express middleware setup complete
cd ..

REM Setup Frontend
echo.
echo Setting up Next.js Frontend...
cd frontend
call npm install -q
echo [OK] Next.js frontend setup complete
cd ..

REM Summary
echo.
echo ==================================================
echo Setup Complete!
echo ==================================================
echo.
echo To start the application, open 3 command prompts:
echo.
echo Terminal 1 (Django Backend):
echo cd backend ^&^& venv\Scripts\activate.bat ^&^& python manage.py runserver 8000
echo.
echo Terminal 2 (Express Middleware):
echo cd middleware ^&^& npm run dev
echo.
echo Terminal 3 (Next.js Frontend):
echo cd frontend ^&^& npm run dev
echo.
echo Then open: http://localhost:3000
echo.
echo Django Admin: http://localhost:8000/admin
echo API Docs: http://localhost:8000/api/docs
echo.
pause
