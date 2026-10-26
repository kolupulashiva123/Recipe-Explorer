/**
 * Recipe Explorer - Recipe Controller
 * Implements business logic for querying, searching, filtering, and sorting recipes.
 */

const recipes = require('../data/recipes');
const categories = require('../data/categories');

/**
 * Helper to calculate category count dynamically
 */
const getCategoriesWithCount = () => {
  return categories.map(cat => {
    let count = 0;
    if (cat.type === 'cuisine') {
      count = recipes.filter(r => r.cuisine.toLowerCase() === cat.filterValue.toLowerCase()).length;
    } else if (cat.type === 'meal') {
      count = recipes.filter(r => r.mealType.toLowerCase() === cat.filterValue.toLowerCase()).length;
    } else if (cat.type === 'dietary') {
      if (cat.id === 'healthy-meals') {
        count = recipes.filter(r => r.category.toLowerCase() === 'healthy').length;
      } else {
        count = recipes.filter(r => r.dietary.toLowerCase() === cat.filterValue.toLowerCase()).length;
      }
    } else if (cat.type === 'time') {
      count = recipes.filter(r => r.totalTime <= cat.filterValue).length;
    } else if (cat.type === 'category') {
      count = recipes.filter(r => r.category.toLowerCase() === cat.filterValue.toLowerCase()).length;
    }
    return {
      ...cat,
      recipeCount: count
    };
  });
};

/**
 * GET /api/recipes
 * Supports query params: q, search, category, cuisine, mealType, dietary, difficulty, maxTime, isFeatured, isTrending, sortBy, page, limit
 */
