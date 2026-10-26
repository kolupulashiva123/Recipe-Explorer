import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { FavoritesService } from '../../services/favorites.service';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink, RecipeCardComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  private favoritesService = inject(FavoritesService);
  private recipeService = inject(RecipeService);

  favoriteRecipes: Recipe[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadFavorites();

    // Listen to changes in favorites
    this.favoritesService.favoriteIds$.subscribe(() => {
      this.loadFavorites();
    });
  }

  loadFavorites(): void {
    this.isLoading = true;
    const favoriteIds = this.favoritesService.getFavoriteIds();

    if (favoriteIds.length === 0) {
      this.favoriteRecipes = [];
      this.isLoading = false;
      return;
    }

    // Try to get from cached objects first for instant render
    const cachedItems = this.favoritesService.getFavoriteRecipes();
    if (cachedItems.length >= favoriteIds.length) {
      this.favoriteRecipes = cachedItems.filter(item => favoriteIds.includes(item.id));
      this.isLoading = false;
      return;
    }

    // Otherwise fetch all recipes from API and filter
    this.recipeService.getRecipes().subscribe({
      next: (allRecipes) => {
        this.favoriteRecipes = allRecipes.filter(r => favoriteIds.includes(r.id));
        this.isLoading = false;
      },
      error: () => {
        // Fallback to cached items
        this.favoriteRecipes = cachedItems;
        this.isLoading = false;
      }
    });
  }

  clearAll(): void {
    if (confirm('Are you sure you want to remove all saved favorite recipes?')) {
      this.favoritesService.clearAllFavorites();
    }
  }
}
