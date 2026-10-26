# Recipe Explorer – Discover, Cook & Enjoy 🍳

> **A full-stack, responsive, and modern web application for discovering recipes, searching ingredients, dynamically scaling serving sizes, and managing personal favorites.**

Built for food enthusiasts and designed to be clean, elegant, and beginner-friendly for college and capstone project demonstrations.

---

## 🌟 Key Highlights & Requirements Fulfillment

- ✅ **Full Separation of Concerns**: Modern Angular standalone frontend and decoupled Node.js Express REST API backend.
- ✅ **Local JavaScript Data Storage**: All 30+ recipes and 12 categories are housed in structured JavaScript modules (`recipes.js` and `categories.js`). **Zero external database dependencies** (No MongoDB, MySQL, Firebase).
- ✅ **Zero Paid APIs / Free to Run**: Operates 100% offline and cost-free without needing API keys or payment subscriptions.
- ✅ **Dynamic Proportional Serving Size Scaler**: Adjust servings from 1 to 24 with real-time mathematical recalculation of ingredient quantities.
- ✅ **Persistent Favorites via Browser `localStorage`**: Save and remove dishes with heart buttons; favorites persist across browser refreshes with no sign-in or account creation needed.
- ✅ **Multi-Dimensional Search & Filtering**: Search by recipe name or ingredients; filter by cuisine, meal type (breakfast, lunch, dinner, dessert), dietary preference (vegetarian, vegan, non-vegetarian), cooking time, and difficulty; sort by rating, name, or speed.
- ✅ **Interactive Cooking Steps & Progress Tracker**: Check off cooking steps with a live percentage completion bar and celebration card.
- ✅ **Print-Ready Recipe Sheets**: Custom `@media print` CSS cleanly strips navigation and UI widgets for paper or PDF printing.
- ✅ **Warm Culinary Theme**: Designed with warm orange, rich cream, fresh dark green, and charcoal tones, rounded cards, micro-interactions, and mobile responsiveness.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend** | Angular 18 (Standalone Components), TypeScript 5.5, HTML5, CSS3, Angular Router, HttpClient, RxJS |
| **Backend** | Node.js 18+, Express.js, CORS, Dotenv, REST API |
| **Data Storage** | Native JavaScript Modules (`backend/data/recipes.js`, `categories.js`) |
| **Client Storage** | Browser `localStorage` (HTML5 Web Storage API) |
| **Styling & Fonts** | Custom CSS3 variables, Plus Jakarta Sans, Playfair Display |

---

## 📁 Project Directory Structure

```text
recipe-explorer/
│
├── frontend/                               # Angular 18 Single-Page Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/                 # Reusable UI Components
│   │   │   │   ├── navbar/                 # Sticky navigation with mobile drawer & fav badge
│   │   │   │   ├── footer/                 # Links, newsletter mock, and college notes
│   │   │   │   ├── recipe-card/            # Responsive recipe card with badge & fav button
│   │   │   │   ├── search-bar/             # Search input with quick suggestion chips
│   │   │   │   └── recipe-filters/         # Multi-criteria filter toolbar & sort dropdown
│   │   │   ├── pages/                      # Application Route Views
│   │   │   │   ├── home/                   # Hero section, featured, categories & trending
│   │   │   │   ├── recipe-list/            # Explore recipes grid with live query params
│   │   │   │   ├── recipe-details/         # Scaler, nutrition card, interactive steps, print
│   │   │   │   ├── categories/             # 12 Curated category cards with recipe count
│   │   │   │   ├── favorites/              # Saved favorites persisted via localStorage
│   │   │   │   └── about/                  # Project architecture & live API status
│   │   │   ├── services/                   # Injectable Angular Services
│   │   │   │   ├── recipe.service.ts       # HttpClient communication with backend
│   │   │   │   └── favorites.service.ts    # RxJS BehaviorSubject + localStorage sync
│   │   │   ├── models/
│   │   │   │   └── recipe.model.ts         # TypeScript interfaces (Recipe, Ingredient, etc.)
│   │   │   ├── app.component.ts            # Root shell component
│   │   │   ├── app.component.html
│   │   │   ├── app.component.css
│   │   │   ├── app.config.ts               # Application providers (Router, HttpClient)
│   │   │   └── app.routes.ts               # Route table configuration
│   │   ├── index.html                      # HTML entry with metadata & Google Fonts
│   │   ├── main.ts                         # Bootstrap entry point
│   │   └── styles.css                      # Global theme variables, reset & print styles
│   ├── angular.json                        # Angular CLI build configuration
│   ├── package.json                        # Frontend dependencies
│   ├── tsconfig.json                       # TypeScript compiler options
│   └── README.md
│
├── backend/                                # Node.js & Express REST Backend
│   ├── data/
│   │   ├── recipes.js                      # 30+ comprehensive handcrafted recipes
│   │   └── categories.js                   # 12 Curated category classifications
│   ├── controllers/
│   │   └── recipe.controller.js            # Business logic, query filtering, dynamic counts
│   ├── routes/
│   │   └── recipe.routes.js                # REST API route definitions
│   ├── middleware/
│   │   └── errorHandler.js                 # Centralized 404 & 500 error handlers
│   ├── server.js                           # Express entry point & CORS configuration
│   ├── package.json                        # Backend dependencies
│   ├── .env.example                        # Example environment variables
│   └── README.md
│
├── .gitignore                              # Git exclusion rules (node_modules, dist, etc.)
└── README.md                               # Root documentation (this file)
```

---

## 🚀 Running Instructions (Local VS Code Setup)

