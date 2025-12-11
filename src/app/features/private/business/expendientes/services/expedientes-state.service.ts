import { Injectable, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { DatosGeneralesExpediente, DatosGeneralesExpedienteRpta, Expediente, ExpedienteRpta } from '../data/expediente.model';
import { ExpedientesRepository } from '../data/expedientes.repository';
import { Observable, Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ExpedientesStateService {
    items = signal<Expediente[]>([]);
    item = signal<Expediente | null>(null);
    datosGenerales = signal<DatosGeneralesExpediente | null> (null);

    constructor(
        private expedientesRepository: ExpedientesRepository,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
    ) {
        this.clearState();
    }

    clearState() {
        this.item.set(null);
        this.items.set([]);
        this.datosGenerales.set(null);
    }

    loadDatosGeneralesByConvenio(ideConvenio:number): Observable<void> {
        const subject = new Subject<void>();
        this.spinner.show();
        this.expedientesRepository.getDatosGeneralesByConvenio(ideConvenio).subscribe({
            next: (data:DatosGeneralesExpedienteRpta) => {
                this.datosGenerales.set(data.dato);
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

    loadItemsByConvenio(ideConvenio:number): Observable<void> {
        //this.items.set([]);
        const subject = new Subject<void>();
        this.spinner.show();
        this.expedientesRepository.getAllByConvenio(ideConvenio).subscribe({
            next: (data:ExpedienteRpta) => {
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
        this.expedientesRepository.getAll().subscribe({
            next: (data:ExpedienteRpta) => {
                this.items.set(data.datos);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    loadItemById(id: number) {
        this.spinner.show();
        this.expedientesRepository.getBydId(id).subscribe({
            next: (data) => {
                this.item.set(data.dato);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    loadItemByExpediente(expediente: string) {
        this.spinner.show();
        const subject = new Subject<void>();
        this.expedientesRepository.getByExpediente(expediente).subscribe({
            next: (data:any) => {
                this.item.set(data.dato);
                this.spinner.hide();
                subject.next(data);
                subject.complete();
            },
            error: () => this.spinner.hide(),
        });
        return subject.asObservable();
    }

    addItem(item: Expediente, onSuccess?: () => void): Observable<any> {
        this.spinner.show();
        const subject = new Subject<void>();
        this.expedientesRepository.create(item).subscribe({
            next: (data:any) => {
                //this.loadItems();
                //this.toastr.success('Expediente registrado correctamente');
                this.spinner.hide();
                subject.next(data);
                subject.complete();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al registrar el Expediente');
                this.spinner.hide();
            }
        });
        return subject.asObservable();
    }

    updateItem(id: number, item: Expediente, onSuccess?: () => void): Observable<any> {
        this.spinner.show();
        const subject = new Subject<void>();
        this.expedientesRepository.update(id, item).subscribe({
            next: (data:any) => {
                //this.loadItems();
                this.toastr.success('Expediente actualizado correctamente');
                this.spinner.hide();
                subject.next(data);
                subject.complete();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al actualizar el Expediente');
                this.spinner.hide();
            }
        });
        return subject.asObservable();
    }

    postForm(item: Expediente, id?: number, onSuccess?: () => void): Observable<any>{
        if(id){
            return this.updateItem(id, item, onSuccess)
        }else{
            return this.addItem(item, onSuccess)
        }
    }

    deleteItem(id: number): Observable<void> {
        this.spinner.show();
        const subject = new Subject<void>();
        this.expedientesRepository.delete(id).subscribe({
            next: () => {
                //this.loadItems();
                this.toastr.success('Expediente eliminado correctamente');
                this.spinner.hide();
                subject.next();
                subject.complete();
            },
            error: () => {
                this.toastr.error('Error al eliminar el Expediente');
                this.spinner.hide();
            }
        });
        return subject.asObservable();
    }

    downloadPdf(ideTipoDocumento: string, numeroDocumento: string): Observable<Blob> {
        this.spinner.show();
        const subject = new Subject<Blob>();

        this.expedientesRepository.getDescargarPdf(ideTipoDocumento, numeroDocumento).subscribe({
            next: (blob: Blob) => {
                this.spinner.hide();
                subject.next(blob);
                subject.complete();
            },
            error: (err) => {
                this.spinner.hide();
                this.toastr.error("No se pudo descargar el documento");
                subject.error(err);
            }
        });

        return subject.asObservable();
    }
}