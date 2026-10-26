export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
}

export interface Nutrition {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  cuisine: string;
  category: string;
  mealType: string;
  dietary: 'Vegetarian' | 'Vegan' | 'Non-Vegetarian' | string;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  ingredients: Ingredient[];
  instructions: string[];
  nutrition?: Nutrition;
  tags?: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  type: string;
  filterKey: string;
  filterValue: any;
  icon: string;
  description: string;
  image: string;
  recipeCount?: number;
}

export interface RecipeFilter {
  q?: string;
  category?: string;
  cuisine?: string;
  mealType?: string;
  dietary?: string;
  difficulty?: string;
  maxTime?: number;
  sortBy?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  total?: number;
  message?: string;
  category?: string;
  cuisine?: string;
}
