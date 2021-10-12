import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({ selector: '[appClickElsewhere]' })
export class ClickElsewhereDirective {
  @Output() readonly clickElsewhere = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event']) onDocumentClick(
    event: MouseEvent
  ): void {
    const targetElement = event.target as HTMLElement;

    // Check if the click was outside the element
    if (
      targetElement &&
      !this.elementRef.nativeElement.contains(targetElement)
    ) {
      this.clickElsewhere.emit(event);
    }
  }
}
