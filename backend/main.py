import json
import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


ROOT_DIR = Path(__file__).resolve().parent.parent
FIREBASE_CONFIG_PATH = ROOT_DIR / "firebase-applet-config.json"

app = FastAPI(title="Leads4U API", version="1.0.0")

allowed_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ALLOW_ORIGINS", "*").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

firebase_initialized = False
db = None


def init_firebase() -> None:
    # Import lazily so local development can run without Firebase Admin installed.
    try:
        import firebase_admin
        from firebase_admin import credentials, firestore
    except Exception:
        return

    global firebase_initialized, db

    if firebase_admin._apps:
        firebase_initialized = True
        db = firestore.client()
        return

    if not FIREBASE_CONFIG_PATH.exists():
        return

    config = json.loads(FIREBASE_CONFIG_PATH.read_text(encoding="utf-8"))
    project_id = config.get("projectId")
    database_id = config.get("firestoreDatabaseId")

    if not project_id:
        return

    firebase_admin.initialize_app(
        options={"projectId": project_id},
        credential=credentials.ApplicationDefault(),
    )

    if database_id:
        db = firestore.client(database_id=database_id)
    else:
        db = firestore.client()

    firebase_initialized = True


@app.on_event("startup")
def startup_event() -> None:
    try:
        init_firebase()
    except Exception as exc:
        # Keep API available locally even when Firebase ADC/config is missing.
        print(f"Firebase initialization skipped: {exc}")


@app.get("/api/health")
def health() -> dict:
    return {
        "status": "ok",
        "service": "python-backend",
        "firebase_initialized": firebase_initialized,
    }


@app.get("/")
def root() -> dict:
    return {"message": "Leads4U Python backend is running"}
