import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonalCasService {
  private personal: any[] = []

  constructor() { }

  setPersonal(personal: any) {
    this.personal=personal
  }

  getPersonal() {
    return this.personal
  }
}
