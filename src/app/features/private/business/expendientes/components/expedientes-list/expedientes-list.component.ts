import { Component, inject, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExpedientesStateService } from '../../services/expedientes-state.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Expediente } from '../../data/expediente.model';
import { dtOptionsData } from '@/app/core/helpers/dtoptions.data';
import Swal from 'sweetalert2';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';
import { ExpedientesFormModalComponent } from '../expedientes-form-modal/expedientes-form-modal.component';

@Component({
	selector: 'app-expedientes-list',
	templateUrl: './expedientes-list.component.html',
	styleUrl: './expedientes-list.component.css',
	standalone:true,
	imports:[DataTablesModule,BsDropdownModule,CommonModule,ModalModule,ExpedientesFormModalComponent],
})
export class ExpedientesListComponent {
	private modalService = inject(BsModalService);
	private spinner = inject(NgxSpinnerService);
	private router = inject(Router);
	public expedientesStateService = inject(ExpedientesStateService);


	@Input() ideConvenio: number;
	@Input() flagAction:number;

	modalRef?: BsModalRef;
	@ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
	dtTrigger: Subject<void> = new Subject<any>();
	dtOptions: DataTables.Settings = {};

	expediente:Expediente;

	tituloModal: string;
	flagAccion:number;

	ngOnInit(): void {
		this.dtOptions = dtOptionsData;
		this.listar();
		console.log(this.flagAction)
	}

	listar(){
		this.expedientesStateService.loadItemsByConvenio(this.ideConvenio).subscribe(() => {
			this.rerender();
		});
	}

	documentoPdf(ideTipoDocumento:string, txtNumeroDocumento: string) {
		

		// if (!ideTipoDoc || !nroDoc) {
		// 	this.toastr.warning("Debe ingresar el tipo y número de documento");
		// 	return;
		// }

		this.expedientesStateService.downloadPdf(ideTipoDocumento, txtNumeroDocumento).subscribe({
			next: (blob: Blob) => {
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `documento_${txtNumeroDocumento}.pdf`;
				a.click();
				window.URL.revokeObjectURL(url);
			},
			error: () => {
				//this.toastr.error("Error al descargar el PDF");
			}
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
		this.tituloModal = 'Registrar Expediente';
		let expediente:Expediente = {
			ideConvenio: this.ideConvenio
		};
		this.expediente = expediente;
		this.flagAccion = 1;
		this.modalRef = this.modalService.show(modal, { class: 'md modal-lg', backdrop: 'static', keyboard: false });
	}

	editar(modal:any,expediente:Expediente){
		this.tituloModal = 'Editar Expediente';
		this.expediente = expediente;
		this.flagAccion = 2;
		this.modalRef = this.modalService.show(modal, { class: 'md', backdrop: 'static', keyboard: false });
	}

	ver(modal:any,expediente:Expediente){
		this.tituloModal = 'Ver Expediente';
		this.expediente = expediente;
		this.flagAccion = 3;
		this.modalRef = this.modalService.show(modal, { class: 'md', backdrop: 'static', keyboard: false });
	}

	eliminar(ideExpediente:number){
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
				this.expedientesStateService.deleteItem(ideExpediente).subscribe(() => {
					this.listar();
				});
			}
		});
	}
}
