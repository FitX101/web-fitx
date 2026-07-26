from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="FitX Global API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class NewsletterCreate(BaseModel):
    email: EmailStr


class NewsletterEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


class ContactEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    title: str
    excerpt: str
    content: str
    author: str
    category: str
    cover_image: str
    read_time: str
    published_at: str


# ---------- Seed Blog Data ----------
BLOG_POSTS: List[dict] = [
    {
        "slug": "science-of-body-recomposition",
        "title": "The Science of Body Recomposition: Building Muscle While Dropping Fat",
        "excerpt": "Simultaneously losing fat and gaining muscle used to be the holy grail of impossible fitness goals. New research — and smart programming — says otherwise.",
        "content": "For years, the fitness industry told a simple story: to build muscle you must eat in a surplus, and to lose fat you must eat in a deficit. You cannot do both at once. That story was wrong.\n\nBody recomposition — losing fat mass while gaining lean muscle mass at the same time — is not just possible, it is measurable, repeatable, and increasingly the default protocol for smart lifters. Recent peer-reviewed studies in trained lifters show that when three variables are dialed in, recomposition happens without magic.\n\nVariable one: protein. Not \"high\" protein. Precisely 1.8 to 2.4 grams per kilogram of bodyweight, daily, non-negotiable. This is the single lever that makes the entire process work.\n\nVariable two: progressive overload in the gym. Recomposition without a lifting stimulus is just weight loss with extra steps. You must be adding weight to the bar, reps to the set, or quality to the movement — every single week.\n\nVariable three: a small, sustainable calorie deficit. Not aggressive. Not 800 calories below maintenance. Somewhere in the range of 200 to 400 calories under maintenance, tracked honestly. Aggressive deficits burn muscle. Moderate deficits burn only fat when protein and training are locked in.\n\nFitX automates all three. It calculates your protein target from your body metrics, tracks your workout progression session by session, and adjusts your daily calorie target based on your real trendline weight. This is the exact framework users are using to gain 3 to 5 kg of lean mass while losing 5 to 8 kg of fat over a 16-week cycle.\n\nRecomposition is not fast. It is not dramatic on a weekly basis. But it is the only physique change that survives long-term — because you are building the body you keep, not the body you starved to.\n\nDownload FitX free on the App Store or Google Play and start your recomposition today.",
        "author": "Dr. Anika Reddy",
        "category": "Training",
        "cover_image": "https://images.unsplash.com/photo-1722925541142-5db2668ca492?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwzfHxmaXRuZXNzJTIwd29ya291dCUyMGd5bSUyMHRyYWluaW5nfGVufDB8fHx8MTc4MTA4MjMxMXww&ixlib=rb-4.1.0&q=85",
        "read_time": "5 min read",
        "published_at": "2026-01-14",
    },
    {
        "slug": "plant-based-power-high-protein-vegan-eggetarian",
        "title": "Plant-Based Power: Mastering High-Protein Vegan & Eggetarian Meal Prep",
        "excerpt": "You do not need chicken and whey to hit 150 grams of protein. Here is the plant-based playbook — including eggetarian shortcuts — used by FitX athletes across India.",
        "content": "Ask most gym-goers how vegans and eggetarians hit their protein targets and you will get shrugs. The truth is, with the right pantry and a two-hour Sunday, plant-based lifters routinely clear 150 to 180 grams of protein daily. No supplements required.\n\nStart with the protein powerhouses. Paneer delivers 18 grams per 100 grams. Tofu delivers 16. Tempeh, the fermented cousin, hits 19. Chana (chickpea) dal cooks up to 8 grams per cooked cup — and eaten twice a day with rice, that is 16 grams before you count the rice itself. Soya chunks are the plant world's chicken breast: 52 grams of protein per 100 grams dry.\n\nFor eggetarians, add the ultimate protein multiplier. Three whole eggs give you 18 grams of complete protein with almost no cooking effort. Two eggs at breakfast plus one boiled egg as a snack easily add 25 to 30 grams to a plant-based day.\n\nThe meal prep system is three components on Sunday. Cook one big batch of soya chunk curry. Portion a large container of paneer or tofu bhurji. Keep 12 hard-boiled eggs in the fridge (skip if vegan). Add cooked chana or rajma as your base carb-protein double duty. Rotate through the week with brown rice, roti, or quinoa.\n\nMonday breakfast? Two eggs, paneer paratha. Snack? Roasted chana. Lunch? Rice + rajma. Post-workout? Tofu bhurji sandwich. Dinner? Soya chunk sabzi + roti. That is 145 grams of protein — vegetarian, mostly plant-based, ready in the fridge, no shakes needed.\n\nFitX comes preloaded with the full Indian food database. Log a paneer paratha, get the exact macros. Log soya chunks, get 52 grams counted correctly. The days of guessing plant protein are over.\n\nGet FitX free on iOS and Android — your plant-based transformation starts today.",
        "author": "Sarah Chen, RD",
        "category": "Nutrition",
        "cover_image": "https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZGlldCUyMG1lYWwlMjBwcmVwJTIwbnV0cml0aW9ufGVufDB8fHx8MTc4MTA4MjMxMXww&ixlib=rb-4.1.0&q=85",
        "read_time": "4 min read",
        "published_at": "2026-01-10",
    },
    {
        "slug": "intermediate-push-pull-legs-volume-optimization",
        "title": "Intermediate Push-Pull-Legs: Optimizing Volume for Maximum Gains",
        "excerpt": "You have outgrown the beginner three-day full body. Here is the six-day Push-Pull-Legs framework that intermediate lifters use to unlock the next level of muscle growth.",
        "content": "The classic beginner mistake is running a full-body routine forever, wondering why gains slow to a crawl after eighteen months. The classic intermediate mistake is jumping straight to a bro split and training each muscle group once a week. Neither optimizes volume — and volume, within a smart framework, is the driver of intermediate hypertrophy.\n\nEnter the Push-Pull-Legs split, done twice weekly. Six training days, one rest day, every muscle hit twice per week. Volume high, frequency ideal, recovery preserved.\n\nDay one — Push. Barbell bench press, 4 sets of 6 to 8 reps. Overhead press, 4 sets of 8 to 10. Incline dumbbell press, 3 sets of 10 to 12. Cable fly, 3 sets of 12 to 15. Triceps rope pushdown, 4 sets of 12 to 15. Overhead cable extension, 3 sets of 12 to 15. Total: 21 sets of pressing and triceps volume.\n\nDay two — Pull. Deadlift, 4 sets of 5. Pull-ups or lat pulldown, 4 sets of 8 to 10. Barbell row, 4 sets of 8 to 10. Face pulls, 4 sets of 15. Barbell curl, 4 sets of 10 to 12. Hammer curl, 3 sets of 12. Total: 23 sets of pulling volume.\n\nDay three — Legs. Back squat, 4 sets of 6 to 8. Romanian deadlift, 4 sets of 8. Leg press, 3 sets of 12. Walking lunge, 3 sets of 12 per leg. Leg curl, 4 sets of 12. Calf raise, 5 sets of 15. Total: 23 sets of leg volume.\n\nDay four to six — repeat, but with slight variations. Swap barbell bench for dumbbell bench on the second push day. Swap deadlift for T-bar row on the second pull day. Swap back squat for front squat on the second leg day. This variation prevents joint burnout and hits the same muscles from slightly different angles.\n\nProgression rule: add either 2.5 kg or one rep to a working set every single week. When you can complete every prescribed rep at the top of the range, add weight. When you cannot, stay put and consolidate.\n\nFitX has this exact PPL template built in. Log each set, and the app auto-suggests the next weight based on your last performance. That is how intermediates actually keep gaining — through structured progression, not vibes.\n\nDownload FitX now on the App Store and Google Play, and let your next PPL cycle be your best one yet.",
        "author": "Coach Marcus Wells",
        "category": "Workout Splits",
        "cover_image": "https://images.unsplash.com/photo-1637430308606-86576d8fef3c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29ya291dCUyMGd5bSUyMHRyYWluaW5nfGVufDB8fHx8MTc4MTA4MjMxMXww&ixlib=rb-4.1.0&q=85",
        "read_time": "6 min read",
        "published_at": "2026-01-06",
    },
]


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "FitX Global API", "status": "ok"}


