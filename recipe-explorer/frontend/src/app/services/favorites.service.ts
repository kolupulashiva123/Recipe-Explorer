import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_IDS_KEY = 'recipe_explorer_fav_ids';
  private readonly STORAGE_ITEMS_KEY = 'recipe_explorer_fav_items';

  private favoriteIdsSubject = new BehaviorSubject<number[]>(this.loadFavoriteIdsFromStorage());
  public favoriteIds$: Observable<number[]> = this.favoriteIdsSubject.asObservable();

  private favoriteRecipesSubject = new BehaviorSubject<Recipe[]>(this.loadFavoriteRecipesFromStorage());
  public favoriteRecipes$: Observable<Recipe[]> = this.favoriteRecipesSubject.asObservable();

  constructor() {}

  /**
   * Check if a recipe is saved as favorite
   */
  isFavorite(recipeId: number): boolean {
    return this.favoriteIdsSubject.value.includes(recipeId);
  }

  /**
   * Toggle favorite state for a recipe
   */
  toggleFavorite(recipe: Recipe): boolean {
    if (this.isFavorite(recipe.id)) {
      this.removeFavorite(recipe.id);
      return false;
    } else {
      this.addFavorite(recipe);
      return true;
    }
  }

  /**
   * Add a recipe to favorites
   */
  addFavorite(recipe: Recipe): void {
    const currentIds = this.favoriteIdsSubject.value;
    if (!currentIds.includes(recipe.id)) {
      const updatedIds = [...currentIds, recipe.id];
      const currentItems = this.favoriteRecipesSubject.value;
      const updatedItems = [recipe, ...currentItems.filter(r => r.id !== recipe.id)];

      this.saveToStorage(updatedIds, updatedItems);
    }
  }

  /**
   * Remove a recipe from favorites by ID
   */
  removeFavorite(recipeId: number): void {
    const updatedIds = this.favoriteIdsSubject.value.filter(id => id !== recipeId);
    const updatedItems = this.favoriteRecipesSubject.value.filter(r => r.id !== recipeId);
    this.saveToStorage(updatedIds, updatedItems);
  }

  /**
   * Clear all favorites
   */
  clearAllFavorites(): void {
    this.saveToStorage([], []);
  }

  /**
   * Get current favorite IDs array
   */
  getFavoriteIds(): number[] {
    return this.favoriteIdsSubject.value;
  }

  /**
   * Get current favorite Recipe objects array
   */
  getFavoriteRecipes(): Recipe[] {
    return this.favoriteRecipesSubject.value;
  }

  /**
   * Get total count of saved favorites
   */
  getFavoritesCount(): number {
    return this.favoriteIdsSubject.value.length;
  }

  private loadFavoriteIdsFromStorage(): number[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(this.STORAGE_IDS_KEY);
        return stored ? JSON.parse(stored) : [];
      }
    } catch (e) {
      console.warn('Could not read favorites from localStorage:', e);
    }
    return [];
  }

  private loadFavoriteRecipesFromStorage(): Recipe[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(this.STORAGE_ITEMS_KEY);
        return stored ? JSON.parse(stored) : [];
      }
    } catch (e) {
      console.warn('Could not read favorite recipes from localStorage:', e);
    }
    return [];
  }

  private saveToStorage(ids: number[], items: Recipe[]): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.STORAGE_IDS_KEY, JSON.stringify(ids));
        localStorage.setItem(this.STORAGE_ITEMS_KEY, JSON.stringify(items));
      }
    } catch (e) {
      console.warn('Could not save favorites to localStorage:', e);
    }
    this.favoriteIdsSubject.next(ids);
    this.favoriteRecipesSubject.next(items);
  }
}
