import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { fadeInUp, flipIn, scaleIn, bounceIn } from '../../constants/animation';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [CommonModule,RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  animations: [fadeInUp, flipIn, scaleIn, bounceIn],

})
export class AboutComponent implements AfterViewInit,OnInit{

constructor(private el: ElementRef,private renderer: Renderer2,){}

ngOnInit(): void {
   // Trigger animation for the first section immediately when the page loads
   setTimeout(() => {
    const firstSection = document.getElementById('first-elem');
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

}
