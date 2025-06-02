import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { transformFormData } from 'src/app/core/helpers/clean-form';
import { PerfilesStateService } from '../../services/perfiles-state.service';
import { Perfil } from '../../data/perfil.model';

@Component({
	selector: 'app-perfiles-form-modal',
	templateUrl: './perfiles-form-modal.component.html',
	styleUrl: './perfiles-form-modal.component.css',
	standalone:true,
	imports:[CommonModule,BsDropdownModule,ModalModule,FormsModule,ReactiveFormsModule]
})
export class PerfilesFormModalComponent {
	private modalService = inject(BsModalService);
	private formBuilder = inject(FormBuilder);
	private toastr = inject(ToastrService);
	private spinner = inject(NgxSpinnerService);
	public perfilesStateService = inject(PerfilesStateService);


	formData: FormGroup = this.formBuilder.group({
		idePerfil: [],
		codigoPerfil: [,[Validators.required]],
		perfil: [,[Validators.required]],
    });

	submitted = false;

	@Input() modalRef?: BsModalRef;
	@Input() perfil: Perfil;

	constructor(){

	}

	ngOnInit(): void {
		this.formData.patchValue(this.perfil);
	}

	grabar(){
		if (this.formData.valid) {
			console.log("Hola")
			//const nuevoPerfil: Perfil = this.formData.value;
			const formDataTransformed = transformFormData(this.formData.getRawValue());

			this.perfilesStateService.postForm(formDataTransformed, () => this.modalRef?.hide(), this.formData.get('idePerfil').value); 
			
		}
		this.submitted = true
	}


	get form() {
		return this.formData.controls;
	}
}
