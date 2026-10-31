from dotenv import load_dotenv
from pathlib import Path
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import uuid
import logging
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Literal

from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, EmailStr


# ---------- Mongo ----------
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# ---------- Config ----------
JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24

# ---------- App ----------
app = FastAPI(title="Shan Brothers Manpower Consultants API")
api_router = APIRouter(prefix="/api")
security = HTTPBearer(auto_error=False)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("shan_brothers")


# ---------- Auth helpers ----------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_current_admin(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> dict:
    if credentials is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"id": payload["sub"], "role": "admin"}, {"_id": 0, "password_hash": 0})
        if not user:
            raise HTTPException(status_code=401, detail="Admin not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------- Models ----------
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict


class CandidateCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=5, max_length=30)
    country: str = Field(min_length=2, max_length=80)
    trade: str = Field(min_length=2, max_length=80)
    experience_years: int = Field(ge=0, le=60)
    passport_available: bool = False
    resume_url: Optional[str] = None
    message: Optional[str] = Field(default=None, max_length=2000)


class Candidate(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: str
    phone: str
    country: str
    trade: str
    experience_years: int
    passport_available: bool = False
    resume_url: Optional[str] = None
    message: Optional[str] = None
    status: Literal["new", "contacted", "shortlisted", "closed"] = "new"
    created_at: str = Field(default_factory=now_iso)


class EmployerCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    company_name: str = Field(min_length=2, max_length=160)
    contact_person: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=5, max_length=30)
    country: str = Field(default="Singapore", max_length=80)
    workers_needed: int = Field(ge=1, le=10000)
    trade_needed: str = Field(min_length=2, max_length=200)
    deployment_timeline: Optional[str] = Field(default=None, max_length=120)
    message: Optional[str] = Field(default=None, max_length=2000)


class Employer(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company_name: str
    contact_person: str
    email: str
    phone: str
    country: str
    workers_needed: int
    trade_needed: str
    deployment_timeline: Optional[str] = None
    message: Optional[str] = None
    status: Literal["new", "contacted", "in_progress", "closed"] = "new"
    created_at: str = Field(default_factory=now_iso)


class ContactCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=30)
    subject: str = Field(min_length=2, max_length=200)
    message: str = Field(min_length=2, max_length=3000)


class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    subject: str
    message: str
    status: Literal["new", "read", "responded"] = "new"
    created_at: str = Field(default_factory=now_iso)


class StatusUpdate(BaseModel):
    status: str


# ---------- Public Routes ----------
@api_router.get("/")
async def root():
    return {"service": "Shan Brothers Manpower Consultants API", "status": "ok"}


@api_router.get("/health")
async def health():
    try:
        await db.command("ping")
        return {"status": "healthy", "time": now_iso()}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"DB unavailable: {e}")


@api_router.post("/candidates", response_model=Candidate, status_code=201)
async def create_candidate(payload: CandidateCreate):
    candidate = Candidate(**payload.model_dump())
    await db.candidates.insert_one(candidate.model_dump())
    logger.info(f"New candidate application: {candidate.email} ({candidate.trade})")
    return candidate


@api_router.post("/employers", response_model=Employer, status_code=201)
async def create_employer(payload: EmployerCreate):
    employer = Employer(**payload.model_dump())
    await db.employers.insert_one(employer.model_dump())
    logger.info(f"New employer enquiry: {employer.company_name} ({employer.workers_needed} workers)")
    return employer


@api_router.post("/contacts", response_model=Contact, status_code=201)
async def create_contact(payload: ContactCreate):
    contact = Contact(**payload.model_dump())
    await db.contacts.insert_one(contact.model_dump())
    logger.info(f"New contact message from {contact.email}: {contact.subject}")
    return contact


# ---------- Auth Routes ----------
@api_router.post("/auth/login", response_model=LoginResponse)
async def login(payload: LoginRequest):
    email = payload.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(user["id"], user["email"])
    safe_user = {k: v for k, v in user.items() if k not in ("_id", "password_hash")}
    return LoginResponse(access_token=token, user=safe_user)


@api_router.get("/auth/me")
async def me(admin: dict = Depends(get_current_admin)):
    return admin


# ---------- Admin Routes ----------
@api_router.get("/admin/candidates", response_model=List[Candidate])
async def list_candidates(admin: dict = Depends(get_current_admin)):
    docs = await db.candidates.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


