import os
import re
import ipaddress
import logging
import time
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, EmailStr, field_validator
from motor.motor_asyncio import AsyncIOMotorClient

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(ROOT_DIR, ".env"))

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("divyansh.os")

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "divyansh_os")
GITHUB_USERNAME = os.environ.get("GITHUB_USERNAME", "Divyansh7agl").strip()
LEETCODE_USERNAME = os.environ.get("LEETCODE_USERNAME", "Divyansh7agl").strip()

try:
    client = AsyncIOMotorClient(MONGO_URL, serverSelectionTimeoutMS=2000)
    db = client[DB_NAME]
except Exception as e:
    logger.warning("MongoDB client init failed: %s", e)
    client = None
    db = None

app = FastAPI(title="DIVYANSH.OS API")
api_router = APIRouter(prefix="/api")

# ------------------------------------------------------------------
# Managed email (Emergent proxy) — see RESEND_EMAIL_PLAYBOOK
# ------------------------------------------------------------------
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY", "")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "DIVYANSH.OS")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "")

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as aclient:
            resp = await aclient.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        try:
            code = e.response.json().get("code", "")
        except ValueError:
            code = ""
        if code in ("insufficient_credits", "integration_disabled", "daily_limit_reached"):
            logger.warning(f"Email paused: {code} ({e.response.status_code})")
            raise HTTPException(status_code=503, detail="Email is temporarily unavailable")
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


