import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadosConvService {
  private estados: any[] = [];
  constructor() { }

  getEstados(){
    return this.estados
  }

  setEstados(estados:any[]){
    this.estados = estados
  }
}
