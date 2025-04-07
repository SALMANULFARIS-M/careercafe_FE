import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  Renderer2,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appTooltip]',
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

    // ❌ Disable on small screens
    if (window.innerWidth < 768) return;

    this.tooltipElement = this.renderer.createElement('div');
    this.tooltipElement.innerText = this.tooltipText;

    // Tooltip styling
    this.renderer.setStyle(this.tooltipElement, 'position', 'fixed');
    this.renderer.setStyle(this.tooltipElement, 'background', 'rgba(255, 255, 255, 0.1)');
    this.renderer.setStyle(this.tooltipElement, 'backdrop-filter', 'blur(10px)');
    this.renderer.setStyle(this.tooltipElement, 'border', '1px solid rgba(255, 255, 255, 0.2)');
    this.renderer.setStyle(this.tooltipElement, 'color', '#000000');
    this.renderer.setStyle(this.tooltipElement, 'padding', '10px 15px');
    this.renderer.setStyle(this.tooltipElement, 'border-radius', '8px');
    this.renderer.setStyle(this.tooltipElement, 'font-size', '14px');
    this.renderer.setStyle(this.tooltipElement, 'font-weight', '600');
    this.renderer.setStyle(this.tooltipElement, 'white-space', 'nowrap');
    this.renderer.setStyle(this.tooltipElement, 'box-shadow', '0px 8px 20px rgba(0, 0, 0, 0.3)');
    this.renderer.setStyle(this.tooltipElement, 'z-index', '9999');
    this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
    this.renderer.setStyle(this.tooltipElement, 'transition', 'opacity 0.3s ease, transform 0.2s ease');
    this.renderer.setStyle(this.tooltipElement, 'pointer-events', 'none');

    document.body.appendChild(this.tooltipElement);
    this.onMouseMove(event);

    setTimeout(() => {
      this.renderer.setStyle(this.tooltipElement, 'opacity', '1');
      this.renderer.setStyle(this.tooltipElement, 'transform', 'translateY(5px)');
    }, 10);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isBrowser && this.tooltipElement) {
      const xOffset = 20;
      const yOffset = 15;
      this.renderer.setStyle(this.tooltipElement, 'top', `${event.clientY + yOffset}px`);
      this.renderer.setStyle(this.tooltipElement, 'left', `${event.clientX + xOffset}px`);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.isBrowser && this.tooltipElement) {
      this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
      this.renderer.setStyle(this.tooltipElement, 'transform', 'translateY(0px)');
      setTimeout(() => {
        if (this.tooltipElement) {
          document.body.removeChild(this.tooltipElement);
          this.tooltipElement = null!;
        }
      }, 300);
    }
  }
}
