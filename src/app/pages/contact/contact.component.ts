import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private service: CommonService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }
  ngOnInit(): void {


  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.service.contact(this.contactForm.value)
        .subscribe({
          next: response => {
            this.contactForm.reset();
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: response.message,
              confirmButtonText: 'Okay'
            });
          }, error: error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong! Please try again.',
              confirmButtonText: 'Try Again'
            });
          }
        });
    }
  }
}
