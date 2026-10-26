import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Recipe, Ingredient } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private recipeService = inject(RecipeService);
  private favoritesService = inject(FavoritesService);

  recipe: Recipe | null = null;
  isLoading = true;
  hasError = false;
  errorMessage = '';

  // Serving scaler
  originalServings: number = 4;
  currentServings: number = 4;

  // Step-by-step cooking progress tracking
  completedSteps: { [stepIndex: number]: boolean } = {};

  // Share feedback toast
  shareToastMessage: string = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = parseInt(idParam, 10);
        if (!isNaN(id)) {
          this.loadRecipe(id);
        } else {
          this.hasError = true;
          this.errorMessage = 'Invalid recipe ID provided.';
          this.isLoading = false;
        }
      }
    });
  }

  loadRecipe(id: number): void {
    this.isLoading = true;
    this.hasError = false;
    this.completedSteps = {};

    this.recipeService.getRecipeById(id).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        this.originalServings = recipe.servings || 4;
        this.currentServings = this.originalServings;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching recipe details:', err);
        this.hasError = true;
        this.errorMessage = err.error?.message || `Recipe #${id} could not be found.`;
        this.isLoading = false;
      }
    });
  }

  get isFavorite(): boolean {
    return this.recipe ? this.favoritesService.isFavorite(this.recipe.id) : false;
  }

  toggleFavorite(): void {
    if (this.recipe) {
      this.favoritesService.toggleFavorite(this.recipe);
    }
  }

  // Serving size scaler logic
  increaseServings(): void {
    if (this.currentServings < 24) {
      this.currentServings++;
    }
  }

  decreaseServings(): void {
    if (this.currentServings > 1) {
      this.currentServings--;
    }
  }

  resetServings(): void {
    this.currentServings = this.originalServings;
  }

  getScaledQuantity(originalQty: number): string {
    if (!originalQty || isNaN(originalQty)) return '';
    const ratio = this.currentServings / (this.originalServings || 1);
    const scaled = originalQty * ratio;

    // Format clean numbers: integers as is, decimals nicely rounded
    if (Number.isInteger(scaled)) {
      return scaled.toString();
    }
    // Check common fractions like .25, .5, .75, .33
    const rounded = Math.round(scaled * 100) / 100;
    return rounded.toString();
  }

  // Interactive cooking steps
  toggleStep(index: number): void {
    this.completedSteps[index] = !this.completedSteps[index];
  }

  isStepCompleted(index: number): boolean {
    return !!this.completedSteps[index];
  }

  get cookingProgress(): number {
    if (!this.recipe || !this.recipe.instructions || this.recipe.instructions.length === 0) return 0;
    const completedCount = Object.values(this.completedSteps).filter(Boolean).length;
    return Math.round((completedCount / this.recipe.instructions.length) * 100);
  }

  printRecipe(): void {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }

  shareRecipe(): void {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      if (navigator.share) {
        navigator.share({
          title: this.recipe?.name || 'Recipe Explorer',
          text: `Check out this delicious ${this.recipe?.name} recipe!`,
          url: url
        }).catch(() => {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          this.shareToastMessage = 'Link copied to clipboard!';
          setTimeout(() => (this.shareToastMessage = ''), 3000);
        });
      } else {
        this.shareToastMessage = 'URL: ' + url;
        setTimeout(() => (this.shareToastMessage = ''), 3000);
      }
    }
  }

  getDifficultyClass(difficulty?: string): string {
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
}
