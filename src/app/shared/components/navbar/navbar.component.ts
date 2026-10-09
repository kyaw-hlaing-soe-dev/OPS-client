import { Component, inject, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly cartService = inject(CartService);
  readonly mobileMenuOpen = signal(false);
  readonly scrolled = signal(false);
  readonly searchOpen = signal(false);
  readonly searchQuery = signal('');

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
    if (this.mobileMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    document.body.style.overflow = '';
  }

  toggleSearch(): void {
    this.searchOpen.update((v) => !v);
    if (!this.searchOpen()) {
      this.searchQuery.set('');
    }
  }
}
