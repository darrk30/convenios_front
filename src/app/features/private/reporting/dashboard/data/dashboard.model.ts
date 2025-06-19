import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexXAxis } from "ng-apexcharts";

export interface DashboardResponse {
    listaAnios: number[];
    totalConvenios: number;
    totalVigentes: number;
    conveniosPorAnio: ConvenioPorAnio[];
}

export interface ConvenioPorAnio {
    anio: number;
    cantidad: number;
}

export interface ConveniosBarChart {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    legend: ApexLegend;
    stroke: ApexStroke;
    fill: ApexFill;
    colors: string[];
}