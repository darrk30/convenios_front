import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosItpService {

  private unidadEjec: number = 0;
  private aporteMonSoles: number = 0.00;
  private aporteNoMonSoles: number = 0.00;
  private idProponente: number = 0;  
  private idCoordinadorTitular: number = 0;
  private idCoordinadorAlterno: number = 0;
  private idProponenteMarco: number = 0;  
  private idCoordinadorTitularMarco: number = 0;
  private idCoordinadorAlternoMarco: number = 0;

  setUnidadEjec(unidadEjec: number) {
    this.unidadEjec = unidadEjec;
  }

  getUnidadEjec() {
    return this.unidadEjec;
  }

  setAporteMonSoles(aporteMonSoles: number) {
    this.aporteMonSoles = aporteMonSoles;
  }

  getAporteMonSoles() {
    return this.aporteMonSoles;
  }

  setAporteNoMonSoles(aporteNoMonSoles: number) {
    this.aporteNoMonSoles = aporteNoMonSoles;
  }

  getAporteNoMonSoles() {
    return this.aporteNoMonSoles;
  }

  setIdProponente(idProponente: number) {
    this.idProponente = idProponente;
  }

  getIdProponente() {
    return this.idProponente;
  }

  setIdCoordinadorTitular(idCoordinadorTitular: number) {
    this.idCoordinadorTitular = idCoordinadorTitular;
  }

  getIdCoordinadorTitular() {
    return this.idCoordinadorTitular;
  }

  setIdCoordinadorAlterno(idCoordinadorAlterno: number) {
    this.idCoordinadorAlterno = idCoordinadorAlterno;
  }

  getIdCoordinadorAlterno() {
    return this.idCoordinadorAlterno;
  }

  setIdProponenteMarco(idProponenteMarco: number) {
    this.idProponenteMarco = idProponenteMarco;
  }

  getIdProponenteMarco() {
    return this.idProponenteMarco;
  }

  setIdCoordinadorTitularMarco(idCoordinadorTitularMarco: number) {
    this.idCoordinadorTitularMarco = idCoordinadorTitularMarco;
  }

  getIdCoordinadorTitularMarco() {
    return this.idCoordinadorTitularMarco;
  }

  setIdCoordinadorAlternoMarco(idCoordinadorAlternoMarco: number) {
    this.idCoordinadorAlternoMarco = idCoordinadorAlternoMarco;
  }

  getIdCoordinadorAlternoMarco() {
    return this.idCoordinadorAlternoMarco;
  }
}

