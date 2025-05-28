import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {
  private institucion: any[] = [];
  constructor() { }

  getInstitucion(){
    return this.institucion
  }

  setInstitucion(paramInstitucion:any){
    this.institucion = paramInstitucion
  }
}