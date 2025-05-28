import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosConvenioService {

  private nombre_conv: string = ''
  // private pais: number = 0
  private modalidad_conv: number = 0
  private mod_otros: string = ''
  private objetivos_conv: string = ''
  private fecha_suscripcion_conv: string = ''
  private fecha_ini_conv: string = ''
  private fecha_fin_conv: string = ''
  private duracion_anio_conv: number = 0
  private duracion_mes_conv: number = 0
  private renovacion_conv: number = 0
  private fecha_ini_renov_conv: string = ''
  private fecha_fin_renov_conv: string = ''
  private observacion_conv:  string= ''
  private req_plan_trabajo: number = 0;

  getNombreConv(){
    return this.nombre_conv
  }

  setNombreConv(nombre:string){
    this.nombre_conv = nombre;
  }

  // getPais(){
  //   return this.pais
  // }

  // setPais(id:number){
  //   this.pais = id
  // }

  getModalidad_conv(){
    return this.modalidad_conv
  }

  setModalidad_conv(id:number){
    this.modalidad_conv = id
  }

  getMod_otros(){
    return this.mod_otros
  }

  setMod_otros(text:string){
    this.mod_otros = text
  }

  getObjetivosConv(){
    return this.objetivos_conv
  }

  setObjetivosConv(text:string){
    this.objetivos_conv = text
  }

  getFechaSuscripcionConv(){
    return this.fecha_suscripcion_conv
  }

  setFechaSuscripcionConv(fecha:string){
    this.fecha_suscripcion_conv = fecha
  }

  getFechaIniConv(){
    return this.fecha_ini_conv
  }

  setFechaIniConv(fecha:string){
    this.fecha_ini_conv = fecha
  }

  getFechaFinConv(){
    return this.fecha_fin_conv
  }

  setFechaFinConv(fecha:string){
    this.fecha_fin_conv = fecha
  }

  getDuracionAnioConv(){
    return this.duracion_anio_conv
  }

  setDuracionAnioConv(anio:number){
    this.duracion_anio_conv = anio
  }

  getDuracionMesConv(){
    return this.duracion_mes_conv
  }

  setDuracionMesConv(mes:number){
    this.duracion_mes_conv = mes
  }

  getRenovacionConv(){
    return this.renovacion_conv
  }

  setRenovacionConv(renovacion: number){
    this.renovacion_conv = renovacion
  }

  getFechaIniRenovConv(){
    return this.fecha_ini_renov_conv
  }

  setFechaIniRenovConv(fecha:string){
    this.fecha_ini_renov_conv = fecha
  }

  getFechaFinRenovConv(){
    return this.fecha_fin_renov_conv
  }

  setFechaFinRenovConv(fecha:string){
    this.fecha_fin_renov_conv = fecha
  }

  getObservacionRenov(){
    return this.observacion_conv
  }

  setObservacionRenov(observacion:string){
    this.observacion_conv = observacion
  }

  getReqPlanTrabajo() {
    return this.req_plan_trabajo;
  }

  setReqPlanTrabajo(valor: number) {
    this.req_plan_trabajo = valor;
  }
}
