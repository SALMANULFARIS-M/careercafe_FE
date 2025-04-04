import { Directive, ElementRef, HostListener, Input, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText!: string;
  tooltipElement!: HTMLElement;
  isBrowser: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    if (!this.isBrowser || !this.tooltipText) return;

    console.log('Tooltip activated:', this.tooltipText);

    this.tooltipElement = this.renderer.createElement('div');
    this.tooltipElement.innerText = this.tooltipText;

    // 🌟 Updated Tooltip Styling
    this.renderer.setStyle(this.tooltipElement, 'position', 'fixed'); // ✅ Follows mouse
    this.renderer.setStyle(this.tooltipElement, 'background', 'rgba(255, 255, 255, 0.1)'); // Light transparent bg
    this.renderer.setStyle(this.tooltipElement, 'backdrop-filter', 'blur(10px)'); // Glass effect
    this.renderer.setStyle(this.tooltipElement, 'border', '1px solid rgba(255, 255, 255, 0.2)'); // Subtle border
    this.renderer.setStyle(this.tooltipElement, 'color', '#000000'); // ✅ Yellow text
    this.renderer.setStyle(this.tooltipElement, 'padding', '10px 15px');
    this.renderer.setStyle(this.tooltipElement, 'border-radius', '8px'); // Rounded
    this.renderer.setStyle(this.tooltipElement, 'font-size', '14px');
    this.renderer.setStyle(this.tooltipElement, 'font-weight', '600'); // Slightly bolder for better readability
    this.renderer.setStyle(this.tooltipElement, 'white-space', 'nowrap');
    this.renderer.setStyle(this.tooltipElement, 'box-shadow', '0px 8px 20px rgba(0, 0, 0, 0.3)'); // Soft shadow
    this.renderer.setStyle(this.tooltipElement, 'z-index', '9999');
    this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
    this.renderer.setStyle(this.tooltipElement, 'transition', 'opacity 0.3s ease, transform 0.2s ease'); // Smooth fade
    this.renderer.setStyle(this.tooltipElement, 'pointer-events', 'none'); // Prevent blocking elements

    document.body.appendChild(this.tooltipElement);
    this.onMouseMove(event); // Set position
    setTimeout(() => {
      this.renderer.setStyle(this.tooltipElement, 'opacity', '1'); // Fade in
      this.renderer.setStyle(this.tooltipElement, 'transform', 'translateY(5px)'); // Subtle movement
    }, 10);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isBrowser && this.tooltipElement) {
      const xOffset = 20; // Distance from cursor
      const yOffset = 15;
      this.renderer.setStyle(this.tooltipElement, 'top', `${event.clientY + yOffset}px`);
      this.renderer.setStyle(this.tooltipElement, 'left', `${event.clientX + xOffset}px`);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.isBrowser && this.tooltipElement) {
      console.log('Tooltip removed');
      this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
      this.renderer.setStyle(this.tooltipElement, 'transform', 'translateY(0px)'); // Smooth exit

      setTimeout(() => {
        if (this.tooltipElement) {
          document.body.removeChild(this.tooltipElement);
          this.tooltipElement = null!;
        }
      }, 300); // Remove after fade-out
    }
  }
}
