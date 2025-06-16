import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ContrapartesStateService } from '../../../contrapartes/services/contrapartes-state.service';
import { TiposCoordinadoresStateService } from 'src/app/features/private/maintenance/tipos-coordinadores/services/tipos-coordinadores-state.service';
import { ContraparteCoordinador } from '../../data/contraparte-coordinador.model';
import { transformFormData } from 'src/app/core/helpers/clean-form';
import { CommonModule } from '@angular/common';
import { ContrapartesCoordinadorStateService } from '../../services/contrapartes-coordinador-state.service';

@Component({
	selector: 'app-contrapartes-coordinador-form-modal',
	templateUrl: './contrapartes-coordinador-form-modal.component.html',
	styleUrl: './contrapartes-coordinador-form-modal.component.css',
	standalone:true,
	imports:[ModalModule,FormsModule,ReactiveFormsModule,CommonModule]
})
export class ContrapartesCoordinadorFormModalComponent {
	private modalService = inject(BsModalService);
	private formBuilder = inject(FormBuilder);
	public contrapartesStateService = inject(ContrapartesStateService);
	public contrapartesCoordinadorStateService = inject(ContrapartesCoordinadorStateService);
	public tiposCoordinadoresStateService = inject(TiposCoordinadoresStateService);

	@Input() contraparteCoordinador:ContraparteCoordinador;
	@Input() flagAccion: number;

	@Output() onSave = new EventEmitter<void>();

	formData: FormGroup = this.formBuilder.group({
		ideContraparteCoordinador: [],
		ideContraparte: [,[Validators.required]],
		ideConvenio: [,[Validators.required]],
		ideTipoCoordinador: [,[Validators.required]],
		txtNombres: [,[Validators.required]],
		txtCargo: [,[Validators.required]],
		txtCorreoElectronico: ['',[Validators.email]],
	});

	submitted = false;

	constructor(){

	}

	ngOnInit(): void {
		//this.formData.patchValue(this.perfil);
		this.listarContrapartesByConvenio();
		this.listarTiposCoordinadores();
		this.formData.patchValue(this.contraparteCoordinador);
		if(this.flagAccion == 3) { 
			this.formData.disable();
		}
	}

	listarContrapartesByConvenio(){
		this.contrapartesStateService.loadItemsByConvenio(this.contraparteCoordinador.ideConvenio);
	}

	listarTiposCoordinadores(){
		this.tiposCoordinadoresStateService.loadItems();
	}

	grabar(){
		if (this.formData.valid) {
			const formDataTransformed = transformFormData(this.formData.getRawValue());
			this.contrapartesCoordinadorStateService.postForm(formDataTransformed,this.formData.get('ideContraparteCoordinador').value?this.formData.get('ideContraparteCoordinador').value:null, () => {
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
