import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PagetitleComponent } from 'src/app/shared/components/pagetitle/pagetitle.component';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { limpiarCamposVacios, transformFormData } from 'src/app/core/helpers/clean-form';

import { InstitucionesStateService } from 'src/app/features/private/maintenance/instituciones/services/instituciones-state.service';
import { PaisesStateService } from 'src/app/features/private/maintenance/paises/services/paises-state.service';
import { TiposInstitucionesStateService } from 'src/app/features/private/maintenance/tipos-instituciones/services/tipos-instituciones-state.service';
import { SectoresInstitucionesStateService } from 'src/app/features/private/maintenance/sectores-instituciones/services/sectores-instituciones-state.service';

@Component({
  selector: 'app-instituciones-form',
  standalone:true,
  imports:[CommonModule,PagetitleComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './instituciones-form.component.html',
  styleUrl: './instituciones-form.component.css'
})
export class InstitucionesFormComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  private formBuilder = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private spinner = inject(NgxSpinnerService);
  public institucionesStateService = inject(InstitucionesStateService);
  public paisesStateService = inject(PaisesStateService);
  public tiposInstitucionesStateService = inject(TiposInstitucionesStateService);
  public sectoresInstitucionesStateService = inject(SectoresInstitucionesStateService);

  breadCrumbItems: Array<{}>;

  

  formData: FormGroup = this.formBuilder.group({
    ideInstitucion:[],
    idePais:[,[Validators.required]],
    ideTipoInstitucion:[,[Validators.required]],
    ideSectorInstitucion:[,[Validators.required]],
    txtInstitucion:[,[Validators.required]],
    numIdentificadorFiscal:[],
    uuid: []
  });

  submitted = false;


  ideInstitucion:number;
  titleComponent:string;
  flagAction:number;
  idePagina:number;

  constructor(){
    this.route.data.subscribe((data) => {
            this.titleComponent = data.title;
            this.flagAction = data.flagAction;
        });

    this.ideInstitucion = Number(this.route.snapshot.paramMap.get('id'));

    effect(() => {
      const item = this.institucionesStateService.item();

      if (item) {
        console.log("Nuevo valor recibido:", item);
        this.formData.patchValue(item);        
      }
    });
  }

  ngOnInit(): void {
    console.log(this.flagAction)

    this.breadCrumbItems = [{ label: this.titleComponent }];
    this.institucionesStateService.clearState();

    this.listarPaises();
    this.listarTiposInstituciones();
    this.listarSectoresInstituciones();
		this.getInstitucion();

    if (this.flagAction == 1) { // Modo CREAR
      this.idePagina = 4;
    }else if(this.flagAction == 2){
      this.idePagina = 4;
    }else if(this.flagAction == 3) { // Modo CREAR
      this.formData.disable();
      this.idePagina = 4;
    }
  }

  listarPaises(){
    this.paisesStateService.loadItems();
  }

  listarTiposInstituciones(){
    this.tiposInstitucionesStateService.loadItems();
  }

  listarSectoresInstituciones(){
    this.sectoresInstitucionesStateService.loadItems();
  }

  grabar(){
    const raw = this.formData.getRawValue();
    const limpio = limpiarCamposVacios(raw);
    limpio.numIdentificadorFiscal ??= '';
    console.log(raw)

    this.formData.patchValue(limpio); // opcional si quieres aplicar los cambios al form

    if (this.formData.valid) {
      const formDataClean = transformFormData(this.formData.getRawValue());

      this.institucionesStateService.postForm(formDataClean, this.formData.get('ideInstitucion').value,
        () => {
		      this.router.navigate(["/mantenimiento/institucion"]);
        }
      ); 
    }
    this.submitted = true
  }

	getInstitucion(){
		if(!this.ideInstitucion) return;
		this.institucionesStateService.loadItemById(this.ideInstitucion);
	}
}

