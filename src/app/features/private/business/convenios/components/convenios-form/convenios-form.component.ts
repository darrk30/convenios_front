import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PagetitleComponent } from 'src/app/shared/components/pagetitle/pagetitle.component';
import { NgStepperModule } from 'angular-ng-stepper'
import { CdkStepperModule } from '@angular/cdk/stepper';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { limpiarCamposVacios, toDateInputValue, transformFormData } from 'src/app/core/helpers/clean-form';
import { ConveniosStateService } from '../../services/convenios-state.service';
import { ModalidadesConveniosStateService } from 'src/app/features/private/maintenance/modalidades-convenios/services/modalidades-convenios-state.service';
import { OficinasStateService } from 'src/app/features/private/maintenance/oficinas/services/oficinas-state.service';
import { PersonasStateService } from 'src/app/features/private/maintenance/personas/services/personas-state.service';
import { ArchivosListComponent } from '../../../archivos/components/archivos-list/archivos-list.component';
import { ResultadosListComponent } from '../../../resultados/components/resultados-list/resultados-list.component';
import { ContrapartesCoordinadorListComponent } from '../../../contrapartes-coordinador/components/contrapartes-coordinador-list/contrapartes-coordinador-list.component';
import { ContrapartesListComponent } from '../../../contrapartes/components/contrapartes-list/contrapartes-list.component';
import { EstadosConveniosStateService } from 'src/app/features/private/maintenance/estados-convenios/services/estados-convenios-state.service';
import { environment } from 'src/environments/environment';
import { Convenio } from '../../data/convenio.model';
import { ConvenioStore } from '../../services/convenios.store';
import { saveAs } from "file-saver";
import { OficinasProponentesListComponent } from '../../../oficinas-proponentes/components/oficinas-proponentes-list/oficinas-proponentes-list.component';
import { fechasValidator } from '../../validators/fechas.validator';
import { TiposConveniosStateService } from 'src/app/features/private/maintenance/tipos-convenios/services/tipos-convenios-state.service';
import { ExpedientesListComponent } from '../../../expendientes/components/expedientes-list/expedientes-list.component';
import { ExpedientesStateService } from '../../../expendientes/services/expedientes-state.service';

@Component({
	selector: 'app-convenios-form',
	templateUrl: './convenios-form.component.html',
	styleUrl: './convenios-form.component.css',
	standalone:true,
	imports:[
		CommonModule,
		PagetitleComponent,
		NgStepperModule,
		CdkStepperModule,
		FormsModule,
		ReactiveFormsModule,
		ArchivosListComponent,
		ResultadosListComponent,
		ContrapartesListComponent,
		ContrapartesCoordinadorListComponent, 
		OficinasProponentesListComponent,
		ExpedientesListComponent
	]
})
export class ConveniosFormComponent implements OnInit {
	private route = inject(ActivatedRoute);
	private formBuilder = inject(FormBuilder);
	private toastr = inject(ToastrService);
	private spinner = inject(NgxSpinnerService);
	public conveniosStateService = inject(ConveniosStateService);
	public tiposConveniosStateService = inject(TiposConveniosStateService);
	public modalidadesConveniosStateService = inject(ModalidadesConveniosStateService);
	public oficinasStateService = inject(OficinasStateService);
	public personasStateService = inject(PersonasStateService);
	public estadosConveniosStateService = inject(EstadosConveniosStateService);
	public convenioStore = inject(ConvenioStore);
	public expedientesStateService = inject(ExpedientesStateService);

	breadCrumbItems: Array<{}>;

	

	formData: FormGroup = this.formBuilder.group({
		ideConvenio:[],
		ideModalidadConvenio:[],
		ideTipoConvenio:[,[Validators.required]],
		txtConvenio:[,[Validators.required]],
		txtObjetivoConvenio:[],
		fecSuscripcion:[],
		fecInicio:[],
		fecFinalizacion:[],
		txtDuracionConvenio:[{value:null,disabled:true}],
		bitPlanTrabajo:[],
		bitRenovacion:[],
		fecInicioRenovacion:[],
		fecFinRenovacion:[],
		txtObservacion:[],
		txtArchivoBaseLegalRuta:[],
		txtObjetivoGeneralPlanTrabajo:[],
		fecCulminacionPlanTrabajo:[],
		numCostoTotalMonetario:[],
		ideEstadoConvenio:[,[Validators.required]],
		archivo: [, [this.validateTamanioArchivo.bind(this), this.validateFormatoArchivo]],
		uuid: []
	}, {
		validators: fechasValidator 
	});

