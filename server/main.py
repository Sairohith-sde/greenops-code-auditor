import os
import sys

# Ensure server directory is in python module search path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from schemas import CodeRequest, GreenOpsAudit
from ai_service import analyze_code


app = FastAPI(
    title="GreenOps Code Auditor API",
    description="Backend API for analyzing code computational complexity and Carbon Penalty Score",
    version="1.0.0",
)

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Whitelist all origins for hackathon deployment flexibility
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", status_code=status.HTTP_200_OK)
def root():
    """Root endpoint welcoming API clients."""
    return {
        "service": "GreenOps Code Auditor API",
        "status": "online",
        "health_check": "/api/health",
        "documentation": "/docs",
    }


@app.get("/api/health", status_code=status.HTTP_200_OK)
def health_check():
    """Service health check endpoint."""
    return {"status": "healthy", "service": "GreenOps API"}



@app.post("/api/audit", response_model=GreenOpsAudit, status_code=status.HTTP_200_OK)
def audit_code(payload: CodeRequest):
    """
    Receives source code and language context, invokes Gemini 2.5 Flash AI model,
    and returns computational complexity analysis and carbon penalty score.
    """
    if not payload.code or not payload.code.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Code payload cannot be empty.",
        )

    supported_languages = ["Python", "Java", "C", "C++"]
    if payload.language and payload.language not in supported_languages:
        # Gracefully handle unsupported languages by defaulting to Python context or continuing
        pass

    try:
        result = analyze_code(code=payload.code, language=payload.language)
        return result
    except ValueError as ve:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ve),
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Audit analysis failed: {str(e)}",
        )
