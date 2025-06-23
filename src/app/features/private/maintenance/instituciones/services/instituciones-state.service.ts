import { Injectable, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { Institucion, InstitucionRpta } from '../data/institucion.model';
import { InstitucionesRepository } from '../data/instituciones.repository';
import { Observable, Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class InstitucionesStateService {
    items = signal<Institucion[]>([]);
    item = signal<Institucion | null>(null);
    // totalItems = signal<number>(1);
    // currentPage = signal<number>(1);
    // pageSize = signal<number>(5);

    constructor(
        private institucionesRepository: InstitucionesRepository,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private paginationService: PaginationService
    ) {}

    loadItems(): Observable<void> {
        const subject = new Subject<void>();    
        this.spinner.show();
        this.institucionesRepository.getAll().subscribe({
            next: (data:InstitucionRpta) => {
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
        this.institucionesRepository.getBydId(id).subscribe({
            next: (data) => {
                this.item.set(data.dato);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    addItem(item: Institucion, onSuccess?: () => void) {
        this.spinner.show();
        this.institucionesRepository.create(item).subscribe({
            next: (data) => {
                // this.loadItems();
                this.toastr.success('Institución registrada correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al registrar la Institución');
                this.spinner.hide();
            }
        });
    }

    updateItem(id: number, item: Institucion, onSuccess?: (updated?: Institucion) => void) {
        this.spinner.show();
        this.institucionesRepository.update(id, item).subscribe({
            next: (updated: InstitucionRpta) => {
                // this.loadItems();
                this.toastr.success('Institución actualizada correctamente');
                this.spinner.hide();

                this.loadItemById(id); 

                if (onSuccess) onSuccess(updated.dato);
            },
            error: () => {
                this.toastr.error('Error al actualizar la Institución');
                this.spinner.hide();
            }
        });
    }

    clearState() {
        this.item.set(null);
        this.items.set([]);
    }

    postForm(item: Institucion, id?: number, onSuccess?: (updated?: Institucion) => void){
        if(id){
            this.updateItem(id, item, onSuccess)
        }else{
            this.addItem(item, onSuccess)
        }
    }

    deleteItem(id: number) {
        const subject = new Subject<void>();
        this.spinner.show();

        this.institucionesRepository.delete(id).subscribe({
            next: () => {
                // this.loadItems();
                this.toastr.success('Institución eliminada correctamente');
                this.spinner.hide();
                subject.next();
                subject.complete();
            },
            error: () => {
                this.toastr.error('Error al eliminar la Institución');
                this.spinner.hide();
            }
        });
        return subject.asObservable();        
    }
}