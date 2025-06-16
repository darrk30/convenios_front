import { Component, inject, Input, ViewChild } from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ContrapartesFormModalComponent } from '../contrapartes-form-modal/contrapartes-form-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { dtOptionsData } from 'src/app/core/helpers/dtoptions.data';
import { Contraparte } from '../../data/contraparte.model';
import Swal from 'sweetalert2';
import { ContrapartesStateService } from '../../services/contrapartes-state.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-contrapartes-list',
	templateUrl: './contrapartes-list.component.html',
	styleUrl: './contrapartes-list.component.css',
	standalone:true,
	imports:[DataTablesModule,BsDropdownModule,CommonModule,ModalModule,ContrapartesFormModalComponent],
})
export class ContrapartesListComponent {
	private modalService = inject(BsModalService);
	private spinner = inject(NgxSpinnerService);
	private router = inject(Router);
	public contrapartesStateService = inject(ContrapartesStateService);


	@Input() ideConvenio: number;
	@Input() flagAction:number;

	modalRef?: BsModalRef;
	@ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
	dtTrigger: Subject<void> = new Subject<any>();
	dtOptions: DataTables.Settings = {};

	contraparte:Contraparte;

	tituloModal: string;
	flagAccion:number;

	ngOnInit(): void {
		this.dtOptions = dtOptionsData;
		this.contrapartesStateService.clearState();
		this.listar();
		console.log(this.flagAction)
	}

	listar(){
		this.contrapartesStateService.loadItemsByConvenio(this.ideConvenio).subscribe(() => {
			this.rerender();
		});
	}

	ngAfterViewInit(): void {
		this.dtTrigger.next();
	}

	ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	}

	rerender(): void {
		if(this.dtElement==undefined) return;
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			// Destroy the table first
			dtInstance.destroy();
			// Call the dtTrigger to rerender again
			this.dtTrigger.next();
		});
	}

	crear(modal:any){
		this.tituloModal = 'Registrar Contraparte';
		let contraparte:Contraparte = {
			ideConvenio: this.ideConvenio
		};
		this.contraparte = contraparte;
		this.flagAccion = 1;
		this.modalRef = this.modalService.show(modal, { class: 'md', backdrop: 'static', keyboard: false });
	}

	editar(modal:any,contraparte:Contraparte){
		this.tituloModal = 'Editar Contraparte';
		this.contraparte = contraparte;
		this.flagAccion = 2;
		this.modalRef = this.modalService.show(modal, { class: 'md', backdrop: 'static', keyboard: false });
	}

	ver(modal:any,contraparte:Contraparte){
		this.tituloModal = 'Ver Contraparte';
		this.contraparte = contraparte;
		this.flagAccion = 3;
		this.modalRef = this.modalService.show(modal, { class: 'md', backdrop: 'static', keyboard: false });
	}

	eliminar(ideContraparte:number){
		Swal.fire({
			title: '¿Estás seguro de eliminar el registro?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#34c38f',
			cancelButtonColor: '#f46a6a',
			confirmButtonText: 'Si, Eliminar',
			cancelButtonText: 'Cancelar'
		}).then(result => {
			if (result.value) {
				this.spinner.show();
				this.contrapartesStateService.deleteItem(ideContraparte).subscribe(() => {
					this.listar();
				});
			}
		});
	}
}