# ------------------------------------------------------------------
# Models
# ------------------------------------------------------------------
class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: EmailStr
    subject: str = Field(min_length=2, max_length=120)
    message: str = Field(min_length=10, max_length=5000)

    @field_validator("name", "subject", "message")
    @classmethod
    def not_blank(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Value must not be blank")
        return v


# ------------------------------------------------------------------
# Health
# ------------------------------------------------------------------
@api_router.get("/")
async def root():
    return {"status": "ok", "service": "DIVYANSH.OS", "time": datetime.now(timezone.utc).isoformat()}


# ------------------------------------------------------------------
# Live stats: GitHub (cached 10 min)
# ------------------------------------------------------------------
_GH_CACHE = {"ts": 0.0, "data": None}
_GH_TTL = 600


async def _gh(path: str, aclient: httpx.AsyncClient):
    r = await aclient.get(f"https://api.github.com{path}")
    r.raise_for_status()
    return r.json()


@api_router.get("/stats/github")
async def github_stats():
    username = GITHUB_USERNAME
    if not username:
        return {"available": False, "reason": "GITHUB_USERNAME is not configured on the server."}
    now = time.time()
    if _GH_CACHE["data"] and now - _GH_CACHE["ts"] < _GH_TTL:
        return _GH_CACHE["data"]
    try:
        async with httpx.AsyncClient(timeout=15) as aclient:
            user = await _gh(f"/users/{username}", aclient)
            repos = await _gh(f"/users/{username}/repos?per_page=100&sort=updated", aclient)
            events = (
                await _gh(f"/users/{username}/events/public?per_page=100", aclient)
            )[:100]
    except Exception as e:
        logger.warning(f"GitHub fetch failed: {e}")
        return {"available": False, "reason": "GitHub API is not reachable right now.", "username": username}

    stars = sum(r.get("stargazers_count", 0) for r in repos)
    lang_count: dict = {}
    for r in repos:
        lang = r.get("language")
        if lang:
            lang_count[lang] = lang_count.get(lang, 0) + 1
    top_langs = sorted(lang_count.items(), key=lambda kv: -kv[1])[:6]

    top_repos = sorted(repos, key=lambda r: (-r.get("stargazers_count", 0), r.get("pushed_at") or ""))[:6]
    top_repos = [
        {
            "name": r.get("name"),
            "description": r.get("description"),
            "html_url": r.get("html_url"),
            "language": r.get("language"),
            "stars": r.get("stargazers_count", 0),
            "forks": r.get("forks_count", 0),
            "updated_at": r.get("updated_at"),
        }
        for r in top_repos
    ]

    # public activity per day (last 28 days)
    days: dict = {}
    cutoff = datetime.now(timezone.utc).replace(tzinfo=None)
    for ev in events:
        created = (ev.get("created_at") or "")[:10]
        if not created:
            continue
        days[created] = days.get(created, 0) + 1

    data = {
        "available": True,
        "username": username,
        "profile_url": f"https://github.com/{username}",
        "avatar_url": user.get("avatar_url"),
        "name": user.get("name") or username,
        "bio": user.get("bio"),
        "public_repos": user.get("public_repos", 0),
        "followers": user.get("followers", 0),
        "total_stars": stars,
        "top_languages": [{"name": k, "repos": v} for k, v in top_langs],
        "top_repos": top_repos,
        "activity": days,
    }
    _GH_CACHE["ts"] = now
    _GH_CACHE["data"] = data
    return data


# ------------------------------------------------------------------
# Live stats: LeetCode (official GraphQL, optional)
# ------------------------------------------------------------------
_LC_QUERY = """
query userProfile($username: String!) {
  matchedUser(username: $username) {
    username
    profile { ranking reputation }
    submitStats: submitStatsGlobal {
      acSubmissionNum { difficulty count }
    }
  }
}
"""


@api_router.get("/stats/leetcode")
async def leetcode_stats():
    username = LEETCODE_USERNAME
    if not username:
        return {
            "available": False,
            "configured": False,
            "reason": "LeetCode username is not configured. Set LEETCODE_USERNAME in the backend config to enable live stats.",
        }
    try:
        async with httpx.AsyncClient(timeout=15) as aclient:
            r = await aclient.post(
                "https://leetcode.com/graphql",
                json={"query": _LC_QUERY, "variables": {"username": username}},
            )
            r.raise_for_status()
            payload = r.json()
    except Exception as e:
        logger.warning(f"LeetCode fetch failed: {e}")
        return {"available": False, "configured": True, "reason": "LeetCode data is not reachable right now."}

    mu = (payload.get("data") or {}).get("matchedUser")
    if not mu:
        return {"available": False, "configured": True, "reason": f"No LeetCode user found for '{username}'."}

    ac = (mu.get("submitStats") or {}).get("acSubmissionNum") or []
    by_diff = {row.get("difficulty"): row.get("count", 0) for row in ac}
    return {
        "available": True,
        "configured": True,
        "username": mu.get("username"),
        "profile_url": f"https://leetcode.com/{mu.get('username')}/",
        "ranking": (mu.get("profile") or {}).get("ranking"),
        "solved": {
            "easy": by_diff.get("Easy", 0),
            "medium": by_diff.get("Medium", 0),
            "hard": by_diff.get("Hard", 0),
            "total": by_diff.get("Easy", 0) + by_diff.get("Medium", 0) + by_diff.get("Hard", 0),
        },
    }


# ------------------------------------------------------------------
# Contact → MongoDB + managed email
# ------------------------------------------------------------------
@api_router.post("/contact")
async def contact_message(msg: ContactMessageCreate):
    doc = {
        "name": msg.name,
        "email": msg.email,
        "subject": msg.subject,
        "message": msg.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "emailed": False,
    }
    result = await db.contact_messages.insert_one(doc)

    emailed = False
    if OWNER_EMAIL:
        subject = f"DIVYANSH.OS — new message: {msg.subject}"
        html = (
            '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px;'
            'font-family:Arial,sans-serif;background:#080B12;color:#F2F6FB;">'
            f'<tr><td style="padding-bottom:12px;font-size:13px;color:#8B94A7;">New portfolio message from '
            f'<strong style="color:#00F0FF;">{escape(EMAIL_FROM_NAME)}</strong></td></tr>'
            f'<tr><td style="padding:6px 0;font-size:14px;"><strong>From:</strong> {escape(msg.name)} '
            f'({escape(msg.email)})</td></tr>'
            f'<tr><td style="padding:6px 0;font-size:14px;"><strong>Subject:</strong> {escape(msg.subject)}</td></tr>'
            f'<tr><td style="padding:12px 0;font-size:14px;line-height:1.6;white-space:pre-wrap;">'
            f"{escape(msg.message)}</td></tr>"
            f'<tr><td style="padding-top:16px;font-size:12px;color:#8B94A7;">Reply directly to this email to answer '
            f'{escape(msg.name)}. We never ask for passwords or card details by email.</td></tr>'
            "</table>"
        )
        try:
            await send_email(to=OWNER_EMAIL, subject=subject, html=html, reply_to=msg.email)
            emailed = True
        except HTTPException as e:
            # message is safely stored; surfacing email unavailability would fail the user for nothing
            logger.warning(f"Contact stored but email not sent: {e.detail}")

    await db.contact_messages.update_one({"_id": result.inserted_id}, {"$set": {"emailed": emailed}})
    return {
        "status": "ok",
        "id": str(result.inserted_id),
        "emailed": emailed,
        "message": "Message received — thanks for reaching out.",
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()
