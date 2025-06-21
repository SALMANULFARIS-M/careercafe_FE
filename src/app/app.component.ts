import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LoaderComponent } from './shared/layouts/loader/loader.component';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, CommonModule], // Import Footer and Navbar
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: object, private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          gtag('config', 'G-QK149F8PZV', {
            'page_path': event.urlAfterRedirects
          });
        }
      })
    };
  }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      var toTopButton = document.getElementById("to-top-button") as HTMLElement;

      // When the user scrolls down 200px from the top of the document, show the button
      window.onscroll = function () {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
          toTopButton.classList.remove("hidden");
        } else {
          toTopButton.classList.add("hidden");
        }
      }
    }
  }
  goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
