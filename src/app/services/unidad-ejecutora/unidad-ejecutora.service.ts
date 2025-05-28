import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UnidadEjecutoraService {
  private unidad_ejecutora: any[] = [];
  constructor() { }

  getUnidadEjecutora(){
    return this.unidad_ejecutora
  }

  setUnidadEjecutora(unidad:any[]){
    this.unidad_ejecutora = unidad
  }
}