@api_router.post("/newsletter", response_model=NewsletterEntry)
async def subscribe_newsletter(payload: NewsletterCreate):
    existing = await db.newsletter_subscribers.find_one({"email": payload.email})
    if existing:
        # Idempotent: don't error, just return existing
        existing.pop("_id", None)
        return NewsletterEntry(**existing)
    entry = NewsletterEntry(email=payload.email)
    await db.newsletter_subscribers.insert_one(entry.model_dump())
    return entry


@api_router.get("/newsletter", response_model=List[NewsletterEntry])
async def list_newsletter():
    subs = await db.newsletter_subscribers.find({}, {"_id": 0}).to_list(1000)
    return subs


@api_router.post("/contact", response_model=ContactEntry)
async def submit_contact(payload: ContactCreate):
    if len(payload.message.strip()) < 5:
        raise HTTPException(status_code=400, detail="Message too short")
    entry = ContactEntry(**payload.model_dump())
    await db.contact_messages.insert_one(entry.model_dump())
    return entry


@api_router.get("/blogs", response_model=List[BlogPost])
async def list_blogs(category: Optional[str] = None):
    posts = BLOG_POSTS
    if category and category.lower() != "all":
        posts = [p for p in posts if p["category"].lower() == category.lower()]
    return [BlogPost(**p) for p in posts]


@api_router.get("/blogs/{slug}", response_model=BlogPost)
async def get_blog(slug: str):
    for p in BLOG_POSTS:
        if p["slug"] == slug:
            return BlogPost(**p)
    raise HTTPException(status_code=404, detail="Blog post not found")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