To run the application locally, open the `recipe-explorer` folder in **Visual Studio Code** and use two separate terminal windows.

### Terminal 1: Start the Backend REST API Server

```bash
# 1. Navigate to the backend folder
cd backend

# 2. Install dependencies (express, cors, dotenv)
npm install

# 3. Start the backend server
npm start
```

- Server will start at: **`http://localhost:5000`**
- Health check verification: **`http://localhost:5000/api/health`**
- All recipes endpoint: **`http://localhost:5000/api/recipes`**

*(Optional: use `npm run dev` for auto-reloading if modifying backend code).*

---

### Terminal 2: Start the Angular Frontend

```bash
# 1. Navigate to the frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Start the Angular development server
npm start
```

- Open your browser at: **`http://localhost:4200`**
- The frontend will automatically connect to `http://localhost:5000/api`.

---

## 📡 Backend REST API Endpoints

| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/health` | — | Health check, service status, and uptime |
| `GET` | `/api/recipes` | `q`, `category`, `cuisine`, `mealType`, `dietary`, `difficulty`, `maxTime`, `sortBy`, `page`, `limit` | Get all recipes with rich multi-criteria filtering |
| `GET` | `/api/recipes/:id` | — | Get single recipe by numeric ID (returns 404 if not found) |
| `GET` | `/api/categories` | — | Get all 12 categories with dynamic live recipe counts |
| `GET` | `/api/recipes/search` | `q` | Dedicated search by name, description, or ingredients |
| `GET` | `/api/recipes/category/:category` | — | Filter recipes by category name or slug |
| `GET` | `/api/recipes/cuisine/:cuisine` | — | Filter recipes by cuisine (Indian, Italian, etc.) |

---

## 🍽️ Sample Recipe Dataset (30 Handcrafted Dishes)

The dataset in `backend/data/recipes.js` includes 30 varied Indian and International favorites:

1. **Chicken Biryani** (Indian, Dinner, Non-Veg)
2. **Paneer Butter Masala** (Indian, Dinner, Veg)
3. **Masala Dosa** (Indian, Breakfast, Veg)
4. **Idli Sambar** (Indian, Breakfast, Vegan)
5. **Vegetable Pulao** (Indian, Lunch, Veg)
6. **Chole Bhature** (Indian, Lunch, Veg)
7. **Palak Paneer** (Indian, Dinner, Veg)
8. **Butter Chicken** (Indian, Dinner, Non-Veg)
9. **Veg Fried Rice** (Chinese, Lunch, Vegan)
10. **Hakka Noodles** (Chinese, Dinner, Veg)
11. **Margherita Pizza** (Italian, Dinner, Veg)
12. **Pasta Alfredo** (Italian, Dinner, Veg)
13. **Spaghetti Bolognese** (Italian, Dinner, Non-Veg)
14. **Tacos** (Mexican, Dinner, Non-Veg)
15. **Pancakes** (American, Breakfast, Veg)
16. **French Toast** (French, Breakfast, Veg)
17. **Vegetable Sandwich** (Indian, Snack, Veg)
18. **Caesar Salad** (Italian, Lunch, Veg)
19. **Chocolate Cake** (American, Dessert, Veg)
20. **Brownies** (American, Dessert, Veg)
21. **Gulab Jamun** (Indian, Dessert, Veg)
22. **Rasmalai** (Indian, Dessert, Veg)
23. **Fruit Salad** (Continental, Breakfast, Vegan)
24. **Vegetable Soup** (Continental, Dinner, Vegan)
25. **Chicken Curry** (Indian, Dinner, Non-Veg)
26. **Egg Fried Rice** (Chinese, Lunch, Non-Veg)
27. **Samosa** (Indian, Snack, Veg)
28. **Aloo Paratha** (Indian, Breakfast, Veg)
29. **Dal Tadka** (Indian, Lunch, Veg)
30. **Mango Smoothie** (Continental, Breakfast, Veg)

---

## 🎓 College Presentation Walkthrough Guide

When presenting this project to evaluators:

1. **Homepage Demonstration**:
   - Showcase the hero banner, typography, and food photography.
   - Click one of the popular search tags (e.g. "Biryani") to show instant filtering.
   - Point out the 12 curated category cards with live calculated dish counts.

2. **Explore Recipes Page**:
   - Demonstrate combining multiple filters simultaneously (e.g., *Cuisine: Indian* + *Dietary: Vegetarian* + *Max Time: 40m*).
   - Show how the results counter updates in real time.
   - Demonstrate sorting (by Rating ⭐ or Quickest prep time).
   - Clear individual filters via chips, or use the "Reset All Filters" button.

3. **Serving Size Scaler (Feature Highlight)**:
   - Open a detailed recipe (e.g., *Chicken Biryani*).
   - Demonstrate the `+` and `−` stepper buttons in the **Serving Size Scaler**.
   - Show the evaluator how ingredient quantities (e.g., 2 cups rice, 700g chicken) proportionally double or scale down in real time.

4. **Interactive Cooking Steps & Progress**:
   - Click each cooking step checkbox to mark it complete.
   - Watch the cooking progress bar smoothly advance towards 100%.
   - Trigger the completion celebration card.

5. **Favorites & LocalStorage Persistence**:
   - Click the heart icon on any recipe. Note the badge in the navigation bar incrementing.
   - Navigate to `/favorites` to see saved recipes.
   - Refresh the page to prove that `localStorage` persists data without needing an authentication server.

6. **Print Mode**:
   - Click "Print Recipe" to show the clean print preview with navigation and buttons removed.

---

## 📄 License & Credits

Developed with modern web best practices. Free to use for educational and personal project demonstrations.
