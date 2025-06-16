import { Component, inject, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContrapartesCoordinadorStateService } from '../../services/contrapartes-coordinador-state.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ContraparteCoordinador } from '../../data/contraparte-coordinador.model';
import { dtOptionsData } from 'src/app/core/helpers/dtoptions.data';
import Swal from 'sweetalert2';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ContrapartesCoordinadorFormModalComponent } from '../contrapartes-coordinador-form-modal/contrapartes-coordinador-form-modal.component';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-contrapartes-coordinador-list',
	templateUrl: './contrapartes-coordinador-list.component.html',
	styleUrl: './contrapartes-coordinador-list.component.css',
	standalone:true,
	imports:[DataTablesModule,BsDropdownModule,CommonModule,ModalModule,ContrapartesCoordinadorFormModalComponent],
})
export class ContrapartesCoordinadorListComponent {
	private modalService = inject(BsModalService);
	private spinner = inject(NgxSpinnerService);
	private router = inject(Router);
	public contrapartesCoordinadorStateService = inject(ContrapartesCoordinadorStateService);


	@Input() ideConvenio: number;
	@Input() flagAction:number;
	
	modalRef?: BsModalRef;
	@ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
	dtTrigger: Subject<void> = new Subject<any>();
	dtOptions: DataTables.Settings = {};

	contraparteCoordinador:ContraparteCoordinador;

	tituloModal: string;
	flagAccion:number;

	ngOnInit(): void {
		this.dtOptions = dtOptionsData;
		this.contrapartesCoordinadorStateService.clearState();
		this.listar();

		this.contrapartesCoordinadorStateService.refreshTrigger$.subscribe(() => {
			this.listar(); // 👈 actualiza al recibir evento
		});
	}

	listar(){
		this.contrapartesCoordinadorStateService.loadItemsByConvenio(this.ideConvenio).subscribe(() => {
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
		this.tituloModal = 'Registrar Contraparte Coordinador';
		let contraparteCoordinador:ContraparteCoordinador = {
			ideConvenio: this.ideConvenio
		};
		this.contraparteCoordinador = contraparteCoordinador;
		this.flagAccion = 1;
		this.modalRef = this.modalService.show(modal, { class: 'md', backdrop: 'static', keyboard: false });
	}

	editar(modal:any,contraparteCoordinador:ContraparteCoordinador){
		this.tituloModal = 'Editar Contraparte Coordinador';
		this.contraparteCoordinador = contraparteCoordinador;
		this.flagAccion = 2;
		this.modalRef = this.modalService.show(modal, { class: 'md', backdrop: 'static', keyboard: false });
	}

	ver(modal:any,contraparteCoordinador:ContraparteCoordinador){
		this.tituloModal = 'Ver Contraparte Coordinador';
		this.contraparteCoordinador = contraparteCoordinador;
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
				this.contrapartesCoordinadorStateService.deleteItem(ideContraparte).subscribe(() => {
					this.listar();
				});
			}
		});
	}
}