exports.getAllRecipes = (req, res, next) => {
  try {
    let result = [...recipes];
    const {
      q,
      search,
      category,
      cuisine,
      mealType,
      dietary,
      difficulty,
      maxTime,
      isFeatured,
      isTrending,
      sortBy,
      page,
      limit
    } = req.query;

    const searchTerm = (q || search || '').trim().toLowerCase();
    if (searchTerm) {
      result = result.filter(recipe => {
        const matchName = recipe.name.toLowerCase().includes(searchTerm);
        const matchDesc = recipe.description.toLowerCase().includes(searchTerm);
        const matchCuisine = recipe.cuisine.toLowerCase().includes(searchTerm);
        const matchCategory = recipe.category.toLowerCase().includes(searchTerm);
        const matchTags = recipe.tags && recipe.tags.some(t => t.toLowerCase().includes(searchTerm));
        const matchIngredient = recipe.ingredients.some(ing =>
          ing.name.toLowerCase().includes(searchTerm)
        );
        return matchName || matchDesc || matchCuisine || matchCategory || matchTags || matchIngredient;
      });
    }

    if (category && category.toLowerCase() !== 'all') {
      const catLower = category.toLowerCase();
      result = result.filter(recipe => 
        recipe.category.toLowerCase() === catLower ||
        recipe.mealType.toLowerCase() === catLower
      );
    }

    if (cuisine && cuisine.toLowerCase() !== 'all') {
      const cuiLower = cuisine.toLowerCase();
      result = result.filter(recipe => recipe.cuisine.toLowerCase() === cuiLower);
    }

    if (mealType && mealType.toLowerCase() !== 'all') {
      const mealLower = mealType.toLowerCase();
      result = result.filter(recipe => recipe.mealType.toLowerCase() === mealLower);
    }

    if (dietary && dietary.toLowerCase() !== 'all') {
      const dietLower = dietary.toLowerCase();
      result = result.filter(recipe => recipe.dietary.toLowerCase() === dietLower);
    }

    if (difficulty && difficulty.toLowerCase() !== 'all') {
      const diffLower = difficulty.toLowerCase();
      result = result.filter(recipe => recipe.difficulty.toLowerCase() === diffLower);
    }

    if (maxTime && !isNaN(Number(maxTime))) {
      const timeNum = Number(maxTime);
      result = result.filter(recipe => recipe.totalTime <= timeNum);
    }

    if (isFeatured !== undefined) {
      const isFeat = isFeatured === 'true';
      result = result.filter(recipe => recipe.isFeatured === isFeat);
    }

    if (isTrending !== undefined) {
      const isTrend = isTrending === 'true';
      result = result.filter(recipe => recipe.isTrending === isTrend);
    }

    // Sorting
    if (sortBy) {
      switch (sortBy.toLowerCase()) {
        case 'name':
        case 'name-asc':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          result.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'rating':
        case 'rating-desc':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'time':
        case 'time-asc':
          result.sort((a, b) => a.totalTime - b.totalTime);
          break;
        case 'time-desc':
          result.sort((a, b) => b.totalTime - a.totalTime);
          break;
        case 'popular':
          result.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        default:
          break;
      }
    }

    const total = result.length;

    // Optional pagination
    if (page && limit) {
      const pageNum = Math.max(1, parseInt(page, 10));
      const limitNum = Math.max(1, parseInt(limit, 10));
      const startIndex = (pageNum - 1) * limitNum;
      const paginatedData = result.slice(startIndex, startIndex + limitNum);

      return res.status(200).json({
        success: true,
        count: paginatedData.length,
        total,
        page: pageNum,
        totalPages: Math.ceil(total / limitNum),
        data: paginatedData
      });
    }

    return res.status(200).json({
      success: true,
      count: result.length,
      total,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/recipes/:id
 */
exports.getRecipeById = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid recipe ID format '${req.params.id}'. ID must be a valid number.`
      });
    }

    const recipe = recipes.find(r => r.id === id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe with ID ${id} not found.`
      });
    }

    return res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/recipes/search?q=
 */
exports.searchRecipes = (req, res, next) => {
  try {
    const query = (req.query.q || '').trim().toLowerCase();
    if (!query) {
      return res.status(200).json({
        success: true,
        count: recipes.length,
        data: recipes
      });
    }

    const filtered = recipes.filter(recipe => {
      const inName = recipe.name.toLowerCase().includes(query);
      const inDesc = recipe.description.toLowerCase().includes(query);
      const inCuisine = recipe.cuisine.toLowerCase().includes(query);
      const inIngredients = recipe.ingredients.some(ing =>
        ing.name.toLowerCase().includes(query)
      );
      return inName || inDesc || inCuisine || inIngredients;
    });

    return res.status(200).json({
      success: true,
      count: filtered.length,
      query,
      data: filtered
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/recipes/category/:category
 */
exports.getRecipesByCategory = (req, res, next) => {
  try {
    const categoryParam = req.params.category.trim().toLowerCase();
    const matchedCategory = categories.find(
      c => c.slug.toLowerCase() === categoryParam || c.id.toLowerCase() === categoryParam || c.name.toLowerCase() === categoryParam
    );

    let filtered = [];
    if (matchedCategory) {
      if (matchedCategory.type === 'cuisine') {
        filtered = recipes.filter(r => r.cuisine.toLowerCase() === matchedCategory.filterValue.toLowerCase());
      } else if (matchedCategory.type === 'meal') {
        filtered = recipes.filter(r => r.mealType.toLowerCase() === matchedCategory.filterValue.toLowerCase());
      } else if (matchedCategory.type === 'dietary') {
        if (matchedCategory.id === 'healthy-meals') {
          filtered = recipes.filter(r => r.category.toLowerCase() === 'healthy');
        } else {
          filtered = recipes.filter(r => r.dietary.toLowerCase() === matchedCategory.filterValue.toLowerCase());
        }
      } else if (matchedCategory.type === 'time') {
        filtered = recipes.filter(r => r.totalTime <= matchedCategory.filterValue);
      } else {
        filtered = recipes.filter(r => r.category.toLowerCase() === matchedCategory.filterValue.toLowerCase());
      }
    } else {
      // Fallback direct match on category, mealType, or dietary
      filtered = recipes.filter(r => 
        r.category.toLowerCase() === categoryParam ||
        r.mealType.toLowerCase() === categoryParam ||
        r.dietary.toLowerCase() === categoryParam ||
        r.cuisine.toLowerCase() === categoryParam
      );
    }

    return res.status(200).json({
      success: true,
      category: matchedCategory ? matchedCategory.name : categoryParam,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/recipes/cuisine/:cuisine
 */
exports.getRecipesByCuisine = (req, res, next) => {
  try {
    const cuisineParam = req.params.cuisine.trim().toLowerCase();
    const filtered = recipes.filter(r => r.cuisine.toLowerCase() === cuisineParam);

    return res.status(200).json({
      success: true,
      cuisine: req.params.cuisine,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/categories
 */
exports.getAllCategories = (req, res, next) => {
  try {
    const categoriesWithCount = getCategoriesWithCount();
    return res.status(200).json({
      success: true,
      count: categoriesWithCount.length,
      data: categoriesWithCount
    });
  } catch (error) {
    next(error);
  }
};
