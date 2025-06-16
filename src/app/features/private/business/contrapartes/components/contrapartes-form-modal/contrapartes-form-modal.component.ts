import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { InstitucionesStateService } from 'src/app/features/private/maintenance/instituciones/services/instituciones-state.service';
import { ContrapartesStateService } from '../../services/contrapartes-state.service';
import { transformFormData } from 'src/app/core/helpers/clean-form';
import { Contraparte } from '../../data/contraparte.model';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
	selector: 'app-contrapartes-form-modal',
	templateUrl: './contrapartes-form-modal.component.html',
	styleUrl: './contrapartes-form-modal.component.css',
	standalone:true,
	imports:[ModalModule,FormsModule,ReactiveFormsModule,CommonModule,NgSelectModule]
})
export class ContrapartesFormModalComponent {
	private modalService = inject(BsModalService);
	private formBuilder = inject(FormBuilder);
	public contrapartesStateService = inject(ContrapartesStateService);
	public institucionesStateService = inject(InstitucionesStateService);

	@Input() contraparte:Contraparte;
	@Input() flagAccion: number;

	@Output() onSave = new EventEmitter<void>();

	formData: FormGroup = this.formBuilder.group({
		ideContraparte: [],
		ideConvenio: [,[Validators.required]],
		ideInstitucion: [,[Validators.required]],
		numAporteMonetario: [,[Validators.required]],
		numAporteNoMonetario: [,[Validators.required]],
	});

	submitted = false;

	constructor(){

	}

	ngOnInit(): void {
		//this.formData.patchValue(this.perfil);
		this.listarInstituciones();
		this.formData.patchValue(this.contraparte);
		if(this.flagAccion == 3) { 
			this.formData.disable();
		}
	}

	listarInstituciones(){
		this.institucionesStateService.loadItems();
	}

	grabar(){
		if (this.formData.valid) {
			const formDataTransformed = transformFormData(this.formData.getRawValue());
			this.contrapartesStateService.postForm(formDataTransformed,this.formData.get('ideContraparte').value?this.formData.get('ideContraparte').value:null, () => {
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
