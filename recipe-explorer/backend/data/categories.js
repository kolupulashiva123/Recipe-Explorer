/**
 * Recipe Explorer - Category Definitions
 * Curated list of all 12 primary recipe categories and cuisines.
 */

const categories = [
  {
    id: "indian-cuisine",
    slug: "indian",
    name: "Indian Cuisine",
    type: "cuisine",
    filterKey: "cuisine",
    filterValue: "Indian",
    icon: "🍛",
    description: "Richly spiced, aromatic curries, biryanis, and comforting traditional breads.",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "italian-cuisine",
    slug: "italian",
    name: "Italian Cuisine",
    type: "cuisine",
    filterKey: "cuisine",
    filterValue: "Italian",
    icon: "🍕",
    description: "Handcrafted pastas, wood-fired pizzas, rich sauces, and Mediterranean herbs.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "chinese-cuisine",
    slug: "chinese",
    name: "Chinese Cuisine",
    type: "cuisine",
    filterKey: "cuisine",
    filterValue: "Chinese",
    icon: "🍜",
    description: "Wok-tossed noodles, vibrant stir-fried vegetables, and savory dim sum flavors.",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "mexican-cuisine",
    slug: "mexican",
    name: "Mexican Cuisine",
    type: "cuisine",
    filterKey: "cuisine",
    filterValue: "Mexican",
    icon: "🌮",
    description: "Zesty street tacos, rich salsas, guacamole, and festive Latin spices.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "breakfast",
    slug: "breakfast",
    name: "Breakfast",
    type: "meal",
    filterKey: "mealType",
    filterValue: "Breakfast",
    icon: "🥞",
    description: "Fluffy pancakes, golden toast, crispy dosas, and morning energizers.",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "lunch",
    slug: "lunch",
    name: "Lunch",
    type: "meal",
    filterKey: "mealType",
    filterValue: "Lunch",
    icon: "🍱",
    description: "Wholesome bowls, fragrant rice platters, hearty sandwiches, and wraps.",
    image: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dinner",
    slug: "dinner",
    name: "Dinner",
    type: "meal",
    filterKey: "mealType",
    filterValue: "Dinner",
    icon: "🍲",
    description: "Satisfying evening feasts, simmering stews, curries, and comforting roasts.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "desserts",
    slug: "desserts",
    name: "Desserts",
    type: "category",
    filterKey: "category",
    filterValue: "Dessert",
    icon: "🍰",
    description: "Decadent chocolate cakes, fudgy brownies, and traditional syrupy sweets.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "snacks",
    slug: "snacks",
    name: "Snacks",
    type: "meal",
    filterKey: "mealType",
    filterValue: "Snack",
    icon: "🥨",
    description: "Crispy fried treats, savory samosas, dips, and quick bite-sized delights.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "healthy-meals",
    slug: "healthy",
    name: "Healthy Meals",
    type: "dietary",
    filterKey: "category",
    filterValue: "Healthy",
    icon: "🥗",
    description: "Nutrient-packed salads, wholesome grain bowls, smoothies, and clear soups.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "vegetarian-recipes",
    slug: "vegetarian",
    name: "Vegetarian Recipes",
    type: "dietary",
    filterKey: "dietary",
    filterValue: "Vegetarian",
    icon: "🥬",
    description: "100% plant-forward delights bursting with paneer, lentils, and garden greens.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "quick-recipes",
    slug: "quick",
    name: "Quick Recipes",
    type: "time",
    filterKey: "maxTime",
    filterValue: 25,
    icon: "⚡",
    description: "Ready in 25 minutes or less — quick, flavorful dishes for busy schedules.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80"
  }
];

module.exports = categories;
