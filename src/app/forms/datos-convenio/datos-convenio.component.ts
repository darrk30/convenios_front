import { Component } from '@angular/core';
import { DatosConvenioService } from 'app/services/datos-convenio/datos-convenio.service';
import { ApiService } from 'app/services/api/api.service';
import { Convenio } from 'app/services/api/convenio.interface'; // Importar la interfaz Convenio
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { PaisService } from 'app/services/pais/pais.service';
import { ModalidadConvService } from 'app/services/modalidad-conv/modalidad-conv.service';
import { StepsRegConvService } from 'app/services/steps-reg-conv/steps-reg-conv.service';

@Component({
  selector: 'app-datos-convenio',
  imports: [CommonModule,FormsModule],
  templateUrl: './datos-convenio.component.html',
  styleUrl: './datos-convenio.component.css'
})
export class DatosConvenioComponent {
  constructor (
    public datosConvServ:DatosConvenioService,
    // public pais: PaisService,
    public modalidad: ModalidadConvService,
    public api:ApiService,
    public stepConv: StepsRegConvService
  ){}

  nombre_conv: string = ''
  // paisSelect: number = 0
  modalidadSelect: number = 0
  mod_otros: string = ''
  objetivos_conv: string = ''
  fecha_suscripcion_conv: string = ''
  fecha_ini_conv: string = ''
  fecha_fin_conv: string = ''
  duracion_anio_conv: number = 0
  duracion_mes_conv: number = 0
  renovacion_conv: number = 2; // Changed initial value from 0 to 2
  fecha_ini_renov_conv: string = ''
  fecha_fin_renov_conv: string = ''
  observacion_conv:  string = ''
  req_plan_trabajo: number = 0
  fechaInicioError: string = '';
  fechaFinError: string = '';
  toggleSiNo: boolean = false;

  get a_req_plan_trabajo() {
    return this.req_plan_trabajo;/*return this.req_plan_trabajo;*/
  }

  

  fncTogglePlanTrabajoLabel(event:Event) {
    const checkbox = event.target as HTMLInputElement;
    this.req_plan_trabajo = checkbox.checked ? 1 : 2;
    checkbox.checked = this.req_plan_trabajo === 1; // Add this line to sync visual state
}

  asignarPlanTrabajo(valor: number) {
    this.req_plan_trabajo =valor;
  }

  asignarNombre(){
    this.datosConvServ.setNombreConv(this.nombre_conv)
  }

  // asignarPais(event:Event){
  //   const idPaisSeleccionado = (event.target as HTMLSelectElement).value
  //   this.datosConvServ.setPais(Number(idPaisSeleccionado))
  // }

  asignarModalidad(event:Event){
    const idModSeleccionado = (event.target as HTMLSelectElement).value
    this.datosConvServ.setModalidad_conv(Number(idModSeleccionado))
  }

  asignarModOtros(){
    this.datosConvServ.setMod_otros(this.mod_otros)
  }

  asignarObjetivos(event:Event){
    const texto = event.target as HTMLTextAreaElement
    this.datosConvServ.setObjetivosConv(String(texto.value))
  }

  asingarFechaSuscrip(){
    this.datosConvServ.setFechaSuscripcionConv(this.fecha_suscripcion_conv)
  }

  asingarFechaIni(){
    const fechaSuscripcion = new Date(this.fecha_suscripcion_conv);
    const fechaInicio = new Date(this.fecha_ini_conv);

    if (fechaInicio < fechaSuscripcion) {
      this.fechaInicioError = 'La fecha no puede ser anterior a la fecha de suscripción.';
      this.fecha_ini_conv = ''; // Reset the date
    } else {
      this.fechaInicioError = '';
      this.datosConvServ.setFechaIniConv(this.fecha_ini_conv)
      this.asingarFechaFin();
    }
  }

