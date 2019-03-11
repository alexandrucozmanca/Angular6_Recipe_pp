import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  toggle = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener ('click') mouseClick() {
    if (!this.toggle) {
      this.renderer.addClass(this.elementRef.nativeElement, 'open');
      this.toggle = !this.toggle;
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'open');
      this.toggle = !this.toggle;
    }
  }

  @HostListener ('document:click', [`$event.target`]) outsideClick() {
    if (event.target !== this.elementRef.nativeElement.children[0]) {
      this.renderer.removeClass(this.elementRef.nativeElement, 'open');
      this.toggle = false;
    }
  }
}
