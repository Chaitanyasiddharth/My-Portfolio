import os
import json
import time
import datetime
import asyncio
from typing import List, Dict, Any, Generator
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import httpx

# Load env variables
load_dotenv()

app = FastAPI(title="Chaitanya Siddharth Portfolio Backend")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For local development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# PORT and DB setup
PORT = int(os.getenv("PORT", 8000))
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
EMERGENT_LLM_KEY = os.getenv("EMERGENT_LLM_KEY", "")

# Check if LLM Key is placeholder or empty
has_real_llm_key = bool(EMERGENT_LLM_KEY and EMERGENT_LLM_KEY != "your_key_here")

# Initialize MongoDB client asynchronously if available
db_connected = False
db = None

try:
    from motor.motor_asyncio import AsyncIOMotorClient
    # Set serverSelectionTimeoutMS to 2000 to timeout quickly if mongo is not running
    mongo_client = AsyncIOMotorClient(MONGODB_URI, serverSelectionTimeoutMS=2000)
    db = mongo_client["portfolio_db"]
    # We will verify the connection in startup
except Exception as e:
    print(f"Could not initialize MongoDB client: {e}. Falling back to JSON database.")

FALLBACK_DB_PATH = "db_fallback.json"

# Helper for local JSON database storage
def read_fallback_db() -> Dict[str, List[Dict[str, Any]]]:
    if not os.path.exists(FALLBACK_DB_PATH):
        return {}
    try:
        with open(FALLBACK_DB_PATH, "r") as f:
            return json.load(f)
    except Exception:
        return {}

def write_fallback_db(data: Dict[str, List[Dict[str, Any]]]):
    try:
        with open(FALLBACK_DB_PATH, "w") as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"Failed to write fallback database: {e}")

async def save_message_to_db(session_id: str, role: str, content: str):
    global db_connected
    message_doc = {
        "session_id": session_id,
        "role": role,
        "content": content,
        "timestamp": time.time()
    }
    
    if db_connected and db is not None:
        try:
            await db["chat_messages"].insert_one(message_doc)
            return
        except Exception as e:
            print(f"Error saving to MongoDB: {e}. Falling back to JSON.")
            db_connected = False
            
    # Fallback storage
    loop = asyncio.get_event_loop()
    def save_fallback():
        db_data = read_fallback_db()
        if session_id not in db_data:
            db_data[session_id] = []
        db_data[session_id].append(message_doc)
        write_fallback_db(db_data)
        
    await loop.run_in_executor(None, save_fallback)

async def get_history_from_db(session_id: str) -> List[Dict[str, Any]]:
    global db_connected
    if db_connected and db is not None:
        try:
            cursor = db["chat_messages"].find({"session_id": session_id}).sort("timestamp", 1)
            messages = await cursor.to_list(length=100)
            return [{"role": m["role"], "content": m["content"]} for m in messages]
        except Exception as e:
            print(f"Error reading from MongoDB: {e}. Falling back to JSON.")
            db_connected = False
            
    # Fallback storage
    loop = asyncio.get_event_loop()
    def load_fallback():
        db_data = read_fallback_db()
        history = db_data.get(session_id, [])
        # sort by timestamp just in case
        history.sort(key=lambda x: x.get("timestamp", 0))
        return [{"role": m["role"], "content": m["content"]} for m in history]
        
    return await loop.run_in_executor(None, load_fallback)

@app.on_event("startup")
async def startup_db_client():
    global db_connected
    if db is not None:
        try:
            # Trigger a simple command to check if MongoDB is alive
            await mongo_client.admin.command('ping')
            db_connected = True
            print("Successfully connected to MongoDB.")
        except Exception as e:
            print(f"MongoDB connection failed: {e}. Running in JSON fallback mode.")
            db_connected = False
    else:
        db_connected = False
        print("Running in JSON fallback mode (MongoDB not initialized).")

# Request Models
class ChatRequest(BaseModel):
    message: str
    session_id: str

class SummarizeRequest(BaseModel):
    role: str