  asingarFechaFin(){
    const fechaSuscripcion = new Date(this.fecha_suscripcion_conv);
    const inicio = new Date(this.fecha_ini_conv)
    const final = new Date(this.fecha_fin_conv)
    if (final < fechaSuscripcion) 
    {
      this.fechaFinError = 'La fecha no puede ser anterior a la fecha de suscripción.';
      this.fecha_fin_conv = ''; // Reset the date
    }
    else
    {
      this.fechaFinError = '';
    }
    let totalMeses = (final.getFullYear() - inicio.getFullYear()) * 12 + (final.getMonth() - inicio.getMonth());

    // Ajustar si el día final es menor que el día inicial
    if (final.getDate() < inicio.getDate()) {
      totalMeses--;
    }

    this.duracion_anio_conv = Math.floor(totalMeses / 12);
    this.duracion_mes_conv = totalMeses % 12;

    this.datosConvServ.setFechaFinConv(this.fecha_fin_conv)
    this.datosConvServ.setDuracionAnioConv(this.duracion_anio_conv)
    this.datosConvServ.setDuracionMesConv(this.duracion_mes_conv)
  }

  asignarDuracionAnio(event:Event){
    const texto = event.target as HTMLTextAreaElement
    this.datosConvServ.setDuracionAnioConv(Number(texto))
  }

  asignarDuracionMes(event:Event){
    const texto = event.target as HTMLTextAreaElement
    this.datosConvServ.setDuracionMesConv(Number(texto))
  }

  asignarRenovacion(valor: number) {
    this.datosConvServ.setRenovacionConv(valor);
  }

  asingarFechaIniRenov(){
    this.datosConvServ.setFechaIniRenovConv(this.fecha_ini_renov_conv)
  }

  asignarFechaFinRenov(){
    this.datosConvServ.setFechaFinRenovConv(this.fecha_fin_renov_conv)
  }

  asignarObservacion(event:Event){
    const texto = event.target as HTMLTextAreaElement
    this.datosConvServ.setObservacionRenov(String(texto.value))
  }
  
  guardarConvenio() {
    const convenioData: Convenio = {
      nombre: this.nombre_conv,
      modalidadConvenioId: this.modalidadSelect,
      nuevoNombreModalidadConvenio: this.mod_otros,
      objetivos: this.objetivos_conv,
      fechaSubscripcion: this.fecha_suscripcion_conv,
      fechaInicio: this.fecha_ini_conv,
      vigenciaMeses: this.duracion_mes_conv + (this.duracion_anio_conv * 12),
      estadoAcuerdoId: 1,
      requierePlanTrabajo: this.req_plan_trabajo === 1 ? true : false,
      renovacionAutomatica: this.renovacion_conv === 1 ? true : false,
      fechaInicioRenovacion : this.fecha_ini_renov_conv,
      fechaFinRenovacion: this.fecha_fin_renov_conv,
      observacion: this.observacion_conv,
    };

    this.api.postConvenio(convenioData).subscribe({
      next: (response) => {
        console.log('Convenio guardado exitosamente', response);
        // Aquí puedes manejar la respuesta exitosa, por ejemplo, navegar a otra página o mostrar un mensaje.
      },
      error: (error) => {
        console.error('Error al guardar el convenio', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario.
      }
    });
  }

  ngOnInit(){
    this.nombre_conv = this.datosConvServ.getNombreConv()
    // this.paisSelect = this.datosConvServ.getPais()
    this.modalidadSelect = this.datosConvServ.getModalidad_conv()
    this.mod_otros = this.datosConvServ.getMod_otros()
    this.objetivos_conv = this.datosConvServ.getObjetivosConv()
    this.fecha_suscripcion_conv = this.datosConvServ.getFechaSuscripcionConv()
    this.fecha_ini_conv = this.datosConvServ.getFechaIniConv()
    this.fecha_fin_conv = this.datosConvServ.getFechaFinConv()
    this.duracion_anio_conv = this.datosConvServ.getDuracionAnioConv()
    this.duracion_mes_conv = this.datosConvServ.getDuracionMesConv()
    this.renovacion_conv = this.datosConvServ.getRenovacionConv()
    this.fecha_ini_renov_conv = this.datosConvServ.getFechaIniRenovConv()
    this.fecha_fin_renov_conv = this.datosConvServ.getFechaFinRenovConv()
    this.observacion_conv = this.datosConvServ.getObservacionRenov()
  }

  
}
