import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/layouts/footer/footer.component';
import { NavbarComponent } from '../../shared/layouts/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pages',
  imports: [RouterOutlet,FooterComponent, NavbarComponent,CommonModule],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {

}
