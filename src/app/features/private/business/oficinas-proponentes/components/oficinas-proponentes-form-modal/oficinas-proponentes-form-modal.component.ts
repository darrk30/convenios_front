import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { OficinasProponentesStateService } from '../../services/oficinas-proponentes-state.service';
import { ConveniosStateService } from '../../../convenios/services/convenios-state.service';
import { OficinaProponente } from '../../data/oficina-proponente.model';
import { transformFormData } from 'src/app/core/helpers/clean-form';
import { OficinasStateService } from 'src/app/features/private/maintenance/oficinas/services/oficinas-state.service';
import { PersonasStateService } from 'src/app/features/private/maintenance/personas/services/personas-state.service';

@Component({
	selector: 'app-oficinas-proponentes-form-modal',
	templateUrl: './oficinas-proponentes-form-modal.component.html',
	styleUrl: './oficinas-proponentes-form-modal.component.css',
	standalone:true,
	imports:[ModalModule,FormsModule,ReactiveFormsModule,CommonModule,NgSelectModule]
})
export class OficinasProponentesFormModalComponent {
	private modalService = inject(BsModalService);
	private formBuilder = inject(FormBuilder);
	public oficinasProponentesStateService = inject(OficinasProponentesStateService);
	public conveniosStateService = inject(ConveniosStateService);
	public oficinasStateService = inject(OficinasStateService);
	public personasStateService = inject(PersonasStateService);

	//@Input() ideConvenio: number;
	@Input() oficinaProponente:OficinaProponente;
	@Input() flagAccion: number;

	@Output() onSave = new EventEmitter<void>();

	formData: FormGroup = this.formBuilder.group({
		ideOficinaProponente: [],
		ideConvenio: [,[Validators.required]],
		ideOficina: [,[Validators.required]],
		ideCoordinadorTitular: [],
		ideCoordinadorAlterno: [],
		numAporteMonetario: [,[Validators.required]],
		numAporteNoMonetario: [,[Validators.required]],
	});

	submitted = false;

	constructor(){
		this.formData.get('ideOficina')?.valueChanges.subscribe((v) => {
			if(!v || v==null) return;
			console.log(v)
			this.listarPersonasByOficina(v)
		});
	}

	ngOnInit(): void {
		this.listarOficinas();
		this.formData.patchValue(this.oficinaProponente);
		if(this.flagAccion == 3) { 
			this.formData.disable();
		}
	}
	
	listarOficinas(){
		this.oficinasStateService.loadItems();
	}

	listarPersonasByOficina(ideOficina){
		this.personasStateService.loadItemsByOficina(ideOficina);
	}

	grabar(){
		if (this.formData.valid) {
			const formDataTransformed = transformFormData(this.formData.getRawValue());

			this.oficinasProponentesStateService.postForm(formDataTransformed,this.formData.get('ideOficinaProponente').value?this.formData.get('ideOficinaProponente').value:null, () => {
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
