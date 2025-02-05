// animations.ts
import { trigger, style, animate, transition } from '@angular/animations';

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

export const flipIn = trigger('flipIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'rotateY(90deg)' }),
    animate('0.5s ease-out', style({ opacity: 1, transform: 'rotateY(0)' })),
  ]),
]);

export const scaleIn = trigger('scaleIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
]);

export const bounceIn = trigger('bounceIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-20px) scale(0.8)' }),
    animate('1s cubic-bezier(0.68, -0.55, 0.27, 1.55)', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
  ]),
]);

// Export all animations as an array (recommended)
export const sharedAnimations = [fadeInUp, flipIn, scaleIn, bounceIn];


// Or export them individually (alternative):
// export { fadeInUp, flipIn, scaleIn, bounceIn };
