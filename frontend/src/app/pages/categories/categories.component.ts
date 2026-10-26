import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Category } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  private recipeService = inject(RecipeService);
  private router = inject(Router);

  categories: Category[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.recipeService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  navigateToCategory(cat: Category): void {
    const queryParams: any = {};
    if (cat.type === 'cuisine') {
      queryParams.cuisine = cat.filterValue;
    } else if (cat.type === 'meal') {
      queryParams.mealType = cat.filterValue;
    } else if (cat.type === 'dietary') {
      if (cat.id === 'healthy-meals') {
        queryParams.category = 'Healthy';
      } else {
        queryParams.dietary = cat.filterValue;
      }
    } else if (cat.type === 'time') {
      queryParams.maxTime = cat.filterValue;
    } else {
      queryParams.category = cat.filterValue;
    }

    this.router.navigate(['/recipes'], { queryParams });
  }
}
