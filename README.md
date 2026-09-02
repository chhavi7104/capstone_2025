# 🎓 College Discovery Platform

A full-stack college discovery platform that helps students search, filter, compare, and predict suitable colleges based on entrance exam rank.

The project is built as a manual full-stack implementation using React, Express, MongoDB, Docker, and GitHub Actions.

---

## 🚀 Live Demo

### Frontend
https://client-amber-one-65.vercel.app

### Backend API
https://collage-selection-platform.onrender.com

### Health Check
https://collage-selection-platform.onrender.com/api/health

---

## ✨ Features

### 🔎 College Discovery
- Browse colleges from the database
- Search colleges by name
- Filter by:
  - State
  - City
  - Rating
  - Fees
  - Entrance exam
- Sort colleges
- Paginated results

### 🏫 College Details
- View detailed information about a college
- Fees
- Rating
- Location
- Exams accepted
- Cutoff information
- Other college details

### ⚖️ College Comparison
- Select 2–3 colleges
- Compare colleges side-by-side
- Compare important metrics
- Highlight better values for easier decision-making

### 🎯 College Predictor
- Select entrance exam
- Enter rank
- Get colleges matching the entered rank
- Shows cutoff rank and rank margin
- Results are categorized based on suitability

### 🔌 REST API
Backend APIs are implemented using Express and MongoDB.

### 🐳 Docker
- Separate Docker configuration for frontend and backend
- Docker Compose for local development
- Production-style container setup

### 🔄 CI
GitHub Actions automatically checks:

- Frontend dependency installation
- Frontend linting
- Frontend build
- Backend dependency installation
- Backend syntax
- Docker image builds

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- TanStack React Query
- Axios
- CSS

### Backend

- Node.js
- Express.js
- Mongoose
- REST API
- dotenv
- CORS

### Database

- MongoDB Atlas

### DevOps

- Docker
- Docker Compose
- GitHub Actions
- Vercel
- Render

---

## 📁 Project Structure

```text
collage_selection_platform/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   ├── Dockerfile
│   ├── package.json
│   └── .env
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── collegeController.js
│   │
│   ├── middleware/
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   └── College.js
│   │
│   ├── routes/
│   │   └── collegeRoutes.js
│   │
│   ├── utils/
│   │   └── queryHelpers.js
│   │
│   ├── app.js
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── docker-compose.yml
├── .gitignore
└── README.md

