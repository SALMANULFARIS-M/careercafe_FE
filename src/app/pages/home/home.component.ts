import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import Swal from 'sweetalert2';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';
import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule,TimeFormatPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    // Fade In Up Animation
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })), // Increased to 0.5s
      ]),
    ]),

    // Flip In Animation
    trigger('flipIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'rotateY(90deg)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'rotateY(0)' })), // Increased to 0.5s
      ]),
    ]),

    // Scale In Animation
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' })), // Increased to 0.5s
      ]),
    ]),

    // Bounce In Animation
    trigger('bounceIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px) scale(0.8)' }),
        animate('1s cubic-bezier(0.68, -0.55, 0.27, 1.55)', style({ opacity: 1, transform: 'translateY(0) scale(1)' })), // Increased to 1s
      ]),
    ]),
  ]
})

export class HomeComponent implements OnInit, AfterViewInit {
  availableTimes: string[] = [];
  currentTime: Date = new Date();
  allTimes: string[] = [
    '10:00', // 10:00 AM
    '11:00', // 11:00 AM
    '12:00', // 12:00 PM
    '14:00', // 02:00 PM
    '15:00', // 03:00 PM
    '16:00', // 04:00 PM
    '17:00'  // 05:00 PM
  ];

  constructor(private el: ElementRef, private renderer: Renderer2, private service: CommonService) {
    this.setAvailableTimes();
  }
  isLoading = false; // Control the loading spinner visibility

  ngOnInit(): void {
    // Trigger animation for the first section immediately when the page loads
    setTimeout(() => {
      const firstSection = document.getElementById('first-section');
      firstSection?.classList.add('animate-active');
    }, 0);
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add 'animate-active' class when element is in view
            this.renderer.addClass(entry.target, 'animate-active');
            observer.unobserve(entry.target); // Stop observing once animated
          }
        });
      },
      { threshold: 0.2 } // You can adjust the threshold for how much of the element should be visible
    );

    // Apply observer to all elements with class 'animated-box'
    const elements = this.el.nativeElement.querySelectorAll('.animated-box');
    elements.forEach((el: Element) => observer.observe(el));
    // Apply observer to the element that will flip (if it has a specific ID or class)
    const flipInElement = this.el.nativeElement.querySelector('.flip-in-box');
    if (flipInElement) {
      observer.observe(flipInElement);
    }
  }

  @ViewChild('admissionFormSection') admissionFormSection!: ElementRef;

  scrollToForm() {
    if (this.admissionFormSection) {
      this.admissionFormSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  images = [
    'https://cdn.prod.website-files.com/609d8acf830e6079f27ba963/6662a21f74ba8dd445d1fb1f_Career%20Guidance%20for%20Students.jpg',
    'https://cdn.prod.website-files.com/5f55ff47b6d23a11cb496a69/63bf12f4af35cb482104b19a_35%20career%20development%20questions.jpg',
    'https://i.etsystatic.com/31601277/r/il/eb8132/5569113829/il_fullxfull.5569113829_143k.jpg',
    'https://static.vecteezy.com/system/resources/previews/006/974/797/non_2x/coaching-process-concept-paper-sheet-with-ideas-or-plan-cup-of-coffee-and-eyeglasses-on-desk-photo.jpg'
  ];
  services = [
    { title: 'Education Guidance', description: 'Explore top universities and programs worldwide.' },
    { title: 'Career Counseling', description: 'Find the right career path and job opportunities' },
    { title: 'PR and Immigration', description: 'Get expert advice on securing PR in 120 countries.' }
  ];

  benefits = [
    { title: 'Global Reach', description: 'Partnerships in over 120 countries.' },
    { title: 'Personalized Services', description: 'Tailored advice to meet your needs.' },
    { title: 'Expert Consultants', description: 'Access to experienced professionals.' }
  ];
  events = [
    { name: 'Finding Jobs', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHP3X40qSYXqN7C1D3DqJSkRiv3alfvQo1vg&s' },
    { name: 'PR', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDazSFLf0zKnQeu5rZMLp7bz-lu2v_Y9z3lJFVhjLQ2qtqY0Ik2UpwZXy1XHP6uHQW9rM&usqp=CAU' },
    { name: 'MBBS Abroad', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs-KDg-uYYlKsxEMkY_cJ7u2AwAh7RwGzaqg&s' },
    { name: 'MBBS India', image: 'https://mbbsexpert.in/wp-content/uploads/2021/05/India.jpg' },
    { name: 'Abroad Jobs', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRI9s3h4bhrorKaaC91NKKSOISZhGxonT38ylby6Jy8lR6bNQe9nRO_wUTJV_74WYX8VY&usqp=CAU' },
    { name: 'tech Events', image: 'https://storage.googleapis.com/techsauce-prod/ugc/uploads/2024/4/1713844557_1692263684_S__13025327_0_%282%29.jpg' },

  ];
  isValidDate(date: string): boolean {
    const enteredDate = new Date(date);
    const currentDate = new Date();
    return enteredDate >= currentDate;  // Ensures the date is in the future or today
  }
  timeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value) return null; // If no value, it's valid (handled by required validator)

    const [hours, minutes] = control.value.split(':').map(Number);

    if (hours < 10 || hours > 17) {
      return { invalidTime: true }; // Return error if time is outside allowed range
    }

    return null; // Valid time
  }

  getMinDate(): string {
    const today = new Date();
    const hours = today.getHours(); // Get current hour

    // If current time is past 5 PM, set the minimum date to tomorrow
    if (hours >= 17) {
      today.setDate(today.getDate() + 1);
    }

    const yyyy = today.getFullYear();
    let mm: string | number = today.getMonth() + 1; // January is 0!
    let dd: string | number = today.getDate();

    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;

    return `${yyyy}-${mm}-${dd}`; // Returns YYYY-MM-DD format
  }


  // Custom date validator function
  dateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return { required: true }; // Ensure value exists

    const inputDate = new Date(control.value);
    const today = new Date();

    // Set time to midnight to prevent issues with time zones
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    if (isNaN(inputDate.getTime())) {
      return { invalidDate: true }; // Invalid date format
    }

    if (inputDate < today) {
      return { pastDate: true }; // Prevent selecting past dates
    }

    return null; // Valid date
  }
  setAvailableTimes() {
    // Filter out past times based on current time
    this.availableTimes = this.allTimes.filter((time) => {
      const [hours, minutes] = time.split(':').map(num => parseInt(num, 10));
      const timeInMinutes = hours * 60 + minutes;
      const currentTimeInMinutes = this.currentTime.getHours() * 60 + this.currentTime.getMinutes();

      return timeInMinutes > currentTimeInMinutes;
    });
  }

  // Form initialization with validation
  admissionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')  // 10-digit phone number
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    category: new FormControl('', [Validators.required]),
    place: new FormControl('', [Validators.required]),
    date: new FormControl('', [
      Validators.required,
      (control) => this.dateValidator(control)  // Apply custom date validator
    ]),
    time: new FormControl('', [Validators.required, (control) => this.timeValidator(control)])
  });

  //Handle form submission
  onSubmit() {
    if (this.admissionForm.valid) {
      const formData = this.admissionForm.value;
      this.isLoading = true; // Show spinner while submitting
      this.service.registerappoinment(formData)
        .subscribe({
          next: response => {
            this.isLoading = false;
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: response.message,
              confirmButtonText: 'Okay'
            });
          },
          error: err  => {
            this.isLoading = false; // Hide the spinner on error
            // Use SweetAlert2 for attractive error alert
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong! Please try again.',
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