# Context definitions for the AI model
def get_academic_year_string():
    now = datetime.datetime.now()
    year_num = now.year - 2024 + (1 if now.month >= 8 else 0)
    year_names = ["First", "Second", "Third", "Fourth"]
    return f"{year_names[year_num - 1]}-year" if 1 <= year_num <= 4 else ("Graduated" if year_num > 4 else "First-year")

PORTFOLIO_SYSTEM_PROMPT = f"""You are a smart, professional, and helpful AI assistant representing Chaitanya Siddharth on his portfolio website.
Always write in the first-person ("I" refers to Chaitanya) or speak as a knowledgeable assistant representing him, but maintaining a warm, developer-style tone. Let the visitor know you are his assistant.

Here is Chaitanya's profile information:
- Name: Chaitanya Siddharth
- Role: B.Tech AI & ML Student, Alliance University (Bangalore, India)
- Bio: {get_academic_year_string()} B.Tech in AI & ML at Alliance University. Strong Python, DSA, and problem-solving foundation.
- Contact:
  - Email: chaitanyasiddharth01@gmail.com
  - LinkedIn: linkedin.com/in/chaitanya-siddharth-a39609321
  - GitHub: github.com/Chaitanyasiddharth
- Skills:
  - Core: Artificial Intelligence, Machine Learning, Entrepreneurship, Academic Research, Python, Data Structures & Algorithms (DSA).
  - Web Stack: React 19, Tailwind CSS, FastAPI, MongoDB.
- Education:
  - Alliance University (Bangalore): B.Tech in Artificial Intelligence & Machine Learning (2024 - 2028). Status: Ongoing.
  - Class 12: Complete, science/math focus.
  - Class 10: Complete.
- Work Experience:
  - Open to Internships: Actively seeking opportunities in AI/ML engineering, data science, and software development.
  - Self-Directed Learner: Deep exploration in algorithms, deep learning models, and building modern web apps.
- Projects:
  1. Smart AI Camera: Real-time object detection with bounding boxes, heatmap overlays, and neural network inference visualization.
  2. Smart Pet Collar: An interactive collar displayed on a holographic dog model, mapping heartbeat, GPS location, and stress metrics.
  3. FactCheck AI: A claim validation pipeline that passes claims through multiple verification layers to output truth scores.
  4. Personal Portfolio Website: A dark-minimalist, editorial portfolio site featuring a React 19 frontend, FastAPI backend, and Claude AI integration.
- Certifications (tasteful placeholders, ready to update in mock.js):
  - Python for Data Science
  - Machine Learning Fundamentals
  - Data Structures and Algorithms
  - AI Ethics & Applications

Guidelines:
1. Keep responses concise, helpful, and directly related to Chaitanya's skills, projects, and background.
2. If asked about details not listed (like specific marks, other internships, or family), politely explain that those details are placeholders or not currently added.
3. Be professional and warm, showcasing a passionate builder's mentality.
"""

def generate_mock_chat_stream(user_message: str) -> Generator[str, None, None]:
    intro = "[DEMO MODE] Hi! I am Chaitanya's virtual AI assistant. Since the EMERGENT_LLM_KEY is not configured in `.env`, I am running in demo mode.\n\n"
    response_body = ""
    
    # Simple rule-based mock responses based on user query keywords
    msg = user_message.lower()
    if "project" in msg:
        response_body = "I have built several interesting projects: \n1. **Smart AI Camera** - real-time object detection with bounding boxes.\n2. **Smart Pet Collar** - health tracking on a holographic model.\n3. **FactCheck AI** - a pipeline to verify statements.\n\nWhich one would you like me to tell you more about?"
    elif "skill" in msg or "language" in msg or "python" in msg:
        response_body = "My core skills lie in Artificial Intelligence, Machine Learning, Python, and Data Structures & Algorithms. I also build full-stack web applications using React 19, Tailwind CSS, FastAPI, and MongoDB."
    elif "education" in msg or "university" in msg or "college" in msg:
        response_body = f"I am a {get_academic_year_string().lower()} B.Tech student in AI & ML at Alliance University in Bangalore, India. I maintain a strong foundation in math, Python programming, and data structures."
    elif "contact" in msg or "email" in msg or "hire" in msg:
        response_body = "You can contact me directly at chaitanyasiddharth01@gmail.com, view my projects on GitHub (github.com/Chaitanyasiddharth), or connect on LinkedIn (linkedin.com/in/chaitanya-siddharth-a39609321)."
    else:
        response_body = "Thank you for visiting! I am a B.Tech AI & ML student at Alliance University, Bangalore. I specialize in Python, ML research, and full-stack development. Feel free to ask me about my projects, education, or skills!"
        
    full_text = intro + response_body
    # Stream word-by-word to simulate SSE
    words = full_text.split(" ")
    for i, word in enumerate(words):
        space = " " if i < len(words) - 1 else ""
        yield f"data: {json.dumps({'token': word + space})}\n\n"
        time.sleep(0.04)
    yield "data: [DONE]\n\n"

