import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../../core/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private service: CommonService,private toastr:ToastrService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  onSubmit() {
    if (this.contactForm.valid) {
      this.service.contact(this.contactForm.value).subscribe({
        next: (response) => {
          this.contactForm.reset();
          this.toastr.success(response.message, 'Success');
        },
        error: (error) => {
          this.toastr.error('Something went wrong! Please try again.', 'Error');
        }
      });
    } else {
      this.toastr.warning('Please fill out the form correctly.', 'Invalid Form');
    }
  }
}
