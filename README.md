<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run locally with Python backend

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/94029550-fe99-4d20-a2fd-95c141307d05

## Run Locally

**Prerequisites:** Node.js and Python 3.10+


1. Install frontend dependencies:
   `pnpm install`
2. Set backend environment values:
   - Copy `backend/.env.example` to `backend/.env` (optional defaults work locally)
3. Install backend dependencies:
   - Windows PowerShell:
     - `python -m venv backend/.venv`
     - `.\backend\.venv\Scripts\Activate.ps1`
     - `pip install -r backend/requirements.txt`
4. Start frontend and backend together:
   - `pnpm dev`

## Useful commands

- Frontend only: `pnpm dev:frontend`
- Backend only: `pnpm dev:backend`
- Health check: `http://localhost:8000/api/health`