def generate_mock_summarize_stream(role: str) -> Generator[str, None, None]:
    p1 = f"Paragraph 1: For a **{role}** position, my background as an AI & ML student at Alliance University provides a perfect academic and practical foundation. Having rigorous training in Python, Machine Learning, and Data Structures, I am quick to grasp complex technical requirements and implement robust solutions."
    p2 = "Paragraph 2: My projects, such as the Smart AI Camera and FactCheck AI, demonstrate my capability in handling live data streams, designing complex pipeline architectures, and working with modern machine learning models. I bring hands-on building experience that bridges the gap between academic theory and production systems."
    p3 = "Paragraph 3: I am driven by curiosity, a problem-solving mindset, and the ambition of a future founder. I am eager to apply my skills to your team as an intern, adapting quickly to your workflows and delivering high-quality contributions from day one."
    
    full_text = f"[DEMO MODE - Resume Pitch for {role}]\n\n{p1}\n\n{p2}\n\n{p3}"
    words = full_text.split(" ")
    for i, word in enumerate(words):
        space = " " if i < len(words) - 1 else ""
        yield f"data: {json.dumps({'token': word + space})}\n\n"
        time.sleep(0.04)
    yield "data: [DONE]\n\n"

# Endpoint: Chat stream (SSE)
@app.post("/api/chat/stream")
async def chat_stream(request: ChatRequest):
    # Save the user's message
    await save_message_to_db(request.session_id, "user", request.message)
    
    if not has_real_llm_key:
        # Fallback stream
        async def mock_generator():
            full_reply = ""
            for frame in generate_mock_chat_stream(request.message):
                if frame.startswith("data: ") and not frame.endswith("[DONE]\n\n"):
                    try:
                        data = json.loads(frame[6:])
                        full_reply += data.get("token", "")
                    except Exception:
                        pass
                yield frame
            # Save the full reply to DB
            await save_message_to_db(request.session_id, "assistant", full_reply.replace("[DEMO MODE] ", ""))
            
        return StreamingResponse(mock_generator(), media_type="text/event-stream", headers={"X-Accel-Buffering": "no"})

    # Real LLM integration (using standard HTTP request to Claude to ensure stability)
    async def claude_generator():
        # Load conversation history
        history = await get_history_from_db(request.session_id)
        
        # Build messages payload for Anthropic API
        messages = []
        # Anthropic messages must alternate User/Assistant and start with User
        for h in history[:-1]:  # exclude the last message we just saved to DB, we'll append it manually
            if h["role"] in ["user", "assistant"]:
                messages.append({"role": h["role"], "content": h["content"]})
                
        # Append latest user message
        messages.append({"role": "user", "content": request.message})
        
        headers = {
            "x-api-key": EMERGENT_LLM_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        }
        
        payload = {
            "model": "claude-3-5-sonnet-20241022", # Standard high-performance model
            "system": PORTFOLIO_SYSTEM_PROMPT,
            "messages": messages,
            "max_tokens": 1024,
            "stream": True
        }
        
        full_assistant_reply = ""
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                async with client.stream("POST", "https://api.anthropic.com/v1/messages", headers=headers, json=payload) as response:
                    if response.status_code != 200:
                        error_detail = await response.aread()
                        yield f"data: [ERROR] Anthropic API returned status {response.status_code}: {error_detail.decode()}\n\n"
                        yield "data: [DONE]\n\n"
                        return

                    async for line in response.aiter_lines():
                        if line.startswith("data:"):
                            line_data = line[5:].strip()
                            if not line_data:
                                continue
                            try:
                                event = json.loads(line_data)
                                if event.get("type") == "content_block_delta":
                                    token = event["delta"].get("text", "")
                                    full_assistant_reply += token
                                    yield f"data: {json.dumps({'token': token})}\n\n"
                            except Exception as e:
                                print(f"Error parsing SSE line: {e}")
                                
            # Save the final reply to the DB
            await save_message_to_db(request.session_id, "assistant", full_assistant_reply)
            yield "data: [DONE]\n\n"
            
        except Exception as e:
            yield f"data: [ERROR] Internal connection error: {str(e)}\n\n"
            yield "data: [DONE]\n\n"

    return StreamingResponse(claude_generator(), media_type="text/event-stream", headers={"X-Accel-Buffering": "no"})

