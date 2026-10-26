import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Search by recipe name or ingredients (e.g., Chicken, Paneer, Pasta)...';
  @Input() initialQuery: string = '';
  @Input() navigateOnSearch: boolean = false;
  @Input() showQuickTags: boolean = true;

  @Output() searchSubmitted = new EventEmitter<string>();

  searchQuery: string = '';

  quickTags: string[] = ['Biryani', 'Paneer', 'Pasta', 'Tacos', 'Pancakes', 'Salad', 'Chocolate', 'Smoothie'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.initialQuery) {
      this.searchQuery = this.initialQuery;
    }
  }

  onSearch(): void {
    const trimmed = this.searchQuery.trim();
    if (this.navigateOnSearch) {
      this.router.navigate(['/recipes'], { queryParams: trimmed ? { q: trimmed } : {} });
    } else {
      this.searchSubmitted.emit(trimmed);
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.onSearch();
  }

  selectQuickTag(tag: string): void {
    this.searchQuery = tag;
    this.onSearch();
  }
}
