"""Backend API tests for FitX Global promotional site."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # Fallback to frontend .env
    from pathlib import Path
    env_path = Path("/app/frontend/.env")
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            if line.startswith("REACT_APP_BACKEND_URL"):
                BASE_URL = line.split("=", 1)[1].strip()
                break

BASE_URL = (BASE_URL or "").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root_status_ok(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("status") == "ok"
        assert "FitX" in data.get("message", "")


# ---------- Blogs ----------
class TestBlogs:
    def test_list_blogs_returns_6(self, session):
        r = session.get(f"{API}/blogs")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 6
        # Validate structure
        for p in data:
            for k in ("slug", "title", "excerpt", "content", "author", "category", "cover_image", "read_time", "published_at"):
                assert k in p and p[k]

    def test_get_blog_by_slug(self, session):
        list_r = session.get(f"{API}/blogs")
        slug = list_r.json()[0]["slug"]
        r = session.get(f"{API}/blogs/{slug}")
        assert r.status_code == 200
        data = r.json()
        assert data["slug"] == slug
        assert len(data["content"]) > 50

    def test_get_blog_invalid_slug_404(self, session):
        r = session.get(f"{API}/blogs/this-does-not-exist-xyz")
        assert r.status_code == 404

    def test_filter_by_category(self, session):
        r = session.get(f"{API}/blogs", params={"category": "Nutrition"})
        assert r.status_code == 200
        data = r.json()
        assert all(p["category"].lower() == "nutrition" for p in data)
        assert len(data) >= 1


# ---------- Newsletter ----------
class TestNewsletter:
    def test_newsletter_subscribe_success(self, session):
        email = f"TEST_news_{uuid.uuid4().hex[:8]}@example.com"
        r = session.post(f"{API}/newsletter", json={"email": email})
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"] == email
        assert "id" in data and isinstance(data["id"], str)
        assert "created_at" in data

    def test_newsletter_idempotent(self, session):
        email = f"TEST_news_idem_{uuid.uuid4().hex[:8]}@example.com"
        r1 = session.post(f"{API}/newsletter", json={"email": email})
        assert r1.status_code == 200
        id1 = r1.json()["id"]
        # Submit same email again - must NOT 500
        r2 = session.post(f"{API}/newsletter", json={"email": email})
        assert r2.status_code == 200, r2.text
        # Should return the same record
        assert r2.json()["id"] == id1

    def test_newsletter_invalid_email(self, session):
        r = session.post(f"{API}/newsletter", json={"email": "not-an-email"})
        assert r.status_code == 422

    def test_newsletter_persisted_in_list(self, session):
        email = f"TEST_news_list_{uuid.uuid4().hex[:8]}@example.com"
        session.post(f"{API}/newsletter", json={"email": email})
        r = session.get(f"{API}/newsletter")
        assert r.status_code == 200
        emails = [e["email"] for e in r.json()]
        assert email in emails


# ---------- Contact ----------
class TestContact:
    def test_contact_success(self, session):
        payload = {
            "name": "TEST_User",
            "email": f"TEST_contact_{uuid.uuid4().hex[:8]}@example.com",
            "message": "Hello, I love FitX!",
        }
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert "id" in data

    def test_contact_short_message_400(self, session):
        payload = {
            "name": "TEST_User",
            "email": "TEST_short@example.com",
            "message": "hi",
        }
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 400

    def test_contact_invalid_email(self, session):
        payload = {"name": "TEST_x", "email": "bad", "message": "Hello world"}
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 422
