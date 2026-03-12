# 🔍 Tech Stack Guessr

ever looked at a website and thought *"what did they build this with?"*

paste a URL → we dig through the headers and HTML → AI tells you exactly what's running underneath.

---

## what it does

| | |
|---|---|
| 🕵️ | reads real HTTP headers and cookies |
| 🧬 | scans HTML for fingerprints like `_next/static`, `wp-content/` |
| 🤖 | sends signals to Groq AI to reason over them |
| 📊 | returns confidence scores per technology |
| 🔬 | raw signals toggle — see exactly what was caught |

---

## stack

| layer | tech |
|---|---|
| backend | Laravel (PHP) |
| frontend | Next.js + TypeScript |
| AI | Groq — Llama 3 (free) |
| styling | Tailwind CSS |

---

## run it locally

> you need PHP 8.2+, Composer, Node 18+, and a free Groq key → [console.groq.com](https://console.groq.com)
```bash
# backend
cd backend && composer install
cp .env.example .env  # add your GROQ_API_KEY
php artisan key:generate && php artisan serve

# frontend
cd frontend && npm install && npm run dev
```

open `http://localhost:3000` ✓

---

## how it works
```
URL entered
  → Laravel fetches it server-side        (bypasses CORS)
  → reads headers + scans HTML patterns   (real data)
  → sends signals to Groq AI              (reasoning)
  → confidence scores per technology      (results)
```

---

## why not just ask an AI?

ChatGPT, Claude, Gemini — they all guess from training data.
they don't actually visit the URL, so if a site migrated from 
WordPress to Next.js last month, they'll still say WordPress.

this tool fetches the live page every time. what you see is 
what's actually running right now.

### real data vs trained memory

AI models have a knowledge cutoff. websites change constantly.
this tool has no cutoff — it reads the page live on every scan.

### why server-side matters

fetching from the browser gets blocked by CORS on most sites.
Laravel runs the request server-side, so nothing gets blocked.
that's also why this needs a backend at all.

**this tool reads the live page on every scan. no memory. no cutoff. just what's there right now.**

---

## license

MIT — do whatever you want with it.