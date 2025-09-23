import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonService } from '../../../core/services/common.service';
import { fadeInUp, flipIn, scaleIn, bounceIn } from '../../../shared/constants/animation';
import { TimeFormatPipe } from '../../../shared/pipes/time-format.pipe';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TooltipDirective } from '../../../shared/directives/tooltip.directive';


@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule, TimeFormatPipe, RouterModule, TooltipDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [fadeInUp, flipIn, scaleIn, bounceIn],
})

export class HomeComponent implements OnInit, AfterViewInit {
  availableTimes: string[] = [];
  currentTime: Date = new Date();
  isLoading = false; // Control the loading spinner visibility
  isTooltipVisible: boolean = true;
  private dateChangeSubscription!: Subscription;
  allTimes: string[] = [
    '10:00', // 10:00 AM
    '11:00', // 11:00 AM
    '12:00', // 12:00 PM
    '14:00', // 02:00 PM
    '15:00', // 03:00 PM
    '16:00', // 04:00 PM
    '17:00'  // 05:00 PM
  ];
  @ViewChild('admissionFormSection') admissionFormSection!: ElementRef;

  constructor(private el: ElementRef, private renderer: Renderer2, private service: CommonService,
    @Inject(PLATFORM_ID) private platformId: object, private toastr: ToastrService, private router: Router) {
    this.setAvailableTimes();
  }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      setTimeout(() => {
        const firstSection = document.getElementById('first-section');
        firstSection?.classList.add('animate-active');
      }, 0);

      this.dateChangeSubscription = this.admissionForm.controls['date'].valueChanges.subscribe(() => {
        this.setAvailableTimes();
      });

      this.setAvailableTimes();
    }
  }

  ngOnDestroy(): void {
    this.dateChangeSubscription?.unsubscribe();
  }


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {

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
  }

  scrollToForm() {

    if (isPlatformBrowser(this.platformId) && this.admissionFormSection) {
      this.admissionFormSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }


  images = [
    'https://cdn.prod.website-files.com/609d8acf830e6079f27ba963/6662a21f74ba8dd445d1fb1f_Career%20Guidance%20for%20Students.jpg',
    'https://cdn.prod.website-files.com/5f55ff47b6d23a11cb496a69/63bf12f4af35cb482104b19a_35%20career%20development%20questions.jpg',
    'https://i.etsystatic.com/31601277/r/il/eb8132/5569113829/il_fullxfull.5569113829_143k.jpg',
    'https://static.vecteezy.com/system/resources/previews/006/974/797/non_2x/coaching-process-concept-paper-sheet-with-ideas-or-plan-cup-of-coffee-and-eyeglasses-on-desk-photo.jpg'
  ];
  services = [
    {
      title: 'Education Guidance',
      description: 'Expert advice on educational pathways tailored to your career goals and aspirations.',
      icon: 'education',
    },
    {
      title: 'Career Planning',
      description: 'Strategic career planning and development services to help you achieve your professional goals.',
      icon: 'career',
    },
    {
      title: 'PR Consultancy',
      description: 'Comprehensive guidance on permanent residency applications and immigration pathways.',
      icon: 'pr',
    },
  ];

  benefits = [
    {
      title: 'Personalized Approach',
      description:
        'Tailored solutions based on your unique background, goals, and circumstances.',
    },
    {
      title: 'Expert Consultants',
      description:
        'Experienced professionals with deep knowledge of education systems and immigration policies.',
    },
    {
      title: 'Supportive Environment',
      description:
        'A comfortable café atmosphere where you can discuss your future over a cup of coffee.',
    },
  ];

  programs = [
    { name: 'Education', image: 'https://i.ytimg.com/vi/2WRYsRgbkww/maxresdefault.jpg' },
    { name: 'Abroad Education', image: 'https://i.pinimg.com/736x/46/26/44/462644190b2332e2f3042fa745746f42.jpg' },
    { name: 'Visa Attestation', image: 'https://acevisaandtravels.com/img/banner-bg.jpg' },
    { name: 'Jobs', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHP3X40qSYXqN7C1D3DqJSkRiv3alfvQo1vg&s' },
    { name: 'Abroad Jobs', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRI9s3h4bhrorKaaC91NKKSOISZhGxonT38ylby6Jy8lR6bNQe9nRO_wUTJV_74WYX8VY&usqp=CAU' },
    { name: 'PR', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDazSFLf0zKnQeu5rZMLp7bz-lu2v_Y9z3lJFVhjLQ2qtqY0Ik2UpwZXy1XHP6uHQW9rM&usqp=CAU' },
  ];

  isValidDate(date: string): boolean {
    const enteredDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    enteredDate.setHours(0, 0, 0, 0);
    return enteredDate >= today && enteredDate.getDay() !== 0; // Exclude Sundays
  }

  timeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value) return null; // Handled by required validator

    const [hours] = control.value.split(':').map(Number);
    return hours < 10 || hours > 17 ? { invalidTime: true } : null;
  }

  getMinDate(): string {
    const today = new Date();
    if (today.getHours() >= 17) today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  dateValidator = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return { required: true };

    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    if (isNaN(inputDate.getTime())) return { invalidDate: true };
    if (inputDate < today) return { pastDate: true };
    if (inputDate.getDay() === 0) return { sundayNotAllowed: true };

    return null;
  };

  setAvailableTimes(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const selectedDate = this.admissionForm.get('date')?.value;
    if (!selectedDate) {
      this.availableTimes = [];
      return;
    }

    const selectedDateObj = new Date(selectedDate);
    const isToday = selectedDateObj.toDateString() === new Date().toDateString();
    const now = new Date();

    this.availableTimes = this.allTimes.filter((time) => {
      const [hours, minutes] = time.split(':').map(Number);
      const timeObj = new Date(selectedDateObj);
      timeObj.setHours(hours, minutes, 0, 0);
      return isToday ? timeObj > now : true;
    });
  }



  admissionForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    category: new FormControl('', Validators.required),
    place: new FormControl('', Validators.required),
    date: new FormControl('', [Validators.required, this.dateValidator]),
    time: new FormControl('', [Validators.required, this.timeValidator])
  });

  //Handle form submission
  onSubmit() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.admissionForm.valid) {
        this.isLoading = true;
        this.admissionForm.disable();  // Optional but good UX

        const formData = this.admissionForm.value;
        this.service.registerappoinment(formData).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.admissionForm.reset();
            this.admissionForm.enable();
            this.toastr.success(response.message, 'Success');
          },
          error: () => {
            this.isLoading = false;
            this.admissionForm.enable();
            this.toastr.error('Something went wrong! Please try again.', 'Error');
          }
        });
      } else {
        this.toastr.warning('Please fill out all required fields correctly.', 'Invalid Form');

        // Optional: Auto scroll to the first invalid field
        const firstInvalid = document.querySelector('.ng-invalid');
        firstInvalid?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

toEligibility() {
 this.router.navigate(['/eligibility-checker']);
}


}
