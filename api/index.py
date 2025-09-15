from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI(title="Kshitiz Resume Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GROQ_API_KEY = os.getenv('GROQ_API_KEY')
GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions' # Example endpoint

RESUME_CONTENT = """
Kshitiz Sikriwal – Computer Science Engineer...
"""

class Query(BaseModel):
    query: str

@app.post("/")
async def query_groq(data: Query):
    if not GROQ_API_KEY:
        raise HTTPException(status_code=500, detail="API key not configured on the server.")

    try:
        payload = {
            "model": "gemma2-9b-it",
            "messages": [
                {
                    "role": "system",
                    "content": (
                        f"You are a helpful and professional AI assistant representing Kshitiz Sikriwal. "
                        f"Answer questions based on his background. Keep answers concise and friendly. "
                        f"Resume info: {RESUME_CONTENT}"
                    ),
                },
                {"role": "user", "content": data.query},
            ],
        }
        headers = { "Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json" }

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(GROQ_API_URL, json=payload, headers=headers)
            response.raise_for_status()
            result = response.json()

        answer = result.get("choices", [{}])[0].get("message", {}).get("content")
        if not answer:
            raise HTTPException(status_code=502, detail="No content in response from Groq API.")
        return {"answer": answer}

    except httpx.HTTPStatusError as e:
        print(f"HTTP error contacting Groq API: {e.response.status_code} - {e.response.text}")
        raise HTTPException(status_code=502, detail="Error contacting Groq API.")

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail="An unexpected server error occurred.")
