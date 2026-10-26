import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeFilter } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-filters.component.html',
  styleUrls: ['./recipe-filters.component.css']
})
export class RecipeFiltersComponent {
  @Input() filter: RecipeFilter = {
    category: 'all',
    cuisine: 'all',
    mealType: 'all',
    dietary: 'all',
    difficulty: 'all',
    maxTime: 0,
    sortBy: 'default'
  };

  @Output() filterChange = new EventEmitter<RecipeFilter>();
  @Output() clearFilters = new EventEmitter<void>();

  isOpenMobile = false;

  cuisines: string[] = ['All', 'Indian', 'Italian', 'Chinese', 'Mexican', 'American', 'French', 'Continental'];
  mealTypes: string[] = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'];
  dietaryPreferences: string[] = ['All', 'Vegetarian', 'Vegan', 'Non-Vegetarian'];
  difficulties: string[] = ['All', 'Easy', 'Medium', 'Hard'];

  sortOptions = [
    { label: 'Featured / Recommended', value: 'default' },
    { label: 'Name (A to Z)', value: 'name-asc' },
    { label: 'Name (Z to A)', value: 'name-desc' },
    { label: 'Highest Rated ⭐', value: 'rating' },
    { label: 'Quickest (Fast Prep & Cook)', value: 'time-asc' },
    { label: 'Most Popular', value: 'popular' }
  ];

  timeOptions = [
    { label: 'Any Time', value: 0 },
    { label: '≤ 20 mins', value: 20 },
    { label: '≤ 30 mins', value: 30 },
    { label: '≤ 45 mins', value: 45 },
    { label: '≤ 60 mins', value: 60 }
  ];

  get activeFiltersCount(): number {
    let count = 0;
    if (this.filter.cuisine && this.filter.cuisine.toLowerCase() !== 'all') count++;
    if (this.filter.mealType && this.filter.mealType.toLowerCase() !== 'all') count++;
    if (this.filter.dietary && this.filter.dietary.toLowerCase() !== 'all') count++;
    if (this.filter.difficulty && this.filter.difficulty.toLowerCase() !== 'all') count++;
    if (this.filter.maxTime && this.filter.maxTime > 0) count++;
    return count;
  }

  onFilterChanged(): void {
    this.filterChange.emit({ ...this.filter });
  }

  onSelectCuisine(c: string): void {
    this.filter.cuisine = c;
    this.onFilterChanged();
  }

  onSelectMealType(m: string): void {
    this.filter.mealType = m;
    this.onFilterChanged();
  }

  onSelectDietary(d: string): void {
    this.filter.dietary = d;
    this.onFilterChanged();
  }

  onSelectDifficulty(diff: string): void {
    this.filter.difficulty = diff;
    this.onFilterChanged();
  }

  onSelectTime(t: number): void {
    this.filter.maxTime = t;
    this.onFilterChanged();
  }

  onSortChanged(): void {
    this.onFilterChanged();
  }

  onClearAll(): void {
    this.filter = {
      q: '',
      category: 'all',
      cuisine: 'all',
      mealType: 'all',
      dietary: 'all',
      difficulty: 'all',
      maxTime: 0,
      sortBy: 'default'
    };
    this.clearFilters.emit();
    this.filterChange.emit({ ...this.filter });
  }

  toggleMobileDrawer(): void {
    this.isOpenMobile = !this.isOpenMobile;
  }
}
