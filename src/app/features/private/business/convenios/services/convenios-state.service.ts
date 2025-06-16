import { Injectable, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { ConveniosRepository } from '../data/convenios.repository';
import { Convenio, ConvenioRpta } from '../data/convenio.model';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConveniosStateService {
    items = signal<Convenio[]>([]);
    item = signal<Convenio | null>(null);
    

    constructor(
        private conveniosRepository: ConveniosRepository,
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

    loadItems(): Observable<void> {
        const subject = new Subject<void>();
        this.spinner.show();
        this.conveniosRepository.getAll().subscribe({
            next: (data:ConvenioRpta) => {
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
        this.conveniosRepository.getBydId(id).subscribe({
            next: (data) => {
                this.item.set(data.dato);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    addItem(item: Convenio, onSuccess?: () => void) {
        this.spinner.show();
        this.conveniosRepository.create(item).subscribe({
            next: (data:ConvenioRpta) => {
                //this.loadItems();
                console.log(data)
                this.router.navigate([`negocio/convenio/editar/${data.dato.ideConvenio}`]);
                this.toastr.success('Convenio registrado correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al registrar el Convenio');
                this.spinner.hide();
            }
        });
    }

    updateItem(id: number, item: Convenio, onSuccess?: (updated?: Convenio) => void) {
        this.spinner.show();
        this.conveniosRepository.update(id, item).subscribe({
            next: (updated: ConvenioRpta) => {
                //this.loadItems();

                this.toastr.success('Convenio actualizado correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess(updated.dato);
            },
            error: () => {
                this.toastr.error('Error al actualizar el Convenio');
                this.spinner.hide();
            }
        });
    }

    postForm(item: Convenio, id?: number, onSuccess?: (updated?: Convenio) => void){
        if(id){
            this.updateItem(id, item, onSuccess)
        }else{
            this.addItem(item, onSuccess)
        }
    }

    deleteItem(id: number): Observable<void> {
        this.spinner.show();
        const subject = new Subject<void>();
        this.conveniosRepository.delete(id).subscribe({
            next: () => {
                //this.loadItems();
                this.toastr.success('Convenio eliminado correctamente');
                this.spinner.hide();
                subject.next();
                subject.complete();
            },
            error: () => {
                this.toastr.error('Error al eliminar el Convenio');
                this.spinner.hide();
            }
        });

        return subject.asObservable();
    }

}