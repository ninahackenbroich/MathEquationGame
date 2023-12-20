import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map } from 'rxjs';


@Directive({
  selector: '[appAnswerHighlight]'
})
export class AnswerHighlightDirective {

  constructor(private el: ElementRef, private controlName: NgControl) {
  }

  ngOnInit() {
    if (this.controlName.control && this.controlName.control.parent) {
      this.controlName.control.parent.valueChanges.pipe(
        map(({ value1, value2, answer }) => Math.abs((value1 + value2 - answer) / (value1 + value2)))
      ).subscribe
        ((value) => {
          if (value < 0.2) {
            this.el.nativeElement.classList.add('close');
          } else {
            this.el.nativeElement.classList.remove('close');
          }
        });
    }
  }
}
