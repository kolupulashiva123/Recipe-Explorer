import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  @Input({ required: true }) recipe!: Recipe;

  private favoritesService = inject(FavoritesService);

  get isFavorite(): boolean {
    return this.recipe ? this.favoritesService.isFavorite(this.recipe.id) : false;
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.recipe) {
      this.favoritesService.toggleFavorite(this.recipe);
    }
  }

  getDifficultyClass(difficulty: string): string {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'badge-difficulty-easy';
      case 'medium':
        return 'badge-difficulty-medium';
      case 'hard':
        return 'badge-difficulty-hard';
      default:
        return 'badge-neutral';
    }
  }

  getDietaryClass(dietary: string): string {
    switch (dietary?.toLowerCase()) {
      case 'vegetarian':
      case 'vegan':
        return 'badge-green';
      default:
        return 'badge-neutral';
    }
  }

  getDietaryIcon(dietary: string): string {
    switch (dietary?.toLowerCase()) {
      case 'vegetarian':
        return '🥬';
      case 'vegan':
        return '🌱';
      default:
        return '🍖';
    }
  }
}
