/**
 * Recipe Explorer - Backend Express Server
 * REST API for food discovery and recipe exploration.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const recipeRoutes = require('./routes/recipe.routes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing for Angular client
const allowedOrigins = [
  'http://localhost:4200',
  'http://127.0.0.1:4200',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive for local development ease
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Recipe Explorer API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`
  });
});

// Mount recipe routes
app.use('/api', recipeRoutes);

// Root route welcome
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Recipe Explorer API!',
    documentation: {
      health: 'GET /api/health',
      allRecipes: 'GET /api/recipes',
      recipeById: 'GET /api/recipes/:id',
      categories: 'GET /api/categories',
      search: 'GET /api/recipes/search?q=:keyword',
      byCategory: 'GET /api/recipes/category/:category',
      byCuisine: 'GET /api/recipes/cuisine/:cuisine'
    }
  });
});

// Centralized error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`  🍽️  Recipe Explorer API Server Started!     `);
  console.log(`  🚀  Listening on: http://localhost:${PORT}   `);
  console.log(`  🌿  Health check: http://localhost:${PORT}/api/health`);
  console.log(`  📚  All Recipes:  http://localhost:${PORT}/api/recipes`);
  console.log(`===============================================`);
});

module.exports = app;
