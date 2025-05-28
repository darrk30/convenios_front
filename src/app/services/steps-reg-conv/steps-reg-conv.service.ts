import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class StepsRegConvService {
  private currentStep = new BehaviorSubject<number>(1);
  private maxStep = new BehaviorSubject<number>(6);
  currentStep$ = this.currentStep.asObservable();
  maxStep$ = this.maxStep.asObservable();

  nextStepConv() {
    const current = this.currentStep.value;
    switch (current) {
      case this.maxStep.value:
        this.currentStep.next(this.maxStep.value);
        break;
      default:
        this.currentStep.next(current + 1);
        break;
    }
  }

  getCurrentStepConv() {
    return this.currentStep.value;
  }

  setStepConv(step:number){
    this.currentStep.next(step)
  }
}
