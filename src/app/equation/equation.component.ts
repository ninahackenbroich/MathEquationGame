import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { CustomValidators } from "../custom-validators";
import { delay, filter, scan } from "rxjs/operators";

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent {
  secondsPerSolution: number = 0;

  equation: FormGroup = new FormGroup({
    value1: new FormControl(this.randomNumber()),
    value2: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  },
    [
      CustomValidators.addition('answer', 'value1', 'value2')
    ]
  );

  ngOnInit() {
    this.equation.statusChanges.pipe(
      filter((value) => value === 'VALID'),
      delay(500),
      scan((acc) => {
        return {
          numberSolved: acc.numberSolved + 1,
          startTime: acc.startTime
        };
      }, { numberSolved: 0, startTime: new Date() })
    ).subscribe(({ numberSolved, startTime }) => {
      this.secondsPerSolution = (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;
      this.resetForm();
    });
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  resetForm() {
    this.equation.setValue({
      value1: this.randomNumber(),
      value2: this.randomNumber(),
      answer: ''
    });
  }

}
