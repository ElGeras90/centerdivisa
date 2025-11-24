import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { cpservice } from '../../servicios/all.service';

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.css']
})
export class OperacionesComponent implements OnInit {

  alertas: any[] = [];
  cargando = false;
  tipoSeleccionado = 'Relevante';
  nombreusuario: any;
  idusuario: any;
  sucursalid: any;
esAdmin: boolean = false; // true si el usuario es administrador

  fechaInicio: string = '';
  fechaFin: string = '';

  @ViewChild('modalEditar', { static: false }) modalEditar: any;



  alertaSeleccionada: any = {};

  constructor(private cp: cpservice) {}

  async ngOnInit() {
    this.nombreusuario = localStorage.getItem('nombre');
    this.idusuario = localStorage.getItem('ID');
    const empresa = localStorage.getItem('empresa');
    if (empresa) {
      const e = JSON.parse(empresa);
      this.sucursalid = e.sucursalid;
    }

    await this.consultarAlertas();
  }


  async consultarAlertas() {
    this.cargando = true;
    const data = { option: 1, tipo_alerta: this.tipoSeleccionado };
    try {
      const res: any = await this.cp.alertasMontosConsultar(data).toPromise();
      this.alertas = res?.info?.data || res?.info || [];
      if (!this.alertas.length) {
        Swal.fire('Sin registros', 'No se encontraron alertas.', 'info');
      }
    } catch (error) {
      Swal.fire('Error', 'Error al consultar alertas', 'error');
    } finally {
      this.cargando = false;
    }
  }

  cambiarTipo(tipo: string) {
    this.tipoSeleccionado = tipo;
    this.consultarAlertas();
  }

  async buscarPorFechas() {
    if (!this.fechaInicio || !this.fechaFin) {
      Swal.fire('Atención', 'Debes seleccionar ambas fechas', 'warning');
      return;
    }

    this.cargando = true;
    const data = {
      option: 3,
      tipo_alerta: this.tipoSeleccionado,
      fecha_inicio: this.fechaInicio,
      fecha_fin: this.fechaFin
    };

    try {
      const res: any = await this.cp.alertasMontosConsultar(data).toPromise();
      this.alertas = res?.info?.data || res?.info || [];

      console.log(res)
      if (!this.alertas.length) {
        Swal.fire('Sin resultados', 'No se encontraron alertas en el rango seleccionado.', 'info');
      }
    } catch (error) {
      Swal.fire('Error', 'No se pudieron obtener las alertas por fecha', 'error');
    } finally {
      this.cargando = false;
    }
  }

  limpiarFechas() {
    this.fechaInicio = '';
    this.fechaFin = '';
    this.consultarAlertas();
  } 
 
  editarAlerta(alerta: any) {
    this.alertaSeleccionada = { ...alerta };
    if (this.tipoSeleccionado === 'Inusual') {
      this.modalEditar.show();
    }
  }

  cerrarModal() {
    this.modalEditar.hide();
  }

  async guardarCambios() {
    const data = {
      option: 2,
      id_alerta: this.alertaSeleccionada.id_alerta,
      estatus: this.alertaSeleccionada.estatus,
      observaciones: this.alertaSeleccionada.observaciones,
      descripcion: this.alertaSeleccionada.descripcion,
      usuario_registro: this.idusuario
    };

    try {
      const res: any = await this.cp.alertasMontosActualizar(data).toPromise();
      const info = res?.info || res;

      if (info.action === 'success') {
        Swal.fire('Éxito', info.message || 'La alerta se actualizó correctamente.', 'success');
        //this.cerrarModal();
        //this.consultarAlertas();
      } else {
        Swal.fire('Atención', info.message || 'No se pudo actualizar la alerta', 'warning');
      }
    } catch {
      Swal.fire('Error', 'Error al actualizar la alerta', 'error');
    }
  }

  puedeEditar(): boolean {
  // Si no es admin y la alerta está reportada → NO puede modificar
  if (this.alertaSeleccionada.estatus === 'Reportada' && !this.esAdmin) {
    return false;
  }
  return true;
}

}
