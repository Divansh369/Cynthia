# backend/api/main.py

from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import os
# --- NEW IMPORT ---
from fastapi.middleware.cors import CORSMiddleware 
# --- END NEW IMPORT ---

# Import the core prediction function
from backend.model.predict import chatbot_response 

# --- FastAPI Initialization ---
app = FastAPI(
    title="Cynthia Chatbot API",
    description="A simple API for the basic chatbot model.",
    version="1.0.0"
)

# --- NEW CORS CONFIGURATION ---
# Define the origins that are allowed to access this API
origins = [
    "http://localhost:3000",  # Allow your Next.js frontend during development
    # Add your production frontend URL here later (e.g., "https://your-chatbot-ui.com")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # List of allowed origins
    allow_credentials=True,           # Allow cookies/authorization headers
    allow_methods=["*"],              # Allow all methods (POST, GET, OPTIONS, etc.)
    allow_headers=["*"],)
# --- Pydantic Schema ---
# Defines the expected structure of the incoming JSON request
class ChatRequest(BaseModel):
    message: str # The user's input text

# --- API Endpoint ---
@app.post("/predict")
async def chat_predict(request: ChatRequest):
    """
    Receives a user message and returns the chatbot's response.
    """
    user_input = request.message
    
    # Get the response from the loaded model logic
    try:
        response_text = chatbot_response(user_input)
        
        return {
            "user_input": user_input, 
            "bot_response": response_text
        }
    except Exception as e:
        # Log error details in a production environment
        print(f"Prediction Error: {e}") 
        return {
            "user_input": user_input,
            "bot_response": "Sorry, I ran into an internal error. Please try again later."
        }

# --- Health Check Endpoint ---
@app.get("/health")
def health_check():
    """Simple endpoint to check if the API is running."""
    return {"status": "ok", "service": "chatbot_api"}

if __name__ == "__main__":
    # Local run command for testing
    uvicorn.run(app, host="0.0.0.0", port=8736)
