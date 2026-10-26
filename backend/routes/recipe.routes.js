/**
 * Recipe Explorer - Recipe Routes
 * Defines REST API endpoints for recipes and categories.
 */

const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');

// Categories route
router.get('/categories', recipeController.getAllCategories);

// Specific recipe search & filter routes (before :id parameter)
router.get('/recipes/search', recipeController.searchRecipes);
router.get('/recipes/category/:category', recipeController.getRecipesByCategory);
router.get('/recipes/cuisine/:cuisine', recipeController.getRecipesByCuisine);

// General recipes routes
router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipes/:id', recipeController.getRecipeById);

module.exports = router;
