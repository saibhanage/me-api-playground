# Me-API Playground

A personal API that exposes my professional profile data (skills, projects, etc.) from a PostgreSQL database with a React frontend for interaction.

## Project Architecture Overview

```
predusk/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── config/
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── frontend/               # React application
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
├── database/              # Database schema and seeds
│   ├── schema.sql
│   └── seed.sql
└── README.md
```

## Tech Stack

- **Backend:** Node.js with Express
- **Database:** PostgreSQL
- **Frontend:** React (Vite)
- **Deployment:** Render (Backend/DB), Vercel (Frontend)

## Local Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL (local or cloud)
- Git

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

### Database Setup
```bash
# Connect to your PostgreSQL database
psql -d your_database_name -f database/schema.sql
psql -d your_database_name -f database/seed.sql
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Endpoint Documentation

### Health Check
```bash
curl http://localhost:3001/health
```
Response: `{"status": "ok"}`

### Get Profile
```bash
curl http://localhost:3001/profile
```

### Get Projects (with skill filter)
```bash
curl "http://localhost:3001/projects?skill=python"
```

### Search Projects
```bash
curl "http://localhost:3001/search?q=react"
```

### Update Profile (Basic Auth)
```bash
curl -X PUT http://localhost:3001/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic base64(username:password)" \
  -d '{"name": "Updated Name", "bio": "Updated bio"}'
```

## Database Schema

The database consists of three main tables:
- `profiles`: Personal information
- `skills`: Technical skills
- `projects`: Project details with skill associations

See `database/schema.sql` for complete schema definition.

## Deployment

### Database (Supabase/Render)
1. Create a PostgreSQL database on Supabase or Render
2. Run the schema and seed files
3. Note the connection string

### Backend (Render)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with Node.js buildpack

### Frontend (Vercel)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`

## Resume Link
[Your Resume Link Here]

## Development

- Backend runs on: http://localhost:3001
- Frontend runs on: http://localhost:5173
- Database: PostgreSQL (configure via .env)
