import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Recipe Explorer – Discover, Cook & Enjoy' },
  { path: 'recipes', component: RecipeListComponent, title: 'Explore Recipes – Recipe Explorer' },
  { path: 'recipes/:id', component: RecipeDetailsComponent, title: 'Recipe Details – Recipe Explorer' },
  { path: 'categories', component: CategoriesComponent, title: 'Recipe Categories – Recipe Explorer' },
  { path: 'favorites', component: FavoritesComponent, title: 'My Favorites – Recipe Explorer' },
  { path: 'about', component: AboutComponent, title: 'About – Recipe Explorer' },
  { path: '**', redirectTo: '' }
];
