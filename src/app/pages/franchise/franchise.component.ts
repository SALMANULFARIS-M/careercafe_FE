import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { State } from '../../constants/states';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-franchise',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './franchise.component.html',
  styleUrl: './franchise.component.css'
})


export class FranchiseComponent implements OnInit, AfterViewInit {
  constructor(private fb: FormBuilder, private service: CommonService) {
    this.registerForm = this.fb.group({
      name: ["", [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern(/^\+\d{1,3}\s\d{7,12}$/)]],
      email: ['', [Validators.required, Validators.email]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
  }
  registerForm: FormGroup
  currentSlide = 0;
  intervalId: any;
  states: State[] = [];
  districts: string[] = [];
  selectedState = '';
  countries: { name: string; dialCode: string }[] = [];
  selectedDialCode: string = '';
  isLoading = false; // Control the loading spinner visibili


  slides = [
    { image: 'cc1.png', text: 'Caption for Image 1', alt: 'Slide 1' },
    { image: 'https://pixlr.com/images/generator/how-to-generate.webp', text: 'Caption for Image 1', alt: 'Slide 2' },
    { image: 'cc1.png', text: 'Caption for Image 1', alt: 'Slide 3' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqJ3Z5FOcmX6WwMIkyd5cgT-uL_sO4EDgIgQ&s', text: 'Caption for Image 1', alt: 'Slide 4' },
    { image: 'https://pixlr.com/images/generator/how-to-generate.webp', text: 'Caption for Image 1', alt: 'Slide 5' }
  ];


  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit() {
    this.isLoading = false
    this.startAutoSlide();
    this.service.getCountries().subscribe((data) => {
      this.countries = data;
      const india = this.countries.find(country => country.name === 'IN')
      console.log(india);
      // Or whatever property holds the name
      if (india) {
        this.selectedDialCode = india.dialCode; // Assuming callingCodes is an array, take the first one. Adjust if needed.
      }
    });
    this.states = this.service.getStates();
  }



  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 2000); // Auto-slide every 3 seconds
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  onCountryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedDialCode = target.value;
  }

  onStateChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedState = target.value;
    const selectedStateObj = this.states.find(state => state.state === this.selectedState);
    this.districts = selectedStateObj ? selectedStateObj.districts : [];
  }


  submitForm() {
    if (this.registerForm.valid) {
      this.isLoading = true; // Show spinner while submitting
      this.service.registerUser(this.registerForm.value).subscribe({
        next: response => {
          console.log('Registration successful:', response);
          this.isLoading = false;
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response.message,
            confirmButtonText: 'Okay'
          });
        },
        error: err => {
          console.error('Registration failed:', err);
          this.isLoading = false; // Hide the spinner on error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Please try again Later.',
            confirmButtonText: 'Try Again'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill out all required fields correctly.',
        confirmButtonText: 'Check it'
      });
    }
  }
}
