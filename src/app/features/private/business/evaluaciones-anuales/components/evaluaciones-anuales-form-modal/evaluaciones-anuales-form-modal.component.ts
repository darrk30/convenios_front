import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { EvaluacionesAnualesStateService } from '../../services/evaluaciones-anuales-state.service';
import { EvaluacionAnual } from '../../data/evaluacion-anual.model';
import { toDateInputValue, transformFormData } from 'src/app/core/helpers/clean-form';
import { CommonModule } from '@angular/common';
import { ConveniosStateService } from '../../../convenios/services/convenios-state.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
	selector: 'app-evaluaciones-anuales-form-modal',
	templateUrl: './evaluaciones-anuales-form-modal.component.html',
	styleUrl: './evaluaciones-anuales-form-modal.component.css',
	standalone:true,
	imports:[ModalModule,FormsModule,ReactiveFormsModule,CommonModule,NgSelectModule]
})
export class EvaluacionesAnualesFormModalComponent {
	private modalService = inject(BsModalService);
	private formBuilder = inject(FormBuilder);
	public evaluacionesAnualesStateService = inject(EvaluacionesAnualesStateService);
	public conveniosStateService = inject(ConveniosStateService);

	//@Input() ideConvenio: number;
	@Input() evaluacionAnual:EvaluacionAnual;

	@Output() onSave = new EventEmitter<void>();

	formData: FormGroup = this.formBuilder.group({
		ideEvaluacionAnual: [],
		ideConvenio: [,[Validators.required]],
		txtActividadEjecutada: [,[Validators.required]],
		txtActividadProgramada: [,[Validators.required]],
		txtProblemaPresentado: [,[Validators.required]],
		txtPrincipalLogro: [,[Validators.required]],
		txtLeccionAprendida: [,[Validators.required]],
		bitExtension: [],
		fecEvaluacion: [,[Validators.required]],
		txtActividadEspecifica: [,[Validators.required]],
	});

	submitted = false;

	constructor(){
		
	}

	ngOnInit(): void {
		this.listarConvenios();
		const datosTransformados = {
			...this.evaluacionAnual,
			fecEvaluacion: toDateInputValue(this.evaluacionAnual?.fecEvaluacion),
		};

		this.formData.patchValue(datosTransformados);
	}

	listarConvenios(){
		this.conveniosStateService.loadItems();
	}

	grabar(){
		if (this.formData.valid) {
			const formDataTransformed = transformFormData(this.formData.getRawValue());

			this.evaluacionesAnualesStateService.postForm(formDataTransformed,this.formData.get('ideEvaluacionAnual').value?this.formData.get('ideEvaluacionAnual').value:null, () => {
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
}
