import { Injectable, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { Contraparte, ContraparteRpta } from '../data/contraparte.model';
import { ContrapartesRepository } from '../data/contrapartes.repository';
import { Observable, Subject } from 'rxjs';
import { ContrapartesCoordinadorStateService } from '../../contrapartes-coordinador/services/contrapartes-coordinador-state.service';


@Injectable({ providedIn: 'root' })
export class ContrapartesStateService {
    items = signal<Contraparte[]>([]);
    item = signal<Contraparte | null>(null);

    constructor(
        private contrapartesRepository: ContrapartesRepository,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private contrapartesCoordinadorStateService: ContrapartesCoordinadorStateService
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
        this.contrapartesRepository.getAllByConvenio(ideConvenio).subscribe({
            next: (data:ContraparteRpta) => {
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


    loadItems(page: number = 1) {
        this.spinner.show();
        this.contrapartesRepository.getAll().subscribe({
            next: (data:ContraparteRpta) => {
                this.items.set(data.datos);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    loadItemById(id: number) {
        this.spinner.show();
        this.contrapartesRepository.getBydId(id).subscribe({
            next: (data) => {
                this.item.set(data.dato);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    addItem(item: Contraparte, onSuccess?: () => void) {
        this.spinner.show();
        this.contrapartesRepository.create(item).subscribe({
            next: (data) => {
                //this.loadItems();
                this.toastr.success('Contraparte registrado correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al registrar el Contraparte');
                this.spinner.hide();
            }
        });
    }

    updateItem(id: number, item: Contraparte, onSuccess?: () => void) {
        this.spinner.show();
        this.contrapartesRepository.update(id, item).subscribe({
            next: () => {
                //this.loadItems();
                this.toastr.success('Contraparte actualizado correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al actualizar el Contraparte');
                this.spinner.hide();
            }
        });
    }

    postForm(item: Contraparte, id?: number, onSuccess?: () => void){
        if(id){
            this.updateItem(id, item, onSuccess)
        }else{
            this.addItem(item, onSuccess)
        }
    }

    deleteItem(id: number): Observable<void> {
        this.spinner.show();
        const subject = new Subject<void>();
        this.contrapartesRepository.delete(id).subscribe({
            next: () => {
                //this.loadItems();
                this.contrapartesCoordinadorStateService.emitRefresh();
                this.toastr.success('Contraparte eliminado correctamente');
                this.spinner.hide();
                subject.next();
                subject.complete();
            },
            error: () => {
                this.toastr.error('Error al eliminar el Contraparte');
                this.spinner.hide();
            }
        });
        return subject.asObservable();
    }
}