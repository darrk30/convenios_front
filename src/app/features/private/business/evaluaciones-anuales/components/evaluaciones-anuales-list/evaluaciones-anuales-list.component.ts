import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { EvaluacionesAnualesStateService } from '../../services/evaluaciones-anuales-state.service';
import { ConveniosStateService } from '../../../convenios/services/convenios-state.service';
import { Subject } from 'rxjs';
import { EvaluacionAnual } from '../../data/evaluacion-anual.model';
import { dtOptionsData } from 'src/app/core/helpers/dtoptions.data';
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EvaluacionesAnualesFormModalComponent } from '../evaluaciones-anuales-form-modal/evaluaciones-anuales-form-modal.component';
import { toDateInputValue } from 'src/app/core/helpers/clean-form';
import { PagetitleComponent } from 'src/app/shared/components/pagetitle/pagetitle.component';

@Component({
	selector: 'app-evaluaciones-anuales-list',
	templateUrl: './evaluaciones-anuales-list.component.html',
	styleUrl: './evaluaciones-anuales-list.component.css',
	standalone: true,
	imports:[DataTablesModule,BsDropdownModule,CommonModule,NgSelectModule,FormsModule,ReactiveFormsModule,EvaluacionesAnualesFormModalComponent, PagetitleComponent],
})
export class EvaluacionesAnualesListComponent {
	private modalService = inject(BsModalService);
	private spinner = inject(NgxSpinnerService);
	private router = inject(Router);
	private formBuilder = inject(FormBuilder);
	public conveniosStateService = inject(ConveniosStateService);
	public evaluacionesAnualesStateService = inject(EvaluacionesAnualesStateService);

	modalRef?: BsModalRef;
	@ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
	dtTrigger: Subject<void> = new Subject<any>();

	dtOptions: DataTables.Settings = {};

	originalEvaluacionesAnuales: EvaluacionAnual[] = [];
	evaluacionesAnualesFiltrados: EvaluacionAnual[] = [];
	breadCrumbItems: Array<{}>;

	formData: FormGroup = this.formBuilder.group({
		ideConvenio:[],
		fecEvaluacion:[],
	});

	evaluacionAnual:EvaluacionAnual;
	tituloModal: string;
	flagAccion:number;

	ngOnInit(): void {
		this.breadCrumbItems = [{ label: 'Lista de Evaluaciones Anuales' }, { label: 'Evaluaciones Anuales', active: true }];
		this.dtOptions = dtOptionsData;
		this.evaluacionesAnualesStateService.clearState();
		this.listar();
		this.listarConvenios();
	}

	listarConvenios(){
		this.conveniosStateService.loadItems();
	}

	listar(){
		this.evaluacionesAnualesStateService.loadItems().subscribe(() => {
			this.originalEvaluacionesAnuales = this.evaluacionesAnualesStateService.items();
			this.evaluacionesAnualesFiltrados = [...this.originalEvaluacionesAnuales];
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
		this.tituloModal = 'Registrar Evaluación Anual';
		this.evaluacionAnual = null;
		this.flagAccion = 1;
		this.modalRef = this.modalService.show(modal, { class: 'md modal-lg', backdrop: 'static', keyboard: false });
	}

	editar(modal:any,evaluacionAnual:EvaluacionAnual){
		this.tituloModal = 'Editar Evaluación Anual';
		this.evaluacionAnual = evaluacionAnual;
		this.flagAccion = 2;
		this.modalRef = this.modalService.show(modal, { class: 'md modal-lg', backdrop: 'static', keyboard: false });
	}
	
	eliminar(ideEvaluacionAnual:number){
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
				this.evaluacionesAnualesStateService.deleteItem(ideEvaluacionAnual).subscribe(() => {
					this.listar();
				});
			}
		});
	}
	
	buscar(){
		this.evaluacionesAnualesFiltrados = this.originalEvaluacionesAnuales.filter(c => {
			const convenioSeleccionado = this.formData.get('ideConvenio').value;
			const fecEvaluacionSeleccionada = this.formData.get('fecEvaluacion').value;
			
			const coincideConvenio = !convenioSeleccionado || c.convenio?.ideConvenio == convenioSeleccionado;
			const coincideFecEvaluacion = !fecEvaluacionSeleccionada || toDateInputValue(c.fecEvaluacion) == String(fecEvaluacionSeleccionada);

			return coincideConvenio && coincideFecEvaluacion;
		});

		this.rerender();
	}

}