	submitted = false;
	fileError: boolean = false;
	selectedFileName: string | null = null;

	tamanioArchivo:number = environment.tamanioArchivoMB;

	ideConvenio:number;
	titleComponent:string;
	flagAction:number;
	idePagina:number;

	constructor(){
		this.route.data.subscribe((data) => {
            this.titleComponent = data.title;
            this.flagAction = data.flagAction;
        });


		this.ideConvenio = Number(this.route.snapshot.paramMap.get('id'));

		this.formData.get('fecInicio')?.valueChanges.subscribe(() => {
			this.actualizarDuracionConvenio();
		});

		this.formData.get('fecFinalizacion')?.valueChanges.subscribe(() => {
			this.actualizarDuracionConvenio();
		});

		this.formData.get('ideEstadoConvenio')?.valueChanges.subscribe((v) => {
			const archivoCtrl = this.formData.get('archivo');
			if (v == 4) {
				// Limpia los valores
				this.formData.get('fecSuscripcion')?.reset();
				this.formData.get('fecInicio')?.reset();
				this.formData.get('fecFinalizacion')?.reset();
				this.formData.get('txtDuracionConvenio')?.reset();
				this.formData.get('bitPlanTrabajo')?.reset();
				this.formData.get('bitRenovacion')?.reset();
				this.formData.get('archivo')?.reset();
				this.formData.get('fecInicioRenovacion')?.reset();
				this.formData.get('fecFinRenovacion')?.reset();

				// ❌ Quitar required del archivo
				archivoCtrl?.clearValidators();
				archivoCtrl?.updateValueAndValidity();
			} else {
				// ✔️ Si NO es 4, vuelve a agregar el required (opcional)
				archivoCtrl?.setValidators([Validators.required]);
				archivoCtrl?.updateValueAndValidity();
			}
		});

		effect(() => {
			const item = this.conveniosStateService.item();
			if (item) {
				console.log("Nuevo valor recibido:", item);
				const datosTransformados = {
					...item,
					fecSuscripcion: toDateInputValue(item.fecSuscripcion),
					fecInicio: toDateInputValue(item.fecInicio),
					fecFinalizacion: toDateInputValue(item.fecFinalizacion),
					fecInicioRenovacion: toDateInputValue(item.fecInicioRenovacion),
					fecFinRenovacion: toDateInputValue(item.fecFinRenovacion),
					fecCulminacionPlanTrabajo: toDateInputValue(item.fecCulminacionPlanTrabajo),
				};
				this.formData.patchValue(datosTransformados);
				
			}
		});
	}

	ngOnInit(): void {
		console.log(this.flagAction)

		this.breadCrumbItems = [{ label: this.titleComponent }];
		this.conveniosStateService.clearState();
		this.listarTiposConvenios();
		this.listarModalidadesConvenios();
		//this.listarOficinas();
		this.listarEstadosConvenios();
		this.getConvenio();
		this.getDatosGeneralesExpedientes();
		
		if (this.flagAction == 1) { // Modo CREAR
			this.formData.get('archivo')?.addValidators(Validators.required);
			this.idePagina = 1;
		}else if(this.flagAction == 2){
			this.idePagina = 1;
		}else if(this.flagAction == 3) { // Modo CREAR
			this.formData.disable();
			this.idePagina = 3;
		}
	}

	getDatosGeneralesExpedientes(){
		this.expedientesStateService.loadDatosGeneralesByConvenio(this.ideConvenio);
	}

	listarTiposConvenios(){
		this.tiposConveniosStateService.loadItems();
	}

