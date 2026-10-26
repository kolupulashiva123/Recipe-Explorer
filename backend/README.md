# Recipe Explorer – Backend REST API

A lightweight, robust Node.js and Express backend providing a RESTful API for the Recipe Explorer application. Recipe and category information is stored cleanly in structured JavaScript data modules with zero external database dependencies.

## Features

- 🍲 **30+ Realistic Handcrafted Recipes** (Indian and International classics).
- 🏷️ **12 Curated Categories & Cuisines** with dynamic recipe counters.
- 🔍 **Full Search & Filter Engine**: Filter by keyword, ingredients, cuisine, meal type, dietary preference, cooking time, and difficulty.
- ⚡ **Sorting**: By Name (A-Z, Z-A), Rating, Preparation/Cooking time, or Popularity.
- 🛡️ **Centralized Error Handling**: Validates parameters and returns standard HTTP status codes (200, 400, 404, 500).
- 🌐 **CORS Pre-Configured**: Fully ready for Angular frontend communication on port 4200.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status and uptime |
| `GET` | `/api/recipes` | Get all recipes (supports query params: `q`, `category`, `cuisine`, `mealType`, `dietary`, `difficulty`, `maxTime`, `sortBy`, `page`, `limit`) |
| `GET` | `/api/recipes/:id` | Get single recipe details by ID |
| `GET` | `/api/categories` | Get all 12 categories with dynamic item counts |
| `GET` | `/api/recipes/search?q=` | Search recipes by name, description, tags, or ingredients |
| `GET` | `/api/recipes/category/:category` | Get recipes matching a category or slug |
| `GET` | `/api/recipes/cuisine/:cuisine` | Get recipes matching a cuisine (Indian, Italian, etc.) |

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
A `.env.example` file is included. By default, the server runs on port `5000`.
To customize:
```bash
cp .env.example .env
```

### 3. Start the Server
```bash
# Normal start
npm start

# Development mode with auto-reload (Node.js 18+)
npm run dev
```

The server will start at `http://localhost:5000`.
Test health: `http://localhost:5000/api/health`
