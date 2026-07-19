# Idea2Impact 2026 Hackathon — Submission Form Cheat Sheet

Use this cheat sheet to quickly fill out the official submission form at:
👉 **Submission Link:** https://forms.ccbp.in/acad-online-hackathon-project-submission

---

## Field 1: Theme & Problem Statement (Required · 01)

**Selected Theme:**  
Theme 2 · ♻️ Clean & Green Technology (Manufacturing Sustainability / Energy Management / Green Infrastructure)

**Problem Statement:**  
Modern data centers account for ~2% of global electricity consumption, generating carbon emissions equivalent to commercial aviation. A primary driver of this energy waste is inefficient software code—such as unoptimized nested loops ($O(N^2)$), improper recursion, and redundant memory churn—running across millions of cloud servers. 

Existing linters only check syntax or security flaws; they do not quantify computational carbon footprint or automatically refactor brute-force algorithms. **GreenOps Code Auditor** solves this by using AI to analyze code complexity in real-time, compute a Carbon Penalty Score based on wasted CPU cycles, and generate mathematically refactored, eco-optimized code.

---

## Field 2: Solution Description (Required · 02)

**Solution Overview:**  
GreenOps Code Auditor is an AI-powered static code analysis and optimization platform built with Next.js (App Router), FastAPI, and the `google-genai` SDK using Gemini 2.5 Flash.

**How it Works & AI Methods:**
1. **Code Ingestion:** Developers select their programming language (Python, Java, C, C++) and paste raw source code into an interactive editor panel.
2. **Deterministic AI Engine:** The FastAPI backend dispatches the payload to Gemini 2.5 Flash using strict Pydantic JSON schemas (`response_schema=GreenOpsAudit`, `temperature=0.1`).
3. **Carbon Penalty Heuristic:** The AI computes a 0–100 Carbon Penalty Score based on algorithmic complexity ($O(N^2), O(N^3)$ vs $O(N), O(1)$), penalizing wasted CPU cycles and thermal churn.
4. **Split-Pane Eco Dashboard:** Visualizes original vs. optimized Big O complexity (Red vs. Emerald badges), structural flaw explanations, and provides 1-click copyable refactored code.

---

## Field 3: GitHub Repository URL (Required · 03)

**GitHub Repo Link:** `https://github.com/YOUR_GITHUB_USERNAME/greenops-code-auditor`  
*(Ensure repository privacy is set to **Public**)*

---

## Field 4: Deployed Link (Required · 04)

**Deployed Web Application URL:** `https://greenops-code-auditor.vercel.app` (or your live deployed Vercel URL)

---

## Field 5: Demo Video Guide (2-3 Minutes Script) (Required · 05)

Upload your 2-3 minute screen recording to YouTube (set as Unlisted) or Google Drive (set permission to "Anyone with link can view"), and paste the link in the form.

### 🎬 Screen Recording Script & Walkthrough (2-3 Mins)

* **0:00 - 0:30 | Problem Introduction:**
  * Show title: *"GreenOps Code Auditor: Eliminating Software Carbon Emissions with AI"*.
  * Explain: *"Data centers consume gigawatt-hours of energy due to inefficient code running in production. Brute-force nested loops waste millions of CPU cycles daily."*

* **0:30 - 1:15 | Product & AI in Action:**
  * Open the live deployed web app. Point out the dark-mode operator console aesthetic and backend status indicator (`FastAPI Backend: ONLINE`).
  * Click **"Load Sample"** (or paste an inefficient Python $O(N^2)$ nested loop duplicate finder).
  * Click **"Run Green Audit"**. Show the loading state: *"Analyzing computational overhead..."*.

* **1:15 - 2:15 | Eco-Report & AI Diagnostics:**
  * Highlight the **Big O Comparison**: Original $O(N^2)$ (Red badge) vs. Optimized $O(N)$ (Emerald badge).
  * Highlight the **Carbon Penalty Score**: Show the 85/100 score and explain the custom heuristic CPU cycle penalty.
  * Walk through the **Architectural Flaw Analysis** text block.
  * Show the **Refactored Code** (replacing quadratic loop with a Hash Set) and click **"Copy Code"**.

* **2:15 - 2:30 | Conclusion & Impact:**
  * Conclude: *"GreenOps Code Auditor reduces CPU cycle overhead by up to 90%, helping developers write greener code before it ever hits production."*

---

### Quick Deployment Checklist (Before Submitting)
1. Push code to GitHub: `git add . && git commit -m "GreenOps Auditor submission" && git push origin main`
2. Make GitHub repository **Public**.
3. Deploy frontend to Vercel and backend to Render/Railway (or run server for demo video).
4. Record 2-3 minute video and copy link.
5. Submit form at `https://forms.ccbp.in/acad-online-hackathon-project-submission` before 11:59 PM!
