import { Component, OnInit } from '@angular/core';
import { cpservice } from 'src/app/componete/servicios/all.service';
import { regulatorios } from '../../../servicios/constantes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-montos',
  templateUrl: './montos.component.html',
  styleUrls: ['./montos.component.css']
})
export class MontosComponent implements OnInit {
  reporteForm!: FormGroup;

  trimestres = [
    { id: 1, nombre: '1° Trimestre (Enero - Marzo)', inicio: '01-01', fin: '03-31' },
    { id: 2, nombre: '2° Trimestre (Abril - Junio)', inicio: '04-01', fin: '06-30' },
    { id: 3, nombre: '3° Trimestre (Julio - Septiembre)', inicio: '07-01', fin: '09-30' },
    { id: 4, nombre: '4° Trimestre (Octubre - Diciembre)', inicio: '10-01', fin: '12-31' },
  ];

  constructor(private fb: FormBuilder,private montosService: cpservice) {}

  ngOnInit(): void {
    this.reporteForm = this.fb.group({
      anio: [new Date().getFullYear(), Validators.required],
      trimestre: [null, Validators.required],
      clave_sujeto: ['', Validators.required],
      fecha_inicio: [{ value: '', disabled: true }],
      fecha_fin: [{ value: '', disabled: true }],
    });
  }

  actualizarFechas(): void {
    const { trimestre, anio } = this.reporteForm.value;
    const sel = this.trimestres.find(t => t.id === trimestre);
    if (!sel) return;

    const inicio = new Date(`${anio}-${sel.inicio}`);
    const fin = new Date(`${anio}-${sel.fin}`);
    this.reporteForm.patchValue({
      fecha_inicio: inicio,
      fecha_fin: fin,
    });
  }

  generarReporte(): void {
    if (this.reporteForm.invalid) return;

    const f = this.reporteForm.getRawValue();
   const idempresa= localStorage.getItem('emp')
    const params = {
      pid_empresa: idempresa, // ⚙️ se llenará automáticamente desde sesión o servicio
      p_trimestre: f.trimestre,
      p_clave_organo: 'CNBV',
      p_clave_sujeto: f.clave_sujeto,
      p_fecha_inicio: f.fecha_inicio.toISOString().split('T')[0],
      p_fecha_fin: f.fecha_fin.toISOString().split('T')[0],
    };

    this.montosService.reportemontos(params).subscribe({
       next: (blob: Blob) => {
          // Crea un archivo temporal y dispara descarga
          const fileName = 'reporte_DE1.xml';
          saveAs(blob, fileName);
        },      error: (err) => console.error('Error generando reporte:', err)
    });
  }
}

