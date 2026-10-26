import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  private recipeService = inject(RecipeService);

  backendStatus = 'Checking...';
  backendUptime = '';

  ngOnInit(): void {
    this.recipeService.checkHealth().subscribe({
      next: (res) => {
        if (res && res.status === 'ok') {
          this.backendStatus = 'Online & Connected';
          this.backendUptime = res.uptime || '';
        } else {
          this.backendStatus = 'Offline / Standalone';
        }
      },
      error: () => {
        this.backendStatus = 'Offline / Standalone';
      }
    });
  }
}
