# Murmur
Rails 8 API + React/TypeScript + MySQL + Webpack + Tailwind  
A mini Twitter-like app with follows, likes, delete-own, profiles, and pagination (10/page).
---

## Quick Start

### 1) Backend (Rails API)
```bash
cd backend
bundle install
# configure DB creds in config/database.yml (host, username, password, db names)
bin/rails db:migrate
bin/rails db:seed   # optional: adds sample users & murmurs
bin/rails s         # http://localhost:3000
```
### 2) Frontend (React + TS)
```cd frontend
npm install
npm run dev         # http://localhost:8080```
