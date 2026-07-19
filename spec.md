# Project Overview
Build a full-stack AI Operations platform called **GreenOps Code Auditor**. The platform allows developers to submit raw code snippets (Python, Java, C, C++) and uses Generative AI to analyze the computational time complexity (Big O), estimate a "Carbon Penalty Score" based on wasted CPU cycles, and automatically rewrite the code to be highly optimized. This solves a critical Green Tech problem: reducing data center carbon emissions by eliminating inefficient software architecture before it reaches production.

# Scope & Constraints
**Crucial System Constraint:** This system is entirely software-oriented with no hardware components required. The solution relies strictly on algorithmic analysis and cloud-based API integrations. 

# Tech Stack
*   **Frontend:** Next.js (App Router), React 18, Tailwind CSS, Axios, `lucide-react` (icons), and `react-simple-code-editor` (or Monaco Editor) for code input. State is managed via standard React hooks.
*   **Backend:** Python 3.10+, FastAPI, Uvicorn, Pydantic (for strict schema validation), and standard Python CORS middleware.
*   **AI Integration:** `google-genai` SDK using the Gemini 2.5 Flash model, strictly enforcing **Structured Outputs** (JSON schemas) for deterministic responses.
*   **Deployment Target:** Vercel (Frontend) and Render or Railway (Backend).

# Core Features

### 1. Code Ingestion & Validation
The UI must provide a developer-focused code editor where users can paste inefficient code. It requires a dropdown to select the programming language (Python, Java, C, C++) to provide accurate parsing context to the AI.

### 2. AI-Powered Algorithmic Analysis
The backend sends the code payload to the Gemini API using a system prompt configured for structured output. The AI acts as a senior GreenOps engineer, identifying the current time complexity (e.g., O(N^2)) and determining the most optimal mathematical approach (e.g., O(N) or O(1)).

### 3. Carbon Penalty Heuristics
The backend calculates a "Carbon Penalty Score" (0-100). This is a heuristic calculation heavily penalizing nested loops, unnecessary recursion, and memory leaks that cause excessive CPU cycle waste and power draw.

### 4. Dashboard Visualization
The frontend must parse the AI's JSON response and display it in a split-pane dashboard: Original metrics (styled with red/warning aesthetics) vs. Optimized metrics (styled with green/eco aesthetics), alongside the refactored code and an explanation of the optimization.

# Complete Specification - Frontend Pages
The application uses a Single Page Application (SPA) layout on the Next.js App Router (`/src/app/page.tsx`).

*   **Left Column (Editor Panel):** Contains the language selector dropdown, the syntax-highlighted code input area, and the "Run Green Audit" CTA button. The button must have a disabled loading state indicating "Analyzing computational overhead...".
*   **Right Column (Eco-Report Panel):** Displays a placeholder empty state initially. Upon a successful API response, it renders:
    *   A comparative metric widget showing Original Big O vs. Optimized Big O.
    *   A prominent "Carbon Penalty Score" gauge/badge (0-100).
    *   An "Analysis" text block explaining the architectural flaws.
    *   An "Optimized Code" block rendering the newly refactored code.

# Complete Specification - Backend Architecture

*   **Routes Layer (`main.py`):** Handles FastAPI HTTP routing, CORS configuration (whitelisting the Next.js frontend URL), and request parsing.
*   **Models Layer (`schemas.py`):** Defines Pydantic `BaseModel` classes (`CodeRequest` and `GreenOpsAudit`) to strictly define the JSON schema requested from the Gemini API.
*   **Services Layer (`ai_service.py`):** Houses the `google-genai` client logic. Handles prompt construction, temperature configuration (set to 0.1 for deterministic code tasks), and SDK invocation.

# Complete Specification - API Endpoints

### `GET /api/health`
*   **Purpose:** Backend service heartbeat and cold-start wake-up.
*   **Response:** `{"status": "healthy", "service": "GreenOps API"}`

### `POST /api/audit`
*   **Purpose:** Receives code, invokes Gemini AI, and returns the optimized report.
*   **Request Payload:**
    ```json
    {
      "code": "def find_dupes(arr):\n  res = []\n  for i in arr:\n    for j in arr:\n      if i == j:\n        res.append(i)\n  return res",
      "language": "Python"
    }
    ```
*   **Response Payload (Strict JSON enforced by Pydantic):**
    ```json
    {
      "original_complexity": "O(N^2)",
      "optimized_complexity": "O(N)",
      "carbon_penalty_score": 85,
      "explanation": "The original code uses a nested loop resulting in quadratic time complexity. Replacing it with a Hash Set reduces lookups to O(1).",
      "optimized_code": "def find_duplicates(arr):\n    return list(set(arr))"
    }
    ```

# Folder Structure

```text
greenops-auditor/
├── client/                 
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx    
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── EditorPanel.tsx
│   │   │   └── EcoReportPanel.tsx
│   │   └── lib/
│   │       └── api.ts      
│   ├── package.json
│   └── tailwind.config.js
├── server/                 
│   ├── main.py             
│   ├── schemas.py          
│   ├── ai_service.py       
│   ├── requirements.txt    
│   └── .env                
|──── spec.md

UI and UX Requirements
The UI must use a modern, dark-mode operator console aesthetic (bg-gray-900). Use monospace fonts (font-mono) for all code, metrics, and Big O notations. Use explicit color coding: Red (text-red-500, bg-red-900/50) for original inefficient metrics, and Emerald (text-emerald-400, bg-emerald-900/50) for optimized results. Include loading skeletons or spinners during the AI fetch cycle.

Security Requirements
Credential Isolation: The GEMINI_API_KEY must never be exposed to the client. It must only exist in the FastAPI .env file and server environment variables.

Validation: The backend must handle empty payloads or unsupported languages gracefully without throwing 500 errors.

Target Outcome
An operator pastes brute-force code into the UI, clicks audit, and within 3 seconds, a comprehensive, structured JSON response visually transforms the right panel into a diagnostic dashboard detailing exactly how much computational power (and carbon) was wasted, alongside the corrected code.



└── spec.md