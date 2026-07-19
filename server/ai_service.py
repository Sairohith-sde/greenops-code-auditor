import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
from schemas import GreenOpsAudit

load_dotenv()

SYSTEM_INSTRUCTION = """
You are a Senior GreenOps Engineer and Algorithmic Performance Specialist.
Your task is to analyze raw code snippets for computational complexity, CPU cycle waste, and carbon inefficiency.

You must:
1. Determine the original Big O time complexity (e.g. O(N^2), O(2^N), O(N!)).
2. Provide the refactored, highly optimized code with optimal mathematical/algorithmic time complexity (e.g. O(N), O(1), O(N log N)).
3. Determine the optimized Big O time complexity.
4. Calculate a Carbon Penalty Score (integer between 0 and 100):
   - 0-20: Highly efficient code (linear O(N), logarithmic O(log N), or constant O(1)).
   - 21-50: Moderately inefficient code.
   - 51-85: High carbon penalty (nested loops O(N^2), quadratic recursion, redundant memory allocations).
   - 86-100: Extreme carbon penalty (cubic O(N^3), exponential O(2^N), factorial O(N!)).
5. Provide a clear, developer-focused explanation detailing the architectural flaws and why the optimized code reduces CPU cycle overhead and energy consumption.
"""

def analyze_code(code: str, language: str = "Python") -> GreenOpsAudit:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key == "your_gemini_api_key_here":
        raise ValueError("GEMINI_API_KEY environment variable is not configured.")

    client = genai.Client(api_key=api_key)

    prompt = f"""
Language Context: {language}

Analyze the following code for carbon inefficiency and algorithmic performance:

```{language.lower()}
{code}
```
"""

    config = types.GenerateContentConfig(
        system_instruction=SYSTEM_INSTRUCTION,
        temperature=0.1,
        response_mime_type="application/json",
        response_schema=GreenOpsAudit,
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=config,
    )

    if response.parsed:
        if isinstance(response.parsed, GreenOpsAudit):
            return response.parsed
        elif isinstance(response.parsed, dict):
            return GreenOpsAudit.model_validate(response.parsed)

    # Fallback parsing if needed
    if response.text:
        return GreenOpsAudit.model_validate_json(response.text)

    raise RuntimeError("Failed to receive structured response from Gemini API.")
