import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalidadConvService {
  private modalidad_conv: any[] = [];
  constructor() { }

  getModalidadConv(){
    return this.modalidad_conv
  }

  setModalidadConv(modalidad:any){
    this.modalidad_conv = modalidad
  }
}
