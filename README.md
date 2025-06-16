# Quang Long Stone Bench Website

A full-stack web application for Quang Long Stone Bench, featuring a FastAPI + MongoDB backend and a Next.js (React) + Tailwind CSS frontend.

---

## Project Structure

```
/ (root)
│
├── backend/      # FastAPI backend (Python)
│   ├── app/      # Main backend application code
│   ├── ...
│
├── frontend/     # Next.js frontend (React, TypeScript, Tailwind CSS)
│   ├── app/      # Main frontend application code
│   ├── components/
│   ├── ...
│
└── README.md     # This file
```

---

## Backend (FastAPI + MongoDB)

### Requirements
- Python >= 3.9
- MongoDB
- uv (Python package manager)

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ghedaquanglong_website/backend
   ```
2. Create and activate a virtual environment:
   ```bash
   uv venv
   source .venv/bin/activate  # Linux/Mac
   # or
   .venv\Scripts\activate  # Windows
   ```
3. Install dependencies:
   ```bash
   uv pip install fastapi uvicorn motor passlib[bcrypt] python-jose
   ```
4. Create a `.env` file in `backend/`:
   ```env
   MONGODB_URL=mongodb://localhost:27017
   ```

### Running the Backend
```bash
uvicorn app.main:app --reload
```
- The API will be available at `http://localhost:8000`

---

## Frontend (Next.js + Tailwind CSS)

### Requirements
- Node.js >= 18
- pnpm or npm

### Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```
3. Create a `.env.local` file if needed for environment variables.

### Running the Frontend
```bash
pnpm dev
# or
npm run dev
```
- The frontend will be available at `http://localhost:3000`

---

## Usage
- Access the frontend at `http://localhost:3000`.
- The frontend communicates with the backend API at `http://localhost:8000`.
- Make sure both backend and frontend servers are running for full functionality.

---

## Notes
- Backend uses FastAPI, MongoDB, and JWT authentication.
- Frontend is built with Next.js (React), TypeScript, and Tailwind CSS.
- For development, use separate terminals for backend and frontend.

Feel free to customize this README with your project details, deployment instructions, or contribution guidelines.