	listarModalidadesConvenios(){
		this.modalidadesConveniosStateService.loadItems();
	}

	listarEstadosConvenios(){
		this.estadosConveniosStateService.loadItems();
	}

	// listarOficinas(){
	// 	this.oficinasStateService.loadItems();
	// }

	// listarPersonasByOficina(ideOficina){
	// 	this.personasStateService.loadItemsByOficina(ideOficina);
	// }

	getConvenio(){
		if(!this.ideConvenio) return;
		this.conveniosStateService.loadItemById(this.ideConvenio);
	}

	grabar(){
		const raw = this.formData.getRawValue();
		const limpio = limpiarCamposVacios(raw);
		console.log(raw)

		this.formData.patchValue(limpio); // opcional si quieres aplicar los cambios al form

		if (this.formData.valid) {
			const formDataClean = transformFormData(this.formData.getRawValue());

			this.conveniosStateService.postForm(formDataClean, this.formData.get('ideConvenio').value); 
			
		}
		this.submitted = true
	}

	actualizarDuracionConvenio() {
		const fechaInicio = this.formData.get('fecInicio')?.value;
		const fechaFin = this.formData.get('fecFinalizacion')?.value;

		if (fechaInicio && fechaFin) {
			const inicio = new Date(fechaInicio);
			const fin = new Date(fechaFin);

			if (fin < inicio) {
				this.formData.get('txtDuracionConvenio')?.setValue('Fecha final menor que inicio');
				return;
			}

			const años = fin.getFullYear() - inicio.getFullYear();
			const meses = fin.getMonth() - inicio.getMonth();
			const dias = fin.getDate() - inicio.getDate();

			let totalAños = años;
			let totalMeses = meses;
			let totalDias = dias;

			if (totalDias < 0) {
				totalMeses--;
				const prevMonth = new Date(fin.getFullYear(), fin.getMonth(), 0);
				totalDias += prevMonth.getDate();
			}

			if (totalMeses < 0) {
				totalAños--;
				totalMeses += 12;
			}

			const texto = `${totalAños} año(s), ${totalMeses} mes(es), ${totalDias} día(s)`;
			this.formData.get('txtDuracionConvenio')?.setValue(texto);
		} else {
			this.formData.get('txtDuracionConvenio')?.setValue(null);
		}
	}

	validateTamanioArchivo(control: AbstractControl): ValidationErrors | null {
			
		const archivo = control.value as File;
		if (!archivo) {
			return null;
		}
		if (archivo && (archivo.size > 0 && archivo.size <= this.tamanioArchivo * 1024 * 1024)) { // Tamaño entre 0 y 5 MB
			return null;
		} else {
			return { tamanoInvalido: true };
		}
	}

	validateFormatoArchivo(control: AbstractControl): ValidationErrors | null {
		
		const archivo = control.value as File;
		if (!archivo) {
			return null;
		}
		if(archivo){
			const extension = archivo.name.split('.').pop()?.toLowerCase();
			if (extension === 'pdf') { // Archivo PDF
				return null; // Válido
			} else {
				return { formatoInvalido: true }; // Formato no válido
			}
		}
		
	}

	triggerFileInput() {
		const fileInput = document.getElementById('fileInput') as HTMLInputElement;
		fileInput.click();
	}

	onFileSelected(event: any): void {
		const file = event.target.files[0];
		if (file) {
			this.formData.patchValue({
				archivo: file
			});
			this.selectedFileName = file.name;
			this.formData.get('archivo')?.updateValueAndValidity(); // Actualiza el estado de validación del campo
			this.fileError = false;
		} else {
			this.selectedFileName = 'Ningún archivo seleccionado';
		  	this.fileError = true; // Marca error si no hay archivo seleccionado
		}
	}

	

	descargar() {
		const uuid = this.formData.get('uuid').value;
		this.convenioStore.descargar(uuid).subscribe({
			next: (blob) => {
				saveAs(blob, `${uuid}.pdf`);
			},
			error: (error) => {
				console.error('Error al descargar el PDF', error);
			}
		});
	}
}
