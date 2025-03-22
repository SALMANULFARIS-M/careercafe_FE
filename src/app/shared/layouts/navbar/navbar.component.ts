import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isScrolled = false;
  isMobileMenuOpen = false;
isMenuOpen=  false;


  // Listen to window scroll events
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // Set 'true' if scrolled more than 50px
  }
 // Toggle the mobile menu
 toggleMobileMenu() {
  this.isMobileMenuOpen = !this.isMobileMenuOpen;
}
}
