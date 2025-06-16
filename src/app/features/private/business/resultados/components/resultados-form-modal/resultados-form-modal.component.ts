import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ResultadosStateService } from '../../services/resultados-state.service';
import { transformFormData } from 'src/app/core/helpers/clean-form';
import { CommonModule } from '@angular/common';
import { Resultado } from '../../data/resultado.model';

@Component({
	selector: 'app-resultados-form-modal',
	templateUrl: './resultados-form-modal.component.html',
	styleUrl: './resultados-form-modal.component.css',
	standalone:true,
	imports:[ModalModule,FormsModule,ReactiveFormsModule,CommonModule]
})
export class ResultadosFormModalComponent {
	private modalService = inject(BsModalService);
	private formBuilder = inject(FormBuilder);
	public resultadosStateService = inject(ResultadosStateService);

	//@Input() ideConvenio: number;
	@Input() resultado:Resultado;
	@Input() flagAccion: number;

	@Output() onSave = new EventEmitter<void>();

	formData: FormGroup = this.formBuilder.group({
		ideResultado: [],
		ideConvenio: [,[Validators.required]],
		txtResultado: [,[Validators.required]],
		txtDescripcion: [,[Validators.required]],
	});

	submitted = false;

	constructor(){
		
	}

	ngOnInit(): void {
		this.formData.patchValue(this.resultado);
		if(this.flagAccion == 3) { 
			this.formData.disable();
		}
	}

	grabar(){
		if (this.formData.valid) {
			const formDataTransformed = transformFormData(this.formData.getRawValue());

			this.resultadosStateService.postForm(formDataTransformed,this.formData.get('ideResultado').value?this.formData.get('ideResultado').value:null, () => {
				this.modalService?.hide();
				this.onSave.emit(); 
			});

		}
		this.submitted = true
	}

	get form() {
		return this.formData.controls;
	}
}
