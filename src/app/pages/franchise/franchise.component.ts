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
      mobile: ['', [Validators.required, Validators.pattern(/^\d{7,12}$/)]],
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
    { image: 'https://img.freepik.com/premium-photo/national-flags-countries-3d_665346-34308.jpg', text: 'Connection With 120+ countries', alt: 'Slide 5' },
    { image: 'https://st4.depositphotos.com/14431644/38497/i/450/depositphotos_384971004-stock-photo-writing-note-showing-jobs-business.jpg', text: 'Global Job Opportunities', alt: 'Slide 1' },
    { image: 'https://static.vecteezy.com/system/resources/previews/031/026/378/non_2x/happy-businesspeople-smiling-cheerfully-during-a-meeting-in-a-coffee-shop-group-of-successful-business-professionals-working-as-a-team-in-a-multicultural-workplace-photo.jpg', text: 'Tailored Guidance for International Careers', alt: 'Slide 2' },
    { image: 'https://media.istockphoto.com/id/666600116/photo/network-of-consumers-in-the-hands.jpg?s=612x612&w=0&k=20&c=olg9UjEfRo55tJVSMSIfSXu8nk9Z39-Nir5MZNWnEmA=', text: 'Comprehensive Support', alt: 'Slide 3' },
    { image: 'https://png.pngtree.com/png-vector/20221020/ourmid/pngtree-queue-of-immigrants-standing-and-holding-luggage-png-image_6330920.png', text: 'Permanent Residency (PR) Pathways:', alt: 'Slide 4' },

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
      const mobileNumber = this.registerForm.get('mobile')?.value;
      const fullPhoneNumber = this.selectedDialCode + mobileNumber; // Combine dial code and number

      const userData = { ...this.registerForm.value, mobile: fullPhoneNumber }; // Include full number in request

      this.service.registerUser(userData).subscribe({

        next: response => {
          this.isLoading = false;
          this.registerForm.reset();
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
