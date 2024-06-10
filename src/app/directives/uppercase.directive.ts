import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUppercase]',
  standalone: true
})
export class UppercaseDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.el.nativeElement.value = input.value;
  }
}
