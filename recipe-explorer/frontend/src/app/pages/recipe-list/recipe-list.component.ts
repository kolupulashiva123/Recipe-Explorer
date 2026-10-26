import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe, RecipeFilter } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { RecipeFiltersComponent } from '../../components/recipe-filters/recipe-filters.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent, SearchBarComponent, RecipeFiltersComponent],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  private recipeService = inject(RecipeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  allRecipes: Recipe[] = [];
  displayedRecipes: Recipe[] = [];
  isLoading = true;

  // Pagination / Load More
  pageSize = 9;
  visibleCount = 9;

  currentFilter: RecipeFilter = {
    q: '',
    category: 'all',
    cuisine: 'all',
    mealType: 'all',
    dietary: 'all',
    difficulty: 'all',
    maxTime: 0,
    sortBy: 'default'
  };

  ngOnInit(): void {
    // Read query parameters from URL
    this.route.queryParams.subscribe(params => {
      this.currentFilter = {
        q: params['q'] || '',
        category: params['category'] || 'all',
        cuisine: params['cuisine'] || 'all',
        mealType: params['mealType'] || 'all',
        dietary: params['dietary'] || 'all',
        difficulty: params['difficulty'] || 'all',
        maxTime: params['maxTime'] ? Number(params['maxTime']) : 0,
        sortBy: params['sortBy'] || 'default'
      };
      this.fetchRecipes();
    });
  }

  fetchRecipes(): void {
    this.isLoading = true;
    this.recipeService.getRecipes(this.currentFilter).subscribe({
      next: (recipes) => {
        this.allRecipes = recipes;
        this.visibleCount = this.pageSize;
        this.updateDisplayedRecipes();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching recipes:', err);
        this.allRecipes = [];
        this.displayedRecipes = [];
        this.isLoading = false;
      }
    });
  }

  updateDisplayedRecipes(): void {
    this.displayedRecipes = this.allRecipes.slice(0, this.visibleCount);
  }

  loadMore(): void {
    this.visibleCount += this.pageSize;
    this.updateDisplayedRecipes();
  }

  onSearch(query: string): void {
    this.currentFilter.q = query;
    this.syncUrlParams();
  }

  onFilterChange(newFilter: RecipeFilter): void {
    this.currentFilter = { ...newFilter, q: this.currentFilter.q };
    this.syncUrlParams();
  }

  onClearAll(): void {
    this.currentFilter = {
      q: '',
      category: 'all',
      cuisine: 'all',
      mealType: 'all',
      dietary: 'all',
      difficulty: 'all',
      maxTime: 0,
      sortBy: 'default'
    };
    this.syncUrlParams();
  }

  removeSingleFilter(key: keyof RecipeFilter): void {
    if (key === 'maxTime') {
      this.currentFilter.maxTime = 0;
    } else if (key === 'q') {
      this.currentFilter.q = '';
    } else {
      (this.currentFilter as any)[key] = 'all';
    }
    this.syncUrlParams();
  }

  private syncUrlParams(): void {
    const queryParams: any = {};
    if (this.currentFilter.q) queryParams.q = this.currentFilter.q;
    if (this.currentFilter.category && this.currentFilter.category !== 'all') queryParams.category = this.currentFilter.category;
    if (this.currentFilter.cuisine && this.currentFilter.cuisine !== 'all') queryParams.cuisine = this.currentFilter.cuisine;
    if (this.currentFilter.mealType && this.currentFilter.mealType !== 'all') queryParams.mealType = this.currentFilter.mealType;
    if (this.currentFilter.dietary && this.currentFilter.dietary !== 'all') queryParams.dietary = this.currentFilter.dietary;
    if (this.currentFilter.difficulty && this.currentFilter.difficulty !== 'all') queryParams.difficulty = this.currentFilter.difficulty;
    if (this.currentFilter.maxTime && this.currentFilter.maxTime > 0) queryParams.maxTime = this.currentFilter.maxTime;
    if (this.currentFilter.sortBy && this.currentFilter.sortBy !== 'default') queryParams.sortBy = this.currentFilter.sortBy;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: '' // replace with clean set
    });
  }

  get activeFilterKeys(): { key: keyof RecipeFilter; label: string; value: string }[] {
    const list: { key: keyof RecipeFilter; label: string; value: string }[] = [];
    if (this.currentFilter.q) list.push({ key: 'q', label: 'Keyword', value: `"${this.currentFilter.q}"` });
    if (this.currentFilter.cuisine && this.currentFilter.cuisine !== 'all') list.push({ key: 'cuisine', label: 'Cuisine', value: this.currentFilter.cuisine });
    if (this.currentFilter.mealType && this.currentFilter.mealType !== 'all') list.push({ key: 'mealType', label: 'Meal', value: this.currentFilter.mealType });
    if (this.currentFilter.dietary && this.currentFilter.dietary !== 'all') list.push({ key: 'dietary', label: 'Diet', value: this.currentFilter.dietary });
    if (this.currentFilter.difficulty && this.currentFilter.difficulty !== 'all') list.push({ key: 'difficulty', label: 'Difficulty', value: this.currentFilter.difficulty });
    if (this.currentFilter.maxTime && this.currentFilter.maxTime > 0) list.push({ key: 'maxTime', label: 'Time', value: `≤ ${this.currentFilter.maxTime}m` });
    return list;
  }
}
