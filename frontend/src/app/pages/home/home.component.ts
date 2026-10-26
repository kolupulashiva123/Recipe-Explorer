import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Category, Recipe } from '../../models/recipe.model';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RecipeCardComponent, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private recipeService = inject(RecipeService);

  featuredRecipes: Recipe[] = [];
  trendingRecipes: Recipe[] = [];
  popularCategories: Category[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    // Load recipes
    this.recipeService.getRecipes().subscribe(recipes => {
      this.featuredRecipes = recipes.filter(r => r.isFeatured).slice(0, 3);
      if (this.featuredRecipes.length === 0) {
        this.featuredRecipes = recipes.slice(0, 3);
      }

      this.trendingRecipes = recipes.filter(r => r.isTrending).slice(0, 3);
      if (this.trendingRecipes.length === 0) {
        this.trendingRecipes = recipes.slice(3, 6);
      }
      this.isLoading = false;
    });

    // Load categories
    this.recipeService.getCategories().subscribe(categories => {
      this.popularCategories = categories.slice(0, 6);
    });
  }
}
