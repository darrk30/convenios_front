import { Injectable, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { EvaluacionesAnualesRepository } from '../data/evaluaciones-anuales.repository';
import { EvaluacionAnual, EvaluacionAnualRpta } from '../data/evaluacion-anual.model';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EvaluacionesAnualesStateService {
    items = signal<EvaluacionAnual[]>([]);
    item = signal<EvaluacionAnual | null>(null);
    

    constructor(
        private evaluacionesAnualesRepository: EvaluacionesAnualesRepository,
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
        this.evaluacionesAnualesRepository.getAllByConvenio(ideConvenio).subscribe({
            next: (data:EvaluacionAnualRpta) => {
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
        this.evaluacionesAnualesRepository.getAll().subscribe({
            next: (data:EvaluacionAnualRpta) => {
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
        this.evaluacionesAnualesRepository.getBydId(id).subscribe({
            next: (data) => {
                this.item.set(data.dato);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    addItem(item: EvaluacionAnual, onSuccess?: () => void) {
        this.spinner.show();
        this.evaluacionesAnualesRepository.create(item).subscribe({
            next: (data:EvaluacionAnualRpta) => {
                //this.loadItems();
                console.log(data)
                //this.router.navigate([`negocio/EvaluacionAnual/editar/${data.dato.ideEvaluacionAnual}`]);
                this.toastr.success('EvaluacionAnual registrado correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al registrar el EvaluacionAnual');
                this.spinner.hide();
            }
        });
    }

    updateItem(id: number, item: EvaluacionAnual, onSuccess?: () => void) {
        this.spinner.show();
        this.evaluacionesAnualesRepository.update(id, item).subscribe({
            next: () => {
                //this.loadItems();
                this.toastr.success('EvaluacionAnual actualizado correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al actualizar el EvaluacionAnual');
                this.spinner.hide();
            }
        });
    }

    postForm(item: EvaluacionAnual, id?: number, onSuccess?: () => void){
        if(id){
            this.updateItem(id, item, onSuccess)
        }else{
            this.addItem(item, onSuccess)
        }
    }

    deleteItem(id: number): Observable<void> {
        this.spinner.show();
        const subject = new Subject<void>();
        this.evaluacionesAnualesRepository.delete(id).subscribe({
            next: () => {
                //this.loadItems();
                this.toastr.success('EvaluacionAnual eliminado correctamente');
                this.spinner.hide();
                subject.next();
                subject.complete();
            },
            error: () => {
                this.toastr.error('Error al eliminar el EvaluacionAnual');
                this.spinner.hide();
            }
        });

        return subject.asObservable();
    }

}