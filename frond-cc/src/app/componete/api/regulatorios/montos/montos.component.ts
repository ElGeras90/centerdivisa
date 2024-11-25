import { Component } from '@angular/core';
import { cpservice } from 'src/app/componete/servicios/all.service';
import { regulatorios } from '../../../servicios/constantes';

@Component({
  selector: 'app-montos',
  templateUrl: './montos.component.html',
  styleUrls: ['./montos.component.css']
})
export class MontosComponent {
  constructor(private ruta: cpservice){

  }

  downloadReport() {
    const requestData = {
      idempresa: '1',
      trimestre: '2',
      ano: '2024'
    };

    this.ruta.reportemontos(requestData).subscribe(response => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.xml';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, error => {
      console.error('Error downloading the file', error);
    });
  }
}
