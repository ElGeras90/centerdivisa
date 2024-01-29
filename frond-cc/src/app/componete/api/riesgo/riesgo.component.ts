import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { cpservice } from '../../servicios/all.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-riesgo',
  templateUrl: './riesgo.component.html',
  styleUrls: ['./riesgo.component.css']
})
export class RiesgoComponent {
  @ViewChild("prod", { static: false })
  pro: any;
  @ViewChild("porigen", { static: false })
  porigen: any;
  @ViewChild("mmes", { static: false })
  mmes: any;
  @ViewChild("inst", { static: false })
  inst: any;
  @ViewChild("tusr", { static: false })
  tusr: any;
  @ViewChild("frec", { static: false })
  frec: any;
  @ViewChild("paises", { static: false })
  paises: any;
  @ViewChild("edos", { static: false })
  edos: any;
  @ViewChild("ocup", { static: false })
  ocup: any;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator2') paginator1!: MatPaginator;
  @ViewChild('paginator3') paginator2!: MatPaginator;
  @ViewChild('paginator4') paginator3!: MatPaginator;
  @ViewChild('paginator5') paginator4!: MatPaginator;
  @ViewChild('paginator6') paginator5!: MatPaginator;
  @ViewChild('paginator7') paginator6!: MatPaginator;
  @ViewChild('paginator8') paginator7!: MatPaginator;
  @ViewChild('paginator9') paginator8!: MatPaginator;
 

/**inicio variables para productos*/
dataSourceproducto = new MatTableDataSource<any>([]);
//dataSourceproducto = new MatTableDataSource<any>();

  displayedColumns: string[] = ['descripcion','puntos', 'acciones'];
 

