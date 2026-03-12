# backend

Laravel API — handles fetching URLs server-side and calling Groq AI.
```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan serve
```

add your Groq key to `.env`:
```
GROQ_API_KEY=your_key_here
```

one endpoint: `POST /api/analyze` with `{ "url": "https://example.com" }`
