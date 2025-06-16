import { Resultado } from './../../data/resultado.model';
import { Component, inject, Input, ViewChild } from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ResultadosFormModalComponent } from '../resultados-form-modal/resultados-form-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { dtOptionsData } from 'src/app/core/helpers/dtoptions.data';
import { ResultadosStateService } from '../../services/resultados-state.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-resultados-list',
	templateUrl: './resultados-list.component.html',
	styleUrl: './resultados-list.component.css',
	standalone:true,
	imports:[DataTablesModule,BsDropdownModule,CommonModule,ModalModule,ResultadosFormModalComponent],
})
export class ResultadosListComponent {
	private modalService = inject(BsModalService);
	private spinner = inject(NgxSpinnerService);
	private router = inject(Router);
	public resultadosStateService = inject(ResultadosStateService);


	@Input() ideConvenio: number;
	@Input() flagAction:number;

	modalRef?: BsModalRef;
	@ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
	dtTrigger: Subject<void> = new Subject<any>();
	dtOptions: DataTables.Settings = {};

	resultado:Resultado;

	tituloModal: string;
	flagAccion:number;

	ngOnInit(): void {
		this.dtOptions = dtOptionsData;
		this.resultadosStateService.clearState();
		this.listar();
	}

	listar(){
		this.resultadosStateService.loadItemsByConvenio(this.ideConvenio).subscribe(() => {
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
		this.tituloModal = 'Registrar Resultado';
		let resultado:Resultado = {
			ideConvenio: this.ideConvenio
		};
		this.resultado = resultado;
		this.flagAccion = 1;
		this.modalRef = this.modalService.show(modal, { class: 'md', backdrop: 'static', keyboard: false });
	}

	editar(modal:any,resultado:Resultado){
		console.log(resultado)
		this.tituloModal = 'Editar Resultado';
		this.resultado = resultado;
		this.flagAccion = 2;
		this.modalRef = this.modalService.show(modal, { class: 'md', backdrop: 'static', keyboard: false });
	}

	ver(modal:any,resultado:Resultado){
		console.log(resultado)
		this.tituloModal = 'Ver Resultado';
		this.resultado = resultado;
		this.flagAccion = 3;
		this.modalRef = this.modalService.show(modal, { class: 'md', backdrop: 'static', keyboard: false });
	}

	eliminar(ideResultado:number){
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
				this.resultadosStateService.deleteItem(ideResultado).subscribe(() => {
					this.listar();
				});
			}
		});
	}
}
