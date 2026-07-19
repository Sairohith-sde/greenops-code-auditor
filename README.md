# 🌿 GreenOps Code Auditor

> **Idea2Impact Online Hackathon 2026 Submission**  
> **Theme 2:** Clean & Green Technology (Manufacturing Sustainability & Energy Management)

![GreenOps Banner](https://img.shields.io/badge/GreenOps-Code%20Auditor-10B981?style=for-the-badge&logo=leaf)
![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-000000?style=for-the-badge&logo=nextdotjs)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688?style=for-the-badge&logo=fastapi)
![Google GenAI](https://img.shields.io/badge/Google_GenAI-Gemini_2.5_Flash-4285F4?style=for-the-badge&logo=google)

---

## 💡 Overview

**GreenOps Code Auditor** is a software-only platform designed to eliminate unnecessary computational waste in cloud software. By leveraging Generative AI, GreenOps analyzes raw source code (Python, Java, C, C++), determines its Big O time complexity, calculates a **Carbon Penalty Score** based on CPU cycle waste, and automatically refactors inefficient algorithms into optimal structures before deployment.

---

## ⚡ Key Features

* **Multi-Language Ingestion:** Parses raw Python, Java, C, and C++ code snippets with accurate syntax context.
* **Deterministic AI Big O Analysis:** Powered by `google-genai` SDK using `gemini-2.5-flash` with strict Pydantic JSON schema enforcement.
* **Carbon Penalty Score (0–100):** A heuristic metric penalizing quadratic loops, excessive recursion, and memory leaks that waste CPU cycles.
* **Automated Code Refactoring:** Rewrites brute-force code into optimal algorithmic constructs (e.g., $O(N^2) \rightarrow O(N)$).
* **Split-Pane Eco Dashboard:** Modern dark-mode console displaying side-by-side metric comparisons (Original Red vs. Optimized Emerald), flaw analysis, and copyable refactored code.

---

## 🛠️ Tech Stack

### Frontend (`client/`)
* **Framework:** Next.js 14 (App Router), React 18, TypeScript
* **Styling:** Tailwind CSS (Custom Dark Mode Operator Console Palette)
* **Icons & HTTP:** `lucide-react`, Axios

### Backend (`server/`)
* **Framework:** Python 3.10+, FastAPI, Uvicorn
* **Schema Validation:** Pydantic `BaseModel`
* **AI Integration:** `google-genai` SDK (`gemini-2.5-flash`, `temperature=0.1`, structured JSON response schema)

---

## 📁 Repository Structure

```text
greenops-auditor/
├── client/                 # Next.js App Router Frontend
│   ├── src/
│   │   ├── app/            # Layout, Globals CSS & Main SPA Page
│   │   ├── components/     # EditorPanel & EcoReportPanel Components
│   │   └── lib/            # Axios API Client & TypeScript Interfaces
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # FastAPI Backend Server
│   ├── main.py             # HTTP Routes & CORS Middleware
│   ├── schemas.py          # Pydantic Schemas (CodeRequest, GreenOpsAudit)
│   ├── ai_service.py       # Google GenAI SDK Gemini Integration
│   ├── requirements.txt
│   └── .env
├── PROBLEM_STATEMENT.md    # Hackathon Submission Problem Statement
└── README.md
```

---

## 🚀 Quickstart & Local Setup

### Prerequisites
* Node.js v18+
* Python 3.10+
* Google Gemini API Key ([Get a key here](https://aistudio.google.com/))

### 1. Backend Setup (`server/`)
```bash
cd server

# Create and activate virtual environment
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
# Edit .env and set your GEMINI_API_KEY:
# GEMINI_API_KEY=your_actual_gemini_api_key

# Start FastAPI server
uvicorn main:app --reload --port 8000
```
> Backend runs at `http://localhost:8000`. Health check: `http://localhost:8000/api/health`.

### 2. Frontend Setup (`client/`)
```bash
cd client

# Install dependencies
npm install

# Start Next.js dev server
npm run dev
```
> Frontend runs at `http://localhost:3000`.

---

## 🌐 Deployment Instructions

* **Frontend:** Deployed to **Vercel** (`cd client && vercel`). Set `NEXT_PUBLIC_API_URL` to backend URL.
* **Backend:** Deployed to **Render** / **Railway** using Uvicorn. Set `GEMINI_API_KEY` in environment variables.

---

## 📄 License & Hackathon Details
Submitted for **Idea2Impact Online Hackathon 2026** under **Theme 2: Clean & Green Technology**.
