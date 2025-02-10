import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { LoaderComponent } from "./pages/loader/loader.component";
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, LoaderComponent, CommonModule], // Import Footer and Navbar
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
  isNotFound: boolean = false;
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Check if the current URL is the 404 page
        this.isNotFound = event.urlAfterRedirects === '/404';
      });
  }
  ngOnInit(): void {
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
  goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
