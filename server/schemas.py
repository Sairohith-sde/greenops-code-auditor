from pydantic import BaseModel, Field


class CodeRequest(BaseModel):
    code: str = Field(..., description="Raw source code snippet to audit")
    language: str = Field("Python", description="Programming language context (Python, Java, C, C++)")


class GreenOpsAudit(BaseModel):
    original_complexity: str = Field(..., description="Original Big O time complexity, e.g., O(N^2)")
    optimized_complexity: str = Field(..., description="Optimized Big O time complexity, e.g., O(N)")
    carbon_penalty_score: int = Field(..., ge=0, le=100, description="Heuristic score 0-100 indicating carbon/CPU inefficiency")
    explanation: str = Field(..., description="Detailed explanation of the computational flaws and optimization applied")
    optimized_code: str = Field(..., description="The refactored, high-efficiency code snippet")