  descricion:any;
  puntos:any;
  idproducto:any;

/**fin variables */
/**
 * 
 * monto por mes variable
 */
dataSourcemontomes = new MatTableDataSource<any>([]);
displayedColumnsmontomes: string[] =['nivel','montominimo', 'montomaximo','puntuacion','acciones'];

nivel:any;
minmonto:any;
maxmonto:any;
puntuacion:any;
idnivel:any;
/**fin variables */
/**
 * 
 * pais origen variable
 */
dataSourcepaisorigen = new MatTableDataSource<any>([]);
displayedColumnspaisorigen: string[] = ['descripcion','puntos', 'acciones']; 
descorigen:any;
puntosorigen:any;
id:any;
/**fin variables */
/**
 * 
 * Instrumentos variable
 */
dataSourceinstrumento = new MatTableDataSource<any>([]);
displayedColumnsinstrumento: string[] = ['descripcion','puntos', 'acciones']; 
descinst:any;
puntosinst:any;
idtipo:any;
/**fin variables */

/**
 * 
 * Frecuencia mes variable
 */
dataSourcefrecuencia = new MatTableDataSource<any>([]);
displayedColumnsfrecuencia: string[] = ['frecuencia','puntos', 'acciones']; 
frecuencia:any;
puntuacionfrec:any;
idfrecuencia:any;
/**fin variables */

/**
 * 
 * tuser variable
 */
dataSourcetuser = new MatTableDataSource<any>([]);
displayedColumnstuser: string[] =  ['descripcion','puntos', 'acciones']; 
descripcion:any;
puntostuser:any;
idtipousuario:any;

/**fin variables */

/**
 * 
 * paises mes variable
 */
dataSourcepaises = new MatTableDataSource<any>([]);
displayedColumnspaises: string[] = ['Pais','Codigo','nivel','Paraiso','Bloqueados', 'acciones']; 
nombre:any;
codigo:any;
nlist:any;
nivelp:any;
paraisofiscal:any;
bloqueado:any;
idpais:any;

/**fin variables */


/**
 * 
 * estados ariable
 */
dataSourceestados= new MatTableDataSource<any>([]);
displayedColumnsestados: string[] = ['Estado','puntuacion', 'acciones']; 
estadocodigo:any;
puntuacionedo:any;
idedo:any;


/**fin variables */

/**
 * 
 * estados ariable
 */
dataSourcesocupacion= new MatTableDataSource<any>([]);
displayedColumnsocupacion: string[] = ['Ocupacion','Clave','puntuacion', 'acciones']; 
ocupaciondescrip:any;
claveof:any;
nivelxd:any;
idactividad:any;

/**fin variables */
constructor(
  private cp: cpservice) { }
  async ngOnInit(): Promise<void> {
  await this.consultardatos()
}

ngAfterViewInit(): void {
  setTimeout(() => {
    this.dataSourceproducto.paginator = this.paginator; // Configurar el paginador
    this.dataSourcepaisorigen.paginator = this.paginator1;
    this.dataSourcemontomes.paginator = this.paginator2;
    this.dataSourceinstrumento.paginator = this.paginator3;
    this.dataSourcefrecuencia.paginator = this.paginator4;
    this.dataSourcetuser.paginator = this.paginator5;
    this.dataSourcepaises.paginator = this.paginator6;
    this.dataSourceestados.paginator = this.paginator7;
    this.dataSourcesocupacion.paginator = this.paginator8;
    this.paginator.pageSize = 5; // Establecer el tamaño de página predeterminado
    this.paginator1.pageSize = 5; // Establecer el tamaño de página predeterminado
    this.paginator2.pageSize = 5; // Establecer el tamaño de página predeterminado
    this.paginator3.pageSize = 5; // Establecer el tamaño de página predeterminado
    this.paginator4.pageSize = 5; // Establecer el tamaño de página predeterminado
    this.paginator5.pageSize = 5; // Establecer el tamaño de página predeterminado
    this.paginator6.pageSize = 5; // Establecer el tamaño de página predeterminado
    this.paginator7.pageSize = 5; // Establecer el tamaño de página predeterminado
    this.paginator8.pageSize = 5; // Establecer el tamaño de página predeterminado
  });
}

async consultardatos(){
  const a = {
    option: 5
  }
  this.cp.crudprod(a).subscribe(
    (data: any) => {
      console.log(data)
      if (data.info[0].manage_producto.action == 'error') {
        Swal.fire({
          icon: data.resultado[0].manage_producto.action,
          title: data.resultado[0].manage_producto.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

      } else {
        this.dataSourceproducto.data = data.info[0].manage_producto.data;
      }
    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un problema al intentar realizar la accion ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
    }
  )
  this.cp.crudorigen(a).subscribe(
    (data: any) => {
      console.log(data)
      if (data.info[0].manage_pais_origen.action == 'error') {
        Swal.fire({
          icon: data.resultado[0].manage_pais_origen.action,
          title: data.resultado[0].manage_pais_origen.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

      } else {
        this.dataSourcepaisorigen.data = data.info[0].manage_pais_origen.data;
      }
    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un problema al intentar realizar la accion ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
    }
  )
  this.cp.crudmonto(a).subscribe(
    (data: any) => {
      console.log(data)
      if (data.info[0].manage_montos_mes.action == 'error') {
        Swal.fire({
          icon: data.resultado[0].manage_montos_mes.action,
          title: data.resultado[0].manage_montos_mes.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

      } else {
        this.dataSourcemontomes.data = data.info[0].manage_montos_mes.data;
      }
    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un problema al intentar realizar la accion ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
    }
  )
  this.cp.crudinstrumento(a).subscribe(
    (data: any) => {
      console.log(data)
      if (data.info[0].manage_instrumentos.action == 'error') {
        Swal.fire({
          icon: data.resultado[0].manage_instrumentos.action,
          title: data.resultado[0].manage_instrumentos.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

      } else {
        this.dataSourceinstrumento.data = data.info[0].manage_instrumentos.data;
      }
    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un problema al intentar realizar la accion ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
    }
  )
  this.cp.crudfrecuencia(a).subscribe(
    (data: any) => {
      console.log(data)
      if (data.info[0].manage_frecuencia_mes.action == 'error') {
        Swal.fire({
          icon: data.resultado[0].manage_frecuencia_mes.action,
          title: data.resultado[0].manage_frecuencia_mes.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

      } else {
        this.dataSourcefrecuencia.data = data.info[0].manage_frecuencia_mes.data;
      }
    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un problema al intentar realizar la accion ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
    }
  )
  this.cp.crudtiposuer(a).subscribe(
    (data: any) => {
      console.log(data)
      if (data.info[0].manage_cat_tuser.action == 'error') {
        Swal.fire({
          icon: data.resultado[0].manage_cat_tuser.action,
          title: data.resultado[0].manage_cat_tuser.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

      } else {
        this.dataSourcetuser.data = data.info[0].manage_cat_tuser.data;
      }
    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un problema al intentar realizar la accion ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
    }
  )
  this.cp.crudpaises(a).subscribe(
    (data: any) => {
      console.log(data)
      if (data.info[0].manage_cat_paises.action == 'error') {
        Swal.fire({
          icon: data.resultado[0].manage_cat_paises.action,
          title: data.resultado[0].manage_cat_paises.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

      } else {
        this.dataSourcepaises.data = data.info[0].manage_cat_paises.data;
      }
    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un problema al intentar realizar la accion ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
    }
  )
  this.cp.crudestados(a).subscribe(
    (data: any) => {
      console.log(data)
      if (data.info[0].manage_cat_estados.action == 'error') {
        Swal.fire({
          icon: data.resultado[0].manage_cat_estados.action,
          title: data.resultado[0].manage_cat_estados.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

      } else {
        this.dataSourceestados.data = data.info[0].manage_cat_estados.data;
      }
    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un problema al intentar realizar la accion ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
    }
  )
  this.cp.crudocupacion(a).subscribe(
    (data: any) => {
      console.log(data)
      if (data.info[0].manage_cat_ocupaciones.action == 'error') {
        Swal.fire({
          icon: data.resultado[0].manage_cat_ocupaciones.action,
          title: data.resultado[0].manage_cat_ocupaciones.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

      } else {
        this.dataSourcesocupacion.data = data.info[0].manage_cat_ocupaciones.data;
      }
    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un problema al intentar realizar la accion ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
    }
  )
}
//FILTROS DE BUSQUEDA
  filtroproducto(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourceproducto.filter = filterValue.trim().toLowerCase();
  }
  filtropaisorigen(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourcepaisorigen.filter = filterValue.trim().toLowerCase();
  }
  filtromontomes(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourcemontomes.filter = filterValue.trim().toLowerCase();
  }
  filtroinstrumento(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourceinstrumento.filter = filterValue.trim().toLowerCase();
  }
  filtrofrecuencia(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourcefrecuencia.filter = filterValue.trim().toLowerCase();
  }
  filtrotuser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourcetuser.filter = filterValue.trim().toLowerCase();
  }
  filtropais(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourcepaises.filter = filterValue.trim().toLowerCase();
  }
  filtroestado(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourceestados.filter = filterValue.trim().toLowerCase();
  }
  filtroocupacion(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourcesocupacion.filter = filterValue.trim().toLowerCase();
  }
//ABRIR ACTUALIZAR
producto(info:any) {
  this.descricion = info.descripcion;
  this.puntos = info.puntos;
  this.idproducto = info.idproducto;
  this.pro.show();
}
paisorigen(info:any) {
  this.descorigen = info.desc;
  this.puntosorigen = info.puntos;
  this.id = info.id;
  this.porigen.show();
 
}
montomes(info:any) {
  this.nivel=info.nivel;
  this.minmonto=info.minmonto;
  this.maxmonto=info.maxmonto;
  this.puntuacion=info.puntuacion;
  this.idnivel=info.idnivel;
  this.mmes.show();
}
instrumento(info:any) {
  this.descinst=info.descripcion;
  this.puntosinst=info.puntos;
  this.idtipo = info.idtipo;
  this.inst.show();
}
frecuencias(info:any) {
  this.frecuencia=info.frecuencia;
  this.puntuacionfrec=info.puntuacion;
  this.idfrecuencia=info.idfrecuencia;
 this.frec.show();
}
tuser(info:any) {
  this.descripcion=info.descripcion;
  this.puntostuser=info.puntos;
  this.idtipousuario=info.idtipousuario;
  this.tusr.show();
}
pais(info:any) {
  this.nombre = info.nombre;
  this.codigo= info.codigo;
  this.nlist= info.nlist;
  this.nivelp=info.nivel;
  this.paraisofiscal=info.paraisofiscal;
  this.bloqueado = info.bloqueado;
  this.idpais = info.idpais;
  this.paises.show();
}
estado(info:any) {
  this.estadocodigo=info.estado;
  this.puntuacionedo=info.puntuacion;
  this.idedo=info.idest;
  this.edos.show();
}
ocupacion(info:any) {
  this.ocupaciondescrip = info.descricion;
  this.claveof = info.claveof;
  this.nivelxd = info.nivel;
  this.idactividad = info.idactividad;
  this.ocup.show();
}
//update
gproducto() {
  
  const a = {
    option: 2,
    descripcion:this.descripcion,
    idproducto:this.idproducto,
    puntos:this.puntos
  }
  this.cp.crudprod(a).subscribe(
    (data: any) => {
        Swal.fire({
          icon: data.resultado[0].manage_producto.action,
          title: data.resultado[0].manage_producto.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un problema al intentar realizar la accion ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
    }
  )
}
gpaisorigen() {
  const a = {
    option: 2,
   id:this.id ,
   desc:this.descorigen,
   puntos:this.puntosorigen
  }
  this.cp.crudorigen(a).subscribe(
    (data: any) => {
        Swal.fire({
          icon: data.resultado[0].manage_pais_origen.action,
          title: data.resultado[0].manage_pais_origen.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un problema al intentar realizar la accion ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
    }
  )
}
gmontomes() {
  const a = {
    option: 2,
    idnivel:this.idnivel,
    maxmonto:this.maxmonto,
    minmonto:this.minmonto,
    nivel:this.nivel,
    puntuacion:this.puntuacion,
  }
  this.cp.crudmonto(a).subscribe(
    (data: any) => {
      console.log(data)
      if (data.info[0].manage_montos_mes.action == 'error') {
        Swal.fire({
          icon: data.resultado[0].manage_montos_mes.action,
          title: data.resultado[0].manage_montos_mes.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

      } else {
        this.dataSourcemontomes.data = data.info[0].manage_montos_mes.data;
      }
    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un problema al intentar realizar la accion ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
    }
  )
}
ginstrumento() {
  const a = {
    option: 2,
    idtipo: this.idtipo,
    puntos:this.puntosinst,
    descripcion: this.descinst
  }
  this.cp.crudinstrumento(a).subscribe(
    (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_instrumentos.action,
          title: data.resultado[0].manage_instrumentos.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });


    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un problema al intentar realizar la accion ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
    }
  )
}
gfrecuencias() {
  const a = {
    option: 2,
    frecuencia: this.frecuencia, puntuacion: this.puntuacionfrec, idfrecuencia: this.idfrecuencia
  }
  this.cp.crudfrecuencia(a).subscribe(
    (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_frecuencia_mes.action,
          title: data.resultado[0].manage_frecuencia_mes.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

     
    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un problema al intentar realizar la accion ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
    }
  )
}
gtuser() {
  const a = {
    option: 2,
    puntos: this.puntostuser, descripcion:  this.descripcion, idtipousuario: this.idtipousuario
  }
  this.cp.crudtiposuer(a).subscribe(
    (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_cat_tuser.action,
          title: data.resultado[0].manage_cat_tuser.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un problema al intentar realizar la accion ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
    }
  )
}
gpais() {
  
  const a = {
    option: 2,
     nivel: this.nivelp, nlist: this.nlist, codigo: this.codigo, idpais: this.idpais,nombre: this.nombre ,paraisofiscal:this.paraisofiscal, bloqueado:this.bloqueado
  }
  this.cp.crudpaises(a).subscribe(
    (data: any) => {
     
        Swal.fire({
          icon: data.resultado[0].manage_cat_paises.action,
          title: data.resultado[0].manage_cat_paises.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

     
    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un problema al intentar realizar la accion ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
    }
  )
 

}
gestado() {
  const a = {
    option: 2,
    idest: this.idedo, estado: this.estadocodigo, puntuacion: this.puntuacionedo 
   }

  this.cp.crudestados(a).subscribe(
    (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_cat_estados.action,
          title: data.resultado[0].manage_cat_estados.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un problema al intentar realizar la accion ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
    }
  )
 
}
gocupacion() {

  const a = {
    option: 2,
    nivel: this.nivelxd , claveof: this.claveof, idacividad: this.idactividad, descripcion: this.ocupaciondescrip
   }
  this.cp.crudocupacion(a).subscribe(
    (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_cat_ocupaciones.action,
          title: data.resultado[0].manage_cat_ocupaciones.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un problema al intentar realizar la accion ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
    }
  )
}

//limpiar
clean(){
  this.descricion ='';
  this.puntos = '';
  this.idproducto ='';
}

}


