import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [
    trigger('navbarAnimation', [
      state(
        'expanded',
        style({
          width: '80%',
          left: '10%',
          borderRadius: '20px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        })
      ),
      state(
        'scrolled',
        style({
          width: '100%',
          left: '0',
          borderRadius: '0px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
        })
      ),
      transition('expanded <=> scrolled', animate('800ms ease-in-out')), // Smooth effect
    ]),
  ],
})
export class NavbarComponent {
  isScrolled = false;
  @ViewChild('navbar') navbar!: ElementRef;
  isMenuOpen = false;
  isMobileMenuOpen: boolean = false;
  isMobile: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  // Listen to window scroll events
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkIsMobile(); // Check if the user is on mobile initially
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      this.isScrolled = scrollPosition > 50; // Adjust this value as needed
    }
  }

  // Toggle the mobile menu
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Optional: Detect screen width for additional mobile condition (if needed)
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkIsMobile();
  }

  checkIsMobile() {
    this.isMobile = window.innerWidth < 768; // Tailwind's lg breakpoint
  }
}
