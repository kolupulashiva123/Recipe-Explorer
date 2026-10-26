import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  newsletterEmail = '';
  subscribed = false;
  currentYear = new Date().getFullYear();

  onSubscribe(): void {
    if (this.newsletterEmail.trim() && this.newsletterEmail.includes('@')) {
      this.subscribed = true;
      setTimeout(() => {
        this.newsletterEmail = '';
      }, 3000);
    }
  }
}
