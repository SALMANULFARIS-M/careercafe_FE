import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { LoaderComponent } from "./pages/loader/loader.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, LoaderComponent], // Import Footer and Navbar
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent{

}
