import { Injectable, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { EvaluacionesAnualesPlanesTrabajosRepository } from '../data/evaluaciones-anuales-planes-trabajos.repository';
import { EvaluacionAnualPlanTrabajo, EvaluacionAnualPlanTrabajoRpta } from '../data/evaluacion-anual-plan-trabajo.model';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EvaluacionesAnualesPlanesTrabajosStateService {
    items = signal<EvaluacionAnualPlanTrabajo[]>([]);
    item = signal<EvaluacionAnualPlanTrabajo | null>(null);
    

    constructor(
        private evaluacionesAnualesPlanesTrabajosRepository: EvaluacionesAnualesPlanesTrabajosRepository,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private paginationService: PaginationService,
        private router : Router
    ) {
        this.clearState();
    }

    clearState() {
        this.item.set(null);
        this.items.set([]);
    }

    loadItemsByConvenio(ideConvenio:number): Observable<void> {
        const subject = new Subject<void>();
        this.spinner.show();
        this.evaluacionesAnualesPlanesTrabajosRepository.getAllByConvenio(ideConvenio).subscribe({
            next: (data:EvaluacionAnualPlanTrabajoRpta) => {
                this.items.set(data.datos);
                this.spinner.hide();
                subject.next();
                subject.complete();
            },
            error: () => {
                this.spinner.hide();
                subject.error('Error');
            },
        });

        return subject.asObservable();
    }

    loadItems(): Observable<void> {
        const subject = new Subject<void>();
        this.spinner.show();
        this.evaluacionesAnualesPlanesTrabajosRepository.getAll().subscribe({
            next: (data:EvaluacionAnualPlanTrabajoRpta) => {
                this.items.set(data.datos);
                this.spinner.hide();
                subject.next();
                subject.complete();
            },
            error: () => {
                this.spinner.hide();
                subject.error('Error');
            },
        });

        return subject.asObservable();
    }

    loadItemById(id: number) {
        this.spinner.show();
        this.evaluacionesAnualesPlanesTrabajosRepository.getBydId(id).subscribe({
            next: (data) => {
                this.item.set(data.dato);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    addItem(item: EvaluacionAnualPlanTrabajo, onSuccess?: () => void) {
        this.spinner.show();
        this.evaluacionesAnualesPlanesTrabajosRepository.create(item).subscribe({
            next: (data:EvaluacionAnualPlanTrabajoRpta) => {
                //this.loadItems();
                console.log(data)
                //this.router.navigate([`negocio/EvaluacionAnualPlanTrabajo/editar/${data.dato.ideEvaluacionAnualPlanTrabajo}`]);
                this.toastr.success('EvaluacionAnualPlanTrabajo registrado correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al registrar el EvaluacionAnualPlanTrabajo');
                this.spinner.hide();
            }
        });
    }

    updateItem(id: number, item: EvaluacionAnualPlanTrabajo, onSuccess?: () => void) {
        this.spinner.show();
        this.evaluacionesAnualesPlanesTrabajosRepository.update(id, item).subscribe({
            next: () => {
                //this.loadItems();
                this.toastr.success('EvaluacionAnualPlanTrabajo actualizado correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al actualizar el EvaluacionAnualPlanTrabajo');
                this.spinner.hide();
            }
        });
    }

    postForm(item: EvaluacionAnualPlanTrabajo, id?: number, onSuccess?: () => void){
        if(id){
            this.updateItem(id, item, onSuccess)
        }else{
            this.addItem(item, onSuccess)
        }
    }

    deleteItem(id: number): Observable<void> {
        this.spinner.show();
        const subject = new Subject<void>();
        this.evaluacionesAnualesPlanesTrabajosRepository.delete(id).subscribe({
            next: () => {
                //this.loadItems();
                this.toastr.success('EvaluacionAnualPlanTrabajo eliminado correctamente');
                this.spinner.hide();
                subject.next();
                subject.complete();
            },
            error: () => {
                this.toastr.error('Error al eliminar el EvaluacionAnualPlanTrabajo');
                this.spinner.hide();
            }
        });

        return subject.asObservable();
    }

}