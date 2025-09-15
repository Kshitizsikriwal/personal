import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv

load_dotenv()
app = FastAPI(title="Kshitiz Resume Chatbot API")

# Vercel handles CORS, but this is good for local testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GROQ_API_KEY = os.getenv('GROQ_API_KEY')
GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

RESUME_CONTENT = """
Kshitiz Sikriwal – Computer Science Engineer...
""" # Your resume content here

class Query(BaseModel):
    query: str

# --- KEY CHANGE FOR VERCEL ---
# The endpoint is now the root ("/"). Vercel's file path (/api/server)
# will route the request to this function.
@app.post("/")
async def query_groq(data: Query):
    if not GROQ_API_KEY:
        return {"error": "API key not configured on the server."}

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
        return {"answer": answer} if answer else {"error": "No content in response from Groq API."}

    except httpx.HTTPStatusError as e:
        print(f"HTTP error contacting Groq API: {e.response.status_code} - {e.response.text}")
        return {"error": "Server error while processing the request."}
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return {"error": "An unexpected server error occurred."}

# The __name__ == "__main__" block is not needed for Vercel but doesn't hurt to keep for local testing.