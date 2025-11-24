import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as saveAs from 'file-saver';
import { cpservice } from 'src/app/componete/servicios/all.service';

@Component({
  selector: 'app-operacionesinusuales',
  templateUrl: './operacionesinusuales.component.html',
  styleUrls: ['./operacionesinusuales.component.css']
})
export class OperacionesinusualesComponent  implements OnInit {
  reporteForm!: FormGroup;
  data: any[] = [];

  meses = [
    { id: 1, nombre: 'Enero' },
    { id: 2, nombre: 'Febrero' },
    { id: 3, nombre: 'Marzo' },
    { id: 4, nombre: 'Abril' },
    { id: 5, nombre: 'Mayo' },
    { id: 6, nombre: 'Junio' },
    { id: 7, nombre: 'Julio' },
    { id: 8, nombre: 'Agosto' },
    { id: 9, nombre: 'Septiembre' },
    { id: 10, nombre: 'Octubre' },
    { id: 11, nombre: 'Noviembre' },
    { id: 12, nombre: 'Diciembre' },
  ];

  constructor(
    private fb: FormBuilder,
    private relevantesService: cpservice
  ) {}

  ngOnInit(): void {
    this.reporteForm = this.fb.group({
      anio: [new Date().getFullYear(), Validators.required],
      mes: [null, Validators.required],
      clave_sujeto: ['', Validators.required],
      clave_organo: ['01-002', Validators.required],
      fecha_inicio: [{ value: '', disabled: true }],
      fecha_fin: [{ value: '', disabled: true }],
    });
  }

  actualizarFechas(): void {
    const { mes, anio } = this.reporteForm.value;
    if (!mes || !anio) return;

    const inicio = new Date(anio, mes - 1, 1);
    const fin = new Date(anio, mes, 0);

    this.reporteForm.patchValue({
      fecha_inicio: inicio,
      fecha_fin: fin
    });
  }

  // 🔍 Ver datos previos en tabla
  buscarPreview(): void {
    if (this.reporteForm.invalid) return;

    const f = this.reporteForm.getRawValue();
    const idempresa = localStorage.getItem('emp');

    const params = {
      fecha_inicio: f.fecha_inicio.toISOString().split('T')[0],
      fecha_fin: f.fecha_fin.toISOString().split('T')[0],
      organo: f.clave_organo,
      sujeto: f.clave_sujeto,
      empresa: idempresa
    };

    this.relevantesService.reporteinusuales(params).subscribe({
      next: (data: any) => {
        console.log(data.datos)
        this.data = data.datos;
      },
      error: (err: any) => console.error('Error al obtener vista previa:', err)
    });
  }

  // 📤 Exportar a CSV
  exportarCSV(): void {
    if (!this.data.length) return;

    const cabeceras = Object.keys(this.data[0]);
    const filas = this.data.map(row =>
      cabeceras
        .map(k => `"${(row[k] ?? '').toString().replace(/"/g, '""')}"`)
        .join(',')
    );

    const csv = [cabeceras.join(','), ...filas].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'inusuales.csv');
  }
}
