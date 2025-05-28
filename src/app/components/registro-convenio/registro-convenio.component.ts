import { UnidadEjecutoraService } from './../../services/unidad-ejecutora/unidad-ejecutora.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosConvenioComponent } from 'app/forms/datos-convenio/datos-convenio.component';
import { DatosItpComponent } from 'app/forms/datos-itp/datos-itp.component';
import { ContrapartesComponent } from 'app/forms/contrapartes/contrapartes.component';
import { EvaluacionAnualComponent } from 'app/forms/evaluacion-anual/evaluacion-anual.component';
import { PlanTrabajoComponent } from 'app/forms/plan-trabajo/plan-trabajo.component';
import { EvalAnualPtComponent } from 'app/forms/eval-anual-pt/eval-anual-pt.component';
import { StepsRegConvService } from 'app/services/steps-reg-conv/steps-reg-conv.service';
import { ApiService } from 'app/services/api/api.service';
import { PaisService } from 'app/services/pais/pais.service';
import { ModalidadConvService } from 'app/services/modalidad-conv/modalidad-conv.service';
import { DatosConvenioService } from 'app/services/datos-convenio/datos-convenio.service';/*TESTTTTT*/
import { Router } from '@angular/router';
import { PersonalCasService } from 'app/services/personal-cas/personal-cas.service';
import { AdjuntarArchivosComponent } from 'app/forms/adjuntar-archivos/adjuntar-archivos.component';
import { InstitucionService } from 'app/services/institucion/institucion.service';

@Component({
  selector: 'app-registro-convenio',
  imports: [CommonModule,DatosConvenioComponent,DatosItpComponent,ContrapartesComponent,EvaluacionAnualComponent,PlanTrabajoComponent,EvalAnualPtComponent,AdjuntarArchivosComponent],
  templateUrl: './registro-convenio.component.html',
  styleUrl: './registro-convenio.component.css'
})
export class RegistroConvenioComponent {

  constructor(
    public stepConv:StepsRegConvService,
    private api:ApiService,
    public pais:PaisService,
    public modalidadConv: ModalidadConvService,
    public datosConvServ: DatosConvenioService, 
    private router:Router,
    public unidadEjec: UnidadEjecutoraService,
    public personalCas: PersonalCasService,
    public institucionService: InstitucionService,
  ){}

  volver(){
    this.router.navigateByUrl('/')
  }

  ngOnInit(){
    // this.api.getPaises().subscribe({
    //   next: (data:any) => {
    //     this.pais.setPaises(data[0]);
    //   },
    //   error: (error) => {
    //     console.log(error)
    //   }
    // })

    this.api.getModalidadesConv().subscribe({
      next: (data:any) => {
        console.log(data)
        this.modalidadConv.setModalidadConv(data);

      },
      error: (error) => {
        console.log(error)
      }
    })
    this.api.getUnidadEjec().subscribe({
      next: (data:any) => {
        this.unidadEjec.setUnidadEjecutora(data);
      },
      error: (error) => {
        console.log(error)
      }
    })
    this.api.getInstituciones().subscribe({
      next: (data:any) => {
        this.institucionService.setInstitucion(data)
        
      },
      error: (error) => {
        console.error('Error al cargar instituciones globalmente:', error);
      }
    });
    // this.api.getPersonalCAS().subscribe({
    //   next: (data:any) => {
    //     this.personalCas.setPersonal(data[0]);
    //   },
    //   error: (error) => {
    //     console.log(error)
    //   }
    // })


    this.pais.setPaises([
      {
        "pais_id": 1,
        "nombre": 'Perú'
      },
      {
        "pais_id": 2,
        "nombre": 'Cuba'
      },
      {
        "pais_id": 3,
        "nombre": 'Rusia'
      },
      {
        "pais_id": 4,
        "nombre": 'China'
      }
    ])
    // this.modalidadConv.setModalidadConv([
    //   {
    //     "modalidad_convenio_id": 1,
    //     "nombre": 'Convenio Marco'
    //   },
    //   {
    //     "modalidad_convenio_id": 2,
    //     "nombre": 'Convenio Especifico'
    //   },
    //   {
    //     "modalidad_convenio_id": 3,
    //     "nombre": 'Otros'
    //   }
    // ])
    // this.unidadEjec.setUnidadEjecutora([
    //   {
    //     "personal_id": 1,
    //     "nombre":"DIDITT"
    //   },
    //   {
    //     "personal_id": 2,
    //     "nombre":"CITEmadera y Mueble"
    //   }
    // ])
    this.personalCas.setPersonal([
      {
        "personal_id": 1,
        "nombre":"DIDITT"
      },
      {
        "personal_id": 2,
        "nombre":"CITEmadera y Mueble"
      }
    ])

  }
}
