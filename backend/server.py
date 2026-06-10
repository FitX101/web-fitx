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
        "slug": "ai-powered-fitness-tracking-future",
        "title": "Why AI-Powered Fitness Tracking Is The Future Of Personal Health",
        "excerpt": "Artificial intelligence is rewriting the rules of how we train, eat, and recover. Here's how FitX uses it to give you a coach in your pocket.",
        "content": "For decades, fitness apps were nothing more than digital notebooks — places to manually log a workout, a meal, or a weight. They tracked, but they never understood. That era is ending.\n\nAI-powered fitness coaching represents a fundamental shift: software that observes your patterns, learns your habits, and adapts in real time. When you log a heavy leg day on FitX, the system doesn't just store the data — it adjusts tomorrow's recovery target, recalibrates your calorie burn estimate, and nudges your protein intake to match.\n\nThe magic is in the millions of micro-decisions you used to make alone. Should you push through the soreness? Eat a heavier breakfast? Skip cardio today? FitX answers these with a confidence built from your own data, not a generic plan written for someone else.\n\nWe're entering an age where your trainer never sleeps, never forgets your goals, and never charges by the hour. That's the promise of AI in fitness, and that's exactly what we're building.\n\nStart your journey with FitX today — download the app on iOS or Android.",
        "author": "FitX Team",
        "category": "Technology",
        "cover_image": "https://images.unsplash.com/photo-1637430308606-86576d8fef3c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29ya291dCUyMGd5bSUyMHRyYWluaW5nfGVufDB8fHx8MTc4MTA4MjMxMXww&ixlib=rb-4.1.0&q=85",
        "read_time": "6 min read",
        "published_at": "2026-01-12",
    },
    {
        "slug": "macros-explained-protein-carbs-fats",
        "title": "Macros 101: How To Actually Hit Your Protein, Carbs, and Fats",
        "excerpt": "Forget vague advice. Here's the math, the food choices, and the FitX shortcuts that make macro tracking effortless — even on cheat days.",
        "content": "Walk into any gym conversation and you'll hear the word \"macros\" thrown around like everyone agrees on what it means. They don't. Macros — short for macronutrients — are simply protein, carbohydrates, and fats: the three things your body actually burns for fuel and rebuilds with.\n\nHere's the framework FitX users live by:\n\nProtein: aim for 1.6 to 2.2 grams per kilogram of bodyweight if you're training seriously. This is the non-negotiable. Without enough protein, you're losing muscle, not fat.\n\nCarbohydrates: your performance fuel. Cut them too low and you'll feel it in the gym before you see it on the scale. We recommend 3 to 5 grams per kilogram on training days.\n\nFats: the rest. Don't fear them — your hormones, brain, and joints depend on them. Around 0.8 to 1 gram per kilogram is a healthy floor.\n\nThe hard part isn't knowing the numbers. It's hitting them every day. FitX automates the math: log a meal, see your remaining macros, and get smart suggestions for what to eat next. Even cheat meals get logged with their real nutritional impact — guilt-free, never untracked.\n\nDownload FitX and let your phone do the spreadsheet work.",
        "author": "Dr. Anika Reddy",
        "category": "Nutrition",
        "cover_image": "https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZGlldCUyMG1lYWwlMjBwcmVwJTIwbnV0cml0aW9ufGVufDB8fHx8MTc4MTA4MjMxMXww&ixlib=rb-4.1.0&q=85",
        "read_time": "8 min read",
        "published_at": "2026-01-08",
    },
    {
        "slug": "30-day-beginner-workout-plan",
        "title": "The 30-Day Beginner Workout Plan That Actually Builds A Habit",
        "excerpt": "If you've started — and stopped — a fitness journey more times than you can count, this minimalist 30-day plan is built for momentum, not burnout.",
        "content": "Most people quit the gym not because the workouts are too hard, but because they're too much. Two-hour sessions, twelve exercises, and a routine that demands more willpower than they have on a bad Tuesday.\n\nThis 30-day plan flips that. The goal is not to peak — it's to build the identity of someone who trains.\n\nWeek 1: 20 minutes a day. Three exercises. Bodyweight only. Squats, push-ups, planks. That's it.\n\nWeek 2: Add a fourth exercise — rows with a backpack, towel, or band. Still 20 minutes.\n\nWeek 3: Push to 30 minutes. Introduce one weighted movement if you have access. The habit is now real.\n\nWeek 4: Mix in a 15-minute walk after dinner. Your body now expects movement. Missing a day feels weirder than doing it.\n\nFitX tracks this entire arc for you — your streak, your minutes, your micro-wins. The dashboard shows you the curve of someone becoming a different person. That's the only motivation that lasts.\n\nReady to start? FitX is free to download.",
        "author": "Coach Marcus Wells",
        "category": "Training",
        "cover_image": "https://images.unsplash.com/photo-1722925541142-5db2668ca492?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwzfHxmaXRuZXNzJTIwd29ya291dCUyMGd5bSUyMHRyYWluaW5nfGVufDB8fHx8MTc4MTA4MjMxMXww&ixlib=rb-4.1.0&q=85",
        "read_time": "7 min read",
        "published_at": "2026-01-04",
    },
    {
        "slug": "cheat-meal-science-without-guilt",
        "title": "The Science Of Cheat Meals: Why Pizza Doesn't Have To Wreck Your Week",
        "excerpt": "Nutritionists weigh in on why one indulgent meal isn't the enemy — and how to track it the smart way so you stay in control.",
        "content": "There is no food on earth that, eaten once, will ruin your progress. The diet industry built a multi-billion dollar empire pretending otherwise.\n\nA cheat meal — a deliberate, planned indulgence — does three useful things. It restores leptin levels that drop during a calorie deficit, giving your metabolism a small boost. It reduces the psychological pressure of dieting, which is the single biggest predictor of failure. And it teaches you that food is not a moral category.\n\nThe trick isn't avoiding cheat meals. It's logging them honestly.\n\nFitX has a dedicated Cheat Meal tracker for exactly this reason. Log the pizza, see the macros, watch the system absorb it into your weekly average, and move on. No guilt, no \"starting over Monday,\" no spiral.\n\nThe data tells the truth: users who track cheat meals on FitX hit their long-term goals 2.3x more often than those who don't. Honesty beats restriction.\n\nDownload FitX today and meet your goals without giving up your favorite foods.",
        "author": "Sarah Chen, RD",
        "category": "Nutrition",
        "cover_image": "https://images.unsplash.com/photo-1606858374191-c18040e98ad7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHw0fHxoZWFsdGh5JTIwZGlldCUyMG1lYWwlMjBwcmVwJTIwbnV0cml0aW9ufGVufDB8fHx8MTc4MTA4MjMxMXww&ixlib=rb-4.1.0&q=85",
        "read_time": "5 min read",
        "published_at": "2025-12-28",
    },
    {
        "slug": "best-meal-prep-strategy-busy-people",
        "title": "The Meal Prep Strategy For People Who Don't Have Time For Meal Prep",
        "excerpt": "A two-hour Sunday system that delivers seven days of macro-balanced meals — engineered for people with full calendars and zero patience.",
        "content": "Meal prep has a branding problem. It conjures images of fitness influencers with twelve identical Tupperware containers and a free Saturday. That's not the version that works for most people.\n\nThe FitX-approved version takes two hours and uses three principles.\n\nOne: cook one protein, one carb, one vegetable in bulk. That's it. Grilled chicken, rice, broccoli. Salmon, sweet potato, spinach. Tofu, quinoa, peppers. Boring is the point — boring is repeatable.\n\nTwo: portion by hand, not by scale. Your palm is your protein serving. Your cupped hand is your carb. A fist is your veggie. FitX will tell you if you need to adjust.\n\nThree: build five containers, not seven. The other two days are leftovers, takeout (logged honestly), or your weekly cheat meal. Plan for life, not for fantasy.\n\nThis is how FitX power users stay consistent without losing their weekends. The app handles the calorie math; you handle the chopping board.\n\nStart your prep journey with FitX, available on the App Store and Google Play.",
        "author": "FitX Team",
        "category": "Nutrition",
        "cover_image": "https://images.unsplash.com/photo-1667499745120-f9bcef8f584e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwyfHxoZWFsdGh5JTIwZGlldCUyMG1lYWwlMjBwcmVwJTIwbnV0cml0aW9ufGVufDB8fHx8MTc4MTA4MjMxMXww&ixlib=rb-4.1.0&q=85",
        "read_time": "6 min read",
        "published_at": "2025-12-20",
    },
    {
        "slug": "tracking-progress-beyond-the-scale",
        "title": "Why The Scale Is Lying To You — And What To Track Instead",
        "excerpt": "Weight fluctuates by up to four pounds in a single day. Here are the five metrics FitX uses to give you the real picture of your transformation.",
        "content": "If you've ever weighed yourself in the morning, felt great, then again at night and felt defeated — you've experienced the cruelest lie in fitness: the scale.\n\nDaily weight is a meaningless number. It swings with water retention, sodium intake, glycogen storage, and what time you last used the bathroom. A four-pound morning-to-evening fluctuation is completely normal and reveals nothing about fat or muscle.\n\nHere's what actually matters, and what FitX tracks for you:\n\nOne: seven-day weight average. Daily noise smooths out. The trendline is the truth.\n\nTwo: body measurements — waist, hips, chest, arms. Muscle is denser than fat; the tape measure catches what the scale misses.\n\nThree: progress photos at consistent lighting and time. Your eyes adapt to your reflection daily; photos don't.\n\nFour: strength progression. If you're lifting more this month than last month while eating in a deficit, you're winning regardless of weight.\n\nFive: how your clothes fit. Old jeans are the most honest mirror in your house.\n\nFitX visualizes all five, so the daily scale lie can't derail you. Real progress lives in the lines you can't see day-to-day.\n\nDownload FitX and start tracking what actually matters.",
        "author": "Dr. Anika Reddy",
        "category": "Health",
        "cover_image": "https://images.unsplash.com/photo-1548690312-e3b507d8c110?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwyfHxmaXRuZXNzJTIwd29ya291dCUyMGd5bSUyMHRyYWluaW5nfGVufDB8fHx8MTc4MTA4MjMxMXww&ixlib=rb-4.1.0&q=85",
        "read_time": "7 min read",
        "published_at": "2025-12-14",
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
