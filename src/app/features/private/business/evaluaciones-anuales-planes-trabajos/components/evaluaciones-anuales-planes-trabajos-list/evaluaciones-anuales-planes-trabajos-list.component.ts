import { CommonModule } from '@angular/common';
import { Component, computed, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EvaluacionesAnualesPlanesTrabajosFormModalComponent } from '../evaluaciones-anuales-planes-trabajos-form-modal/evaluaciones-anuales-planes-trabajos-form-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { EvaluacionesAnualesPlanesTrabajosStateService } from '../../services/evaluaciones-anuales-planes-trabajos-state.service';
import { ConveniosStateService } from '../../../convenios/services/convenios-state.service';
import { Subject } from 'rxjs';
import { EvaluacionAnualPlanTrabajo } from '../../data/evaluacion-anual-plan-trabajo.model';
import { dtOptionsData } from 'src/app/core/helpers/dtoptions.data';
import Swal from 'sweetalert2';
import { Convenio } from '../../../convenios/data/convenio.model';
import { toDateInputValue } from 'src/app/core/helpers/clean-form';
import { EvaluacionAnualPlanTrabajoStore } from '../../services/evaluacion-anual-plan-trabajo.store';
import { saveAs } from "file-saver";
import { PagetitleComponent } from 'src/app/shared/components/pagetitle/pagetitle.component';

@Component({
	selector: 'app-evaluaciones-anuales-planes-trabajos-list',
	templateUrl: './evaluaciones-anuales-planes-trabajos-list.component.html',
	styleUrl: './evaluaciones-anuales-planes-trabajos-list.component.css',
	standalone: true,
	imports:[DataTablesModule,BsDropdownModule,CommonModule,NgSelectModule,FormsModule,ReactiveFormsModule,EvaluacionesAnualesPlanesTrabajosFormModalComponent, PagetitleComponent],
})
export class EvaluacionesAnualesPlanesTrabajosListComponent {
	private modalService = inject(BsModalService);
	private spinner = inject(NgxSpinnerService);
	private router = inject(Router);
	private formBuilder = inject(FormBuilder);
	public conveniosStateService = inject(ConveniosStateService);
	public evaluacionesAnualesPlanesTrabajosStateService = inject(EvaluacionesAnualesPlanesTrabajosStateService);
	public evaluacionAnualPlanTrabajoStore = inject(EvaluacionAnualPlanTrabajoStore);

	modalRef?: BsModalRef;
	@ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
	dtTrigger: Subject<void> = new Subject<any>();

	dtOptions: DataTables.Settings = {};

	originalEvaluacionesAnualesPlanesTrabajos: EvaluacionAnualPlanTrabajo[] = [];
	evaluacionesAnualesPlanesTrabajosFiltrados: EvaluacionAnualPlanTrabajo[] = [];
	breadCrumbItems: Array<{}>;

	formData: FormGroup = this.formBuilder.group({
		ideConvenio:[],
		fecEvaluacion:[],
	});

	evaluacionAnualPlanTrabajo:EvaluacionAnualPlanTrabajo;
	tituloModal: string;
	flagAccion:number;
	//conveniosFiltrados: Convenio[] = [];

	ngOnInit(): void {
		this.breadCrumbItems = [{ label: 'Lista de Evaluaciones Anuales de Planes de Trabajos' }, { label: 'Evaluaciones Anuales de Planes de Trabajos', active: true }];
		this.dtOptions = dtOptionsData;
		this.evaluacionesAnualesPlanesTrabajosStateService.clearState();
		this.conveniosStateService.loadItems().subscribe(() => {
			console.log('Convenios cargados:', this.listarConvenios());
		});
		this.listar();
		//this.listarConvenios();
	}

	listarConvenios = computed(() => 
		this.conveniosStateService.items().filter(c => c.bitPlanTrabajo == true)
	);

	listar(){
		this.evaluacionesAnualesPlanesTrabajosStateService.loadItems().subscribe(() => {
			this.originalEvaluacionesAnualesPlanesTrabajos = this.evaluacionesAnualesPlanesTrabajosStateService.items();
			this.evaluacionesAnualesPlanesTrabajosFiltrados = [...this.originalEvaluacionesAnualesPlanesTrabajos];
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
		this.tituloModal = 'Registrar Evaluación Anual Plan de Trabajo';
		this.evaluacionAnualPlanTrabajo = null;
		this.flagAccion = 1;
		this.modalRef = this.modalService.show(modal, { class: 'md modal-lg', backdrop: 'static', keyboard: false });
	}

	editar(modal:any,evaluacionAnualPlanTrabajo:EvaluacionAnualPlanTrabajo){
		this.tituloModal = 'Editar Evaluación Anual Plan de Trabajo';
		this.evaluacionAnualPlanTrabajo = evaluacionAnualPlanTrabajo;
		this.flagAccion = 2;
		this.modalRef = this.modalService.show(modal, { class: 'md modal-lg', backdrop: 'static', keyboard: false });
	}
	
	eliminar(ideEvaluacionAnualPlanTrabajo:number){
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
				this.evaluacionesAnualesPlanesTrabajosStateService.deleteItem(ideEvaluacionAnualPlanTrabajo).subscribe(() => {
					this.listar();
				});
			}
		});
	}
	
	buscar(){
		this.evaluacionesAnualesPlanesTrabajosFiltrados = this.originalEvaluacionesAnualesPlanesTrabajos.filter(c => {
			const convenioSeleccionado = this.formData.get('ideConvenio').value;
			const fecEvaluacionSeleccionada = this.formData.get('fecEvaluacion').value;
			
			const coincideConvenio = !convenioSeleccionado || c.convenio?.ideConvenio == convenioSeleccionado;
			const coincideFecEvaluacion = !fecEvaluacionSeleccionada || toDateInputValue(c.fecEvaluacion) == String(fecEvaluacionSeleccionada);

			return coincideConvenio && coincideFecEvaluacion;
		});

		this.rerender();
	}

	descargar(evaluacionAnualPlanTrabajoe: EvaluacionAnualPlanTrabajo) {
		const uuid = evaluacionAnualPlanTrabajoe.uuid;
		this.evaluacionAnualPlanTrabajoStore.descargar(uuid).subscribe({
			next: (blob) => {
				saveAs(blob, `${uuid}.pdf`);
			},
			error: (error) => {
				console.error('Error al descargar el PDF', error);
			}
		});
	}
}
