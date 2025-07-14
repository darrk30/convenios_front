import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { EvaluacionesAnualesPlanesTrabajosStateService } from '../../services/evaluaciones-anuales-planes-trabajos-state.service';
import { ConveniosStateService } from '../../../convenios/services/convenios-state.service';
import { EvaluacionAnualPlanTrabajo } from '../../data/evaluacion-anual-plan-trabajo.model';
import { toDateInputValue, transformFormData } from 'src/app/core/helpers/clean-form';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-evaluaciones-anuales-planes-trabajos-form-modal',
	templateUrl: './evaluaciones-anuales-planes-trabajos-form-modal.component.html',
	styleUrl: './evaluaciones-anuales-planes-trabajos-form-modal.component.css',
	standalone: true,
	imports:[ModalModule,FormsModule,ReactiveFormsModule,CommonModule,NgSelectModule]
})
export class EvaluacionesAnualesPlanesTrabajosFormModalComponent {
	private modalService = inject(BsModalService);
	private formBuilder = inject(FormBuilder);
	public evaluacionesAnualesPlanesTrabajosStateService = inject(EvaluacionesAnualesPlanesTrabajosStateService);
	public conveniosStateService = inject(ConveniosStateService);

	//@Input() ideConvenio: number;
	@Input() evaluacionAnualPlanTrabajo:EvaluacionAnualPlanTrabajo;
	@Input() flagAccion:number;

	@Output() onSave = new EventEmitter<void>();

	formData: FormGroup = this.formBuilder.group({
		ideEvaluacionAnualPlanTrabajo: [],
		ideConvenio: [,[Validators.required]],
		fecEvaluacion: [toDateInputValue(new Date(Date.now())),[Validators.required]],
		txtInformacionPlanTrabajo: [,[Validators.required]],
		archivo: [null, [this.validateTamanioArchivo.bind(this), this.validateFormatoArchivo]],
		uuid: []
	});

	submitted = false;
	fileError: boolean = false;
	selectedFileName: string | null = null;

	tamanioArchivo:number = environment.tamanioArchivoMB;

	constructor(){
		
	}

	ngOnInit(): void {
		//this.listarConvenios();
		this.conveniosStateService.loadItems().subscribe(() => {
			console.log('Convenios cargados:', this.listarConvenios());
		});

		if (this.evaluacionAnualPlanTrabajo){
			const datosTransformados = {
				...this.evaluacionAnualPlanTrabajo,
				fecEvaluacion: toDateInputValue(this.evaluacionAnualPlanTrabajo?.fecEvaluacion),
			};

			this.formData.patchValue(datosTransformados);
		}

		if (this.flagAccion === 1) { // Modo CREAR
			this.formData.get('archivo')?.addValidators(Validators.required);
		}
	}

	// listarConvenios(){
	// 	this.conveniosStateService.loadItems();
	// }

	listarConvenios = computed(() => 
		this.conveniosStateService.items().filter(c => c.bitPlanTrabajo == true)
	);

	grabar(){
		if (this.formData.valid) {
			const formDataTransformed = transformFormData(this.formData.getRawValue());

			this.evaluacionesAnualesPlanesTrabajosStateService.postForm(formDataTransformed,this.formData.get('ideEvaluacionAnualPlanTrabajo').value?this.formData.get('ideEvaluacionAnualPlanTrabajo').value:null, () => {
				this.modalService?.hide();
				this.onSave.emit(); 
			});

		}
		console.log(this.formData)
		this.submitted = true
	}

	get form() {
		return this.formData.controls;
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
		const fileInput = document.getElementById('fileInput3') as HTMLInputElement;
		fileInput.click();
	}

	onFileSelected(event: any): void {
		const file = event.target.files[0];
		console.log(file)
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
}
