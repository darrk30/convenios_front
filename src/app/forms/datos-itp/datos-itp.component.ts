import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'app/services/api/api.service';
import { UnidadEjecutoraService } from 'app/services/unidad-ejecutora/unidad-ejecutora.service';
import { DatosItpService } from 'app/services/datos-itp/datos-itp.service';
import { PersonalCasService } from 'app/services/personal-cas/personal-cas.service';

@Component({
  selector: 'app-datos-itp',
  imports: [CommonModule,FormsModule],
  templateUrl: './datos-itp.component.html',
  styleUrl: './datos-itp.component.css'
})
export class DatosItpComponent {
  constructor(
    public unidadEjecutora:UnidadEjecutoraService,
    public personalCas: PersonalCasService,
    public datosITP: DatosItpService
  ){}

  unidad_ejec_select:number = 0;
  aporteMonSoles:number = 0.00;
  aporteNoMonSoles:number = 0.00;
  idDatosProponentes:number = 0;
  idCoordinadorTitular:number = 0;
  idCoordinadorAlterno:number = 0;
  idDatosProponentesMarco:number = 0;
  idCoordinadorTitularMarco:number = 0;
  idCoordinadorAlternoMarco:number = 0;


  asignarUnidadEjec(event:Event){
    const idUnidadEjec = (event.target as HTMLSelectElement).value
    this.datosITP.setUnidadEjec(Number(idUnidadEjec))
  }
  asignarAporteMonSoles(event:Event){
    const texto = event.target as HTMLInputElement
    this.datosITP.setAporteMonSoles(Number(texto.value))
  }
  asignarAporteNoMonSoles(event:Event){
    const texto = event.target as HTMLInputElement
    this.datosITP.setAporteNoMonSoles(Number(texto.value))
  }
  asignarProponente(event:Event){
    const idProponenteSeleccionado = (event.target as HTMLSelectElement).value
    this.datosITP.setIdProponente(Number(idProponenteSeleccionado))
  }
  asignarCoordinadorTitular(event:Event){
    const idCoordinadorTitular = (event.target as HTMLSelectElement).value
    this.datosITP.setIdCoordinadorTitular(Number(idCoordinadorTitular))
  }
  asignarCoordinadorAlterno(event:Event){
    const idCoordinadorTitularAlterno = (event.target as HTMLSelectElement).value
    this.datosITP.setIdCoordinadorAlterno(Number(idCoordinadorTitularAlterno))
  }
  asignarProponenteMarco(event:Event){
    const idProponenteMarcoSeleccionado = (event.target as HTMLSelectElement).value
    this.datosITP.setIdProponenteMarco(Number(idProponenteMarcoSeleccionado))
  }
  asignarCoordinadorTitularMarco(event:Event){
    const idCoordinador = (event.target as HTMLSelectElement).value
    this.datosITP.setIdCoordinadorTitularMarco(Number(idCoordinador))
  }
  asignarCoordinadorAlternoMarco(event:Event){
    const idCoordinador = (event.target as HTMLSelectElement).value
    this.datosITP.setIdCoordinadorAlternoMarco(Number(idCoordinador))
  }
  ngOnInit(){
    this.unidad_ejec_select = this.datosITP.getUnidadEjec()
    
  }

}
