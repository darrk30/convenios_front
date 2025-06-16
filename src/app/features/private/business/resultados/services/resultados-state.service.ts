import { Injectable, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { ResultadosRepository } from '../data/resultados.repository';
import { Resultado, ResultadoRpta } from '../data/resultado.model';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResultadosStateService {
    items = signal<Resultado[]>([]);
    item = signal<Resultado | null>(null);

    constructor(
        private resultadosRepository: ResultadosRepository,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private router : Router
    ) {
        this.clearState();
    }

    clearState() {
        this.item.set(null);
        this.items.set([]);
    }

    loadItemsByConvenio(ideConvenio:number): Observable<void> {
        //this.items.set([]);
        const subject = new Subject<void>();
        this.spinner.show();
        this.resultadosRepository.getAllByConvenio(ideConvenio).subscribe({
            next: (data:ResultadoRpta) => {
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
        this.resultadosRepository.getAll().subscribe({
            next: (data:ResultadoRpta) => {
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
        this.resultadosRepository.getBydId(id).subscribe({
            next: (data) => {
                this.item.set(data.dato);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    addItem(item: Resultado, onSuccess?: () => void) {
        this.spinner.show();
        this.resultadosRepository.create(item).subscribe({
            next: (data:ResultadoRpta) => {
                //this.loadItemsByConvenio(item.ideConvenio);
                console.log(data)
                //this.router.navigate([`negocio/Resultado/editar/${data.dato.ideResultado}`]);
                this.toastr.success('Resultado registrado correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al registrar el Resultado');
                this.spinner.hide();
            }
        });
    }

    updateItem(id: number, item: Resultado, onSuccess?: () => void) {
        this.spinner.show();
        this.resultadosRepository.update(id, item).subscribe({
            next: () => {
                //this.loadItems();
                this.toastr.success('Resultado actualizado correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al actualizar el Resultado');
                this.spinner.hide();
            }
        });
    }

    postForm(item: Resultado, id?: number, onSuccess?: () => void){
        if(id){
            this.updateItem(id, item, onSuccess)
        }else{
            this.addItem(item, onSuccess)
        }
    }

    deleteItem(id: number): Observable<void> {
        this.spinner.show();
        const subject = new Subject<void>();
        this.resultadosRepository.delete(id).subscribe({
            next: () => {
                //this.loadItems();
                this.toastr.success('Resultado eliminado correctamente');
                this.spinner.hide();
                subject.next();
                subject.complete();
            },
            error: () => {
                this.toastr.error('Error al eliminar el Resultado');
                this.spinner.hide();
            }
        });

        return subject.asObservable();
    }

}