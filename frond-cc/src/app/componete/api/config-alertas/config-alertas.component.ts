import { Component, OnInit } from '@angular/core';
import { cpservice } from '../../servicios/all.service';

@Component({
  selector: 'app-config-alertas',
  templateUrl: './config-alertas.component.html',
  styleUrls: ['./config-alertas.component.css']
})
export class ConfigAlertasComponent implements OnInit {

  lista: any[] = [];

  constructor(private configSrv: cpservice) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    const data = { option: 3 };
    this.configSrv.consultar().subscribe((resp: any) => {
      console.log(resp);
      this.lista = resp.info;
    });
  }

  guardar(cfg: any) {

    const payload = {
      option: 2,
      id_config: cfg.id_config,
      tipo_alerta: cfg.tipo_alerta,
      descripcion: cfg.descripcion,
      aplica_a: cfg.aplica_a,
      moneda: cfg.moneda,
      nivel_riesgo: cfg.nivel_riesgo,
      activo: cfg.activo,

      umbral_monto: cfg.umbral_monto,
      umbral_porcentaje: cfg.umbral_porcentaje,
      umbral_fraccionamiento: cfg.umbral_fraccionamiento,
      periodo_fraccionamiento: cfg.periodo_fraccionamiento
    };

    this.configSrv.actualizar(payload).subscribe((r: any) => {
      alert('Configuración actualizada correctamente');
    });
  }
}