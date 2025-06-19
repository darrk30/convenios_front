import { computed, Injectable, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { DashboardsRepository } from '../data/dashboards.repository';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ConveniosBarChart, DashboardResponse } from '../data/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardsStateService {
    private dashboardData = signal<DashboardResponse | null>(null);

    // Expuestos como computed
    readonly listaAnios = computed(() => this.dashboardData()?.listaAnios ?? []);
    readonly totalVigentes = computed(() => this.dashboardData()?.totalVigentes ?? 0);
    readonly totalConvenios = computed(() => this.dashboardData()?.totalConvenios ?? 0);
    readonly conveniosPorAnio = computed(() => this.dashboardData()?.conveniosPorAnio ?? []);
    private readonly anioSeleccionado = signal<number | null>(null);


    readonly conveniosBarChart = computed<ConveniosBarChart>(() => {
        const data = this.dashboardData();

        if (!data) {
            return {
            series: [],
            chart: { type: 'bar', height: 350 },
            xaxis: { categories: [] },
            dataLabels: { enabled: false },
            plotOptions: { bar: { horizontal: false } },
            legend: { show: false },
            stroke: { show: true, width: 2, colors: ['transparent'] },
            fill: { opacity: 1 },
            colors: []
            };
        }

        const labels = data.conveniosPorAnio.map(x => x.anio.toString());
        const valores = data.conveniosPorAnio.map(x => x.cantidad);

        return {
            series: [
            {
                name: 'Convenios',
                data: valores
            }
            ],
            chart: {
                type: 'bar',
                height: 350
            },
            xaxis: {
                categories: labels
            },
            dataLabels: {
                enabled: true
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    distributed: true
                }
            },
            legend: {
                show: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            fill: {
                opacity: 1
            },
            colors: ['#9C2121', '#B33939', '#CC5C5C', '#E08B8B', '#E9BFBF', '#F2DCDC'],
        };
    });

    readonly conveniosPorAnioSeleccionado = computed(() => {
        const data = this.dashboardData();
        const anio = this.anioSeleccionado();

        if (!data || anio === null) return 0;

        return data.conveniosPorAnio.find(c => c.anio === anio)?.cantidad ?? 0;
    });

    constructor(private dashboardsRepo: DashboardsRepository) {}

    loadDashboard(): void {
        this.dashboardsRepo.getDashboardData().subscribe(data => {
            this.dashboardData.set(data);
        });
    }

    // Extra: filtrar por año desde el estado
    filtrarConveniosPorAnio(anio: number): number {
        return this.conveniosPorAnio().find(c => c.anio === anio)?.cantidad ?? 0;
    }


    // Método para actualizar el año seleccionado
    setAnioSeleccionado(anio: number) {
        this.anioSeleccionado.set(anio);
    }

    // Getter si necesitas acceder directamente al valor
    get selectedAnio(): number | null {
        return this.anioSeleccionado();
    }

}