@api_router.patch("/admin/candidates/{candidate_id}", response_model=Candidate)
async def update_candidate_status(candidate_id: str, update: StatusUpdate, admin: dict = Depends(get_current_admin)):
    if update.status not in ("new", "contacted", "shortlisted", "closed"):
        raise HTTPException(status_code=400, detail="Invalid status")
    result = await db.candidates.find_one_and_update(
        {"id": candidate_id},
        {"$set": {"status": update.status}},
        return_document=True,
        projection={"_id": 0},
    )
    if not result:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return result


@api_router.delete("/admin/candidates/{candidate_id}")
async def delete_candidate(candidate_id: str, admin: dict = Depends(get_current_admin)):
    result = await db.candidates.delete_one({"id": candidate_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return {"deleted": True}


@api_router.get("/admin/employers", response_model=List[Employer])
async def list_employers(admin: dict = Depends(get_current_admin)):
    docs = await db.employers.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


@api_router.patch("/admin/employers/{employer_id}", response_model=Employer)
async def update_employer_status(employer_id: str, update: StatusUpdate, admin: dict = Depends(get_current_admin)):
    if update.status not in ("new", "contacted", "in_progress", "closed"):
        raise HTTPException(status_code=400, detail="Invalid status")
    result = await db.employers.find_one_and_update(
        {"id": employer_id},
        {"$set": {"status": update.status}},
        return_document=True,
        projection={"_id": 0},
    )
    if not result:
        raise HTTPException(status_code=404, detail="Employer not found")
    return result


@api_router.delete("/admin/employers/{employer_id}")
async def delete_employer(employer_id: str, admin: dict = Depends(get_current_admin)):
    result = await db.employers.delete_one({"id": employer_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Employer not found")
    return {"deleted": True}


@api_router.get("/admin/contacts", response_model=List[Contact])
async def list_contacts(admin: dict = Depends(get_current_admin)):
    docs = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


@api_router.patch("/admin/contacts/{contact_id}", response_model=Contact)
async def update_contact_status(contact_id: str, update: StatusUpdate, admin: dict = Depends(get_current_admin)):
    if update.status not in ("new", "read", "responded"):
        raise HTTPException(status_code=400, detail="Invalid status")
    result = await db.contacts.find_one_and_update(
        {"id": contact_id},
        {"$set": {"status": update.status}},
        return_document=True,
        projection={"_id": 0},
    )
    if not result:
        raise HTTPException(status_code=404, detail="Contact not found")
    return result


@api_router.delete("/admin/contacts/{contact_id}")
async def delete_contact(contact_id: str, admin: dict = Depends(get_current_admin)):
    result = await db.contacts.delete_one({"id": contact_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"deleted": True}


@api_router.get("/admin/stats")
async def admin_stats(admin: dict = Depends(get_current_admin)):
    candidates_total = await db.candidates.count_documents({})
    candidates_new = await db.candidates.count_documents({"status": "new"})
    employers_total = await db.employers.count_documents({})
    employers_new = await db.employers.count_documents({"status": "new"})
    contacts_total = await db.contacts.count_documents({})
    contacts_new = await db.contacts.count_documents({"status": "new"})
    return {
        "candidates": {"total": candidates_total, "new": candidates_new},
        "employers": {"total": employers_total, "new": employers_new},
        "contacts": {"total": contacts_total, "new": contacts_new},
    }


# ---------- App wiring ----------
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Startup ----------
@app.on_event("startup")
async def on_startup():
    # Indexes
    await db.users.create_index("email", unique=True)
    await db.candidates.create_index("created_at")
    await db.employers.create_index("created_at")
    await db.contacts.create_index("created_at")

    # Seed admin
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@shanbrothers.sg").lower().strip()
    admin_password = os.environ.get("ADMIN_PASSWORD", "ShanAdmin@2025")
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "name": "Administrator",
            "role": "admin",
            "password_hash": hash_password(admin_password),
            "created_at": now_iso(),
        })
        logger.info(f"Seeded admin user: {admin_email}")
    else:
        # If .env password changed, update hash (idempotent)
        if not verify_password(admin_password, existing.get("password_hash", "")):
            await db.users.update_one(
                {"email": admin_email},
                {"$set": {"password_hash": hash_password(admin_password)}},
            )
            logger.info(f"Updated admin password for: {admin_email}")


@app.on_event("shutdown")
async def shutdown():
    client.close()