# Endpoint: Conversation History
@app.get("/api/chat/history/{session_id}")
async def chat_history(session_id: str):
    history = await get_history_from_db(session_id)
    return {"history": history}

# Endpoint: Tailored Pitch stream (SSE)
@app.post("/api/summarize/stream")
async def summarize_stream(request: SummarizeRequest):
    if not has_real_llm_key:
        return StreamingResponse(generate_mock_summarize_stream(request.role), media_type="text/event-stream", headers={"X-Accel-Buffering": "no"})

    # Call Claude for a custom pitch
    async def pitch_generator():
        headers = {
            "x-api-key": EMERGENT_LLM_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        }
        
        summarize_system = """You are an AI assistant designed to draft custom resume pitches for Chaitanya Siddharth.
Based on the job role typed by the visitor, you will write a highly compelling 3-paragraph pitch demonstrating why Chaitanya is a great fit.

Format:
- Paragraph 1: Academic foundation in AI & ML at Alliance University and core programming readiness (Python, DSA).
- Paragraph 2: Experience from projects (Smart AI Camera, Smart Pet Collar, FactCheck AI) tailored to the typed role.
- Paragraph 3: Passion, growth mindset, ambition as a future founder, and internship readiness.

Tone: Warm, confident, and professional. Write in the first person ("I"). Keep it concise and highly persuasive."""

        payload = {
            "model": "claude-3-5-sonnet-20241022",
            "system": summarize_system,
            "messages": [{"role": "user", "content": f"Generate a tailored elevator pitch for a {request.role} role."}],
            "max_tokens": 1024,
            "stream": True
        }
        
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                async with client.stream("POST", "https://api.anthropic.com/v1/messages", headers=headers, json=payload) as response:
                    if response.status_code != 200:
                        error_detail = await response.aread()
                        yield f"data: [ERROR] Anthropic API returned status {response.status_code}: {error_detail.decode()}\n\n"
                        yield "data: [DONE]\n\n"
                        return

                    async for line in response.aiter_lines():
                        if line.startswith("data:"):
                            line_data = line[5:].strip()
                            if not line_data:
                                continue
                            try:
                                event = json.loads(line_data)
                                if event.get("type") == "content_block_delta":
                                    token = event["delta"].get("text", "")
                                    yield f"data: {json.dumps({'token': token})}\n\n"
                            except Exception as e:
                                print(f"Error parsing SSE line: {e}")
                                
            yield "data: [DONE]\n\n"
            
        except Exception as e:
            yield f"data: [ERROR] Internal connection error: {str(e)}\n\n"
            yield "data: [DONE]\n\n"

    return StreamingResponse(pitch_generator(), media_type="text/event-stream", headers={"X-Accel-Buffering": "no"})

# Endpoint: Check system config
@app.get("/api/status")
async def get_status():
    return {
        "mongodb_connected": db_connected,
        "llm_configured": has_real_llm_key,
        "storage_mode": "MongoDB" if db_connected else "Local JSON Fallback File",
        "llm_mode": "Anthropic Claude Live" if has_real_llm_key else "Simulated Developer Agent (Demo Mode)"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=PORT, reload=True)
