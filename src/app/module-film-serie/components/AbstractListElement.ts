import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({ template: '' })
export abstract class AbstractListElement {
  static LIMIT_NB_FILM: number = 50;
  static ADD_TO_LIMIT: number = 25;

  public limitMovie: number = AbstractListElement.LIMIT_NB_FILM;

  @ViewChild('scrollContainer') public scrollContainer!: ElementRef;

  ngAfterViewInit() {
    if (this.scrollContainer) {
      (this.scrollContainer.nativeElement as HTMLDivElement).addEventListener(
        'scrollend',
        () => {
          this.onScroll();
          
        }
      );
    }
  }

  abstract onScroll: () => void;
}
