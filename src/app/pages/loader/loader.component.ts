import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  isLoading$!: Observable<boolean>;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.isLoading$ = this.loaderService.loading$;
  }
}
