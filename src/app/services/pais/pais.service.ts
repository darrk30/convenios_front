import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private paises : any[] = []
  constructor() { }

  getPaises(){
    return this.paises
  }

  setPaises(paises:any[]){
    this.paises = paises
  }
}
