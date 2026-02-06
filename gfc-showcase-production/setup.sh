#!/bin/bash

# GFC Showcase - Quick Start Script
# This script sets up and runs all services

set -e

echo "=================================================="
echo "GFC Showcase - Production Setup"
echo "=================================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "\n${YELLOW}Checking prerequisites...${NC}"

if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Python 3 is not installed${NC}"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Python and Node.js found${NC}"

# Setup Backend
echo -e "\n${YELLOW}Setting up Django Backend...${NC}"
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate 2>/dev/null || . venv/Scripts/activate

pip install -q -r requirements.txt
python manage.py migrate
python manage.py load_products

echo -e "${GREEN}✓ Django backend setup complete${NC}"
cd ..

# Setup Middleware
echo -e "\n${YELLOW}Setting up Express Middleware...${NC}"
cd middleware
npm install -q
echo -e "${GREEN}✓ Express middleware setup complete${NC}"
cd ..

# Setup Frontend
echo -e "\n${YELLOW}Setting up Next.js Frontend...${NC}"
cd frontend
npm install -q
echo -e "${GREEN}✓ Next.js frontend setup complete${NC}"
cd ..

# Summary
echo -e "\n${GREEN}=================================================="
echo "Setup Complete!"
echo "==================================================${NC}"

echo -e "\n${YELLOW}To start the application, open 3 terminals and run:${NC}\n"

echo -e "${YELLOW}Terminal 1 (Django Backend):${NC}"
echo "cd backend && source venv/bin/activate && python manage.py runserver 8000"

echo -e "\n${YELLOW}Terminal 2 (Express Middleware):${NC}"
echo "cd middleware && npm run dev"

echo -e "\n${YELLOW}Terminal 3 (Next.js Frontend):${NC}"
echo "cd frontend && npm run dev"

echo -e "\n${GREEN}Then open: http://localhost:3000${NC}\n"

echo -e "${YELLOW}Django Admin: http://localhost:8000/admin${NC}"
echo -e "${YELLOW}API Docs: http://localhost:8000/api/docs${NC}\n"
