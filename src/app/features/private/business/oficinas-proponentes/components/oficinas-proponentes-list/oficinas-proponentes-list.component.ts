import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { OficinasProponentesFormModalComponent } from '../oficinas-proponentes-form-modal/oficinas-proponentes-form-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ConveniosStateService } from '../../../convenios/services/convenios-state.service';
import { Subject } from 'rxjs';
import { OficinasProponentesStateService } from '../../services/oficinas-proponentes-state.service';
import { OficinaProponente } from '../../data/oficina-proponente.model';
import { dtOptionsData } from 'src/app/core/helpers/dtoptions.data';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-oficinas-proponentes-list',
	templateUrl: './oficinas-proponentes-list.component.html',
	styleUrl: './oficinas-proponentes-list.component.css',
	standalone: true,
	imports:[DataTablesModule,BsDropdownModule,CommonModule,NgSelectModule,FormsModule,ReactiveFormsModule,OficinasProponentesFormModalComponent],
})
export class OficinasProponentesListComponent implements OnInit {
	private modalService = inject(BsModalService);
	private spinner = inject(NgxSpinnerService);
	private router = inject(Router);
	private formBuilder = inject(FormBuilder);
	public conveniosStateService = inject(ConveniosStateService);
	public oficinasProponentesStateService = inject(OficinasProponentesStateService);

	modalRef?: BsModalRef;
	@ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
	dtTrigger: Subject<void> = new Subject<any>();

	dtOptions: DataTables.Settings = {};

	originalOficinasProponentes: OficinaProponente[] = [];
	oficinasProponentesFiltrados: OficinaProponente[] = [];

	@Input() ideConvenio: number;
	@Input() flagAction:number;

	formData: FormGroup = this.formBuilder.group({
		ideConvenio:[],
		fecEvaluacion:[],
	});

	oficinaProponente:OficinaProponente;
	tituloModal: string;
	flagAccion:number;

	ngOnInit(): void {
		this.dtOptions = dtOptionsData;
		this.oficinasProponentesStateService.clearState();
		this.listar();
		this.listarConvenios();

		console.log(this.flagAction)
		// if(this.flagAccion == 3){
		// 	this.formData.disable();
		// }
	}

	// ngOnChanges(changes: SimpleChanges): void {
	// 	console.log('flagAccion in hijo:', changes);
	// 	this.flagAction = changes['flagAction'].currentValue;
	// }

	listarConvenios(){
		this.conveniosStateService.loadItems();
	}

	listar(){
		this.oficinasProponentesStateService.loadItemsByConvenio(this.ideConvenio).subscribe(() => {
			this.originalOficinasProponentes = this.oficinasProponentesStateService.items();
			this.oficinasProponentesFiltrados = [...this.originalOficinasProponentes];
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
		this.tituloModal = 'Registrar Unidad de Organización Proponente / Ejecutora';
		let oficinaProponente:OficinaProponente = {
			ideConvenio: this.ideConvenio
		};
		this.oficinaProponente = oficinaProponente;
		this.flagAccion = 1;
		this.modalRef = this.modalService.show(modal, { class: 'md modal-lg', backdrop: 'static', keyboard: false });
	}

	editar(modal:any,oficinaProponente:OficinaProponente){
		this.tituloModal = 'Editar Unidad de Organización Proponente / Ejecutora';
		this.oficinaProponente = oficinaProponente;
		this.flagAccion = 2;
		this.modalRef = this.modalService.show(modal, { class: 'md modal-lg', backdrop: 'static', keyboard: false });
	}

	ver(modal:any,oficinaProponente:OficinaProponente){
		this.tituloModal = 'Ver Unidad de Organización Proponente / Ejecutora';
		this.oficinaProponente = oficinaProponente;
		this.flagAccion = 3;
		this.modalRef = this.modalService.show(modal, { class: 'md modal-lg', backdrop: 'static', keyboard: false });
	}
	
	eliminar(ideOficinaProponente:number){
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
				this.oficinasProponentesStateService.deleteItem(ideOficinaProponente).subscribe(() => {
					this.listar();
				});
			}
		});
	}








	buscar(){
		// this.OficinasProponentesFiltrados = this.originalOficinasProponentes.filter(c => {
		// 	const convenioSeleccionado = this.formData.get('ideConvenio').value;
		// 	const fecEvaluacionSeleccionada = this.formData.get('fecEvaluacion').value;
			
		// 	const coincideConvenio = !convenioSeleccionado || c.convenio?.ideConvenio == convenioSeleccionado;
		// 	const coincideFecEvaluacion = !fecEvaluacionSeleccionada || toDateInputValue(c.fecEvaluacion) == String(fecEvaluacionSeleccionada);

		// 	return coincideConvenio && coincideFecEvaluacion;
		// });

		// this.rerender();
	}
}
