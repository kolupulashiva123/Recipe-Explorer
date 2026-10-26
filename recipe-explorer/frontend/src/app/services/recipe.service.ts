import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { ApiResponse, Category, Recipe, RecipeFilter } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all recipes with optional query and filter parameters
   */
  getRecipes(filter?: RecipeFilter): Observable<Recipe[]> {
    let params = new HttpParams();

    if (filter) {
      if (filter.q) params = params.set('q', filter.q.trim());
      if (filter.category && filter.category !== 'all') params = params.set('category', filter.category);
      if (filter.cuisine && filter.cuisine !== 'all') params = params.set('cuisine', filter.cuisine);
      if (filter.mealType && filter.mealType !== 'all') params = params.set('mealType', filter.mealType);
      if (filter.dietary && filter.dietary !== 'all') params = params.set('dietary', filter.dietary);
      if (filter.difficulty && filter.difficulty !== 'all') params = params.set('difficulty', filter.difficulty);
      if (filter.maxTime && filter.maxTime > 0) params = params.set('maxTime', filter.maxTime.toString());
      if (filter.sortBy) params = params.set('sortBy', filter.sortBy);
    }

    return this.http.get<ApiResponse<Recipe[]>>(`${this.apiUrl}/recipes`, { params }).pipe(
      map(res => res.data || []),
      catchError(err => {
        console.error('Failed to load recipes from backend API:', err);
        return of([]);
      })
    );
  }

  /**
   * Get single recipe by numeric ID
   */
  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<ApiResponse<Recipe>>(`${this.apiUrl}/recipes/${id}`).pipe(
      map(res => res.data),
      catchError(err => {
        console.error(`Failed to fetch recipe ${id}:`, err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Search recipes by keyword in name, description, ingredients
   */
  searchRecipes(query: string): Observable<Recipe[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<ApiResponse<Recipe[]>>(`${this.apiUrl}/recipes/search`, { params }).pipe(
      map(res => res.data || []),
      catchError(() => of([]))
    );
  }

  /**
   * Get all categories with calculated recipe counts
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<ApiResponse<Category[]>>(`${this.apiUrl}/categories`).pipe(
      map(res => res.data || []),
      catchError(err => {
        console.error('Failed to load categories:', err);
        return of([]);
      })
    );
  }

  /**
   * Get recipes by category slug or name
   */
  getRecipesByCategory(category: string): Observable<Recipe[]> {
    return this.http.get<ApiResponse<Recipe[]>>(`${this.apiUrl}/recipes/category/${encodeURIComponent(category)}`).pipe(
      map(res => res.data || []),
      catchError(() => of([]))
    );
  }

  /**
   * Get recipes by cuisine
   */
  getRecipesByCuisine(cuisine: string): Observable<Recipe[]> {
    return this.http.get<ApiResponse<Recipe[]>>(`${this.apiUrl}/recipes/cuisine/${encodeURIComponent(cuisine)}`).pipe(
      map(res => res.data || []),
      catchError(() => of([]))
    );
  }

  /**
   * Health check
   */
  checkHealth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`).pipe(
      catchError(err => of({ status: 'offline', error: err.message }))
    );
  }
}
