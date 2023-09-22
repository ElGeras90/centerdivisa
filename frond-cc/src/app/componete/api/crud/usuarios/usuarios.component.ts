import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { userservice } from '../../../servicios/userService';
import { MatPaginator } from '@angular/material/paginator';
import { cpservice } from '../../../servicios/all.service';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('300ms', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
})
export class UsuariosComponent {

  @ViewChild("will", { static: false })
  will: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  usuarioForm!: FormGroup;
  displayedColumns: string[] = ['usuario', 'correo', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);
  codigoValue: string = '';
  colonia: any;
  rol: any;
  empre: any;
  sucursales: any[] = [];
  llenardatos: any;
  formularioupdate: any = {};
  code: any;
  est: any;
  mun: any;
  e: any;
  constructor(
    private user: userservice,
    private cp: cpservice) { }

  ngOnInit(): void {
    this.usuarioForm = new FormGroup({
      usuario: new FormControl('', Validators.required),
      contrasena: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      paterno: new FormControl(''),
      materno: new FormControl(''),
      calle: new FormControl(''),
      numero: new FormControl(''),
      idcp: new FormControl(),
      correo: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl(''),
      activo: new FormControl(true),
      fecharegistro: new FormControl(new Date()),
      fechacierre: new FormControl(),
      usuariomodifico: new FormControl(''),
      fechamodificacion: new FormControl(),
      perfilid: new FormControl(),
      sucursalid: new FormControl(),
      userid: new FormControl(),
      codigopostal: new FormControl(),
      municipio: new FormControl(),
      estado: new FormControl(),
      empresa: new FormControl()
    });

    this.consultar();
    this.consultarol();
    this.Empresas();
  }
  //para llenar el paginador
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator; // Configurar el paginador
      this.paginator.pageSize = 10; // Establecer el tamaño de página predeterminado
    });
  }
  //accion que realizara el formulario al dar clic al boton
  onSubmit() {
    if (this.usuarioForm.valid) {
      // Enviar el formulario al servicio o realizar la acción que necesites
      if (this.info == true) {
        this.guardar(this.usuarioForm.value)
      } else {
        this.actualiza(this.usuarioForm.value)
      }
    } else {
      // Mostrar mensajes de error o realizar acciones apropiadas
    }
  }
  //actualiza el usuario
  actualiza(value: any) {
    const info = {
      option: 2,
      ...value
    }

    this.user.User(info).subscribe(
      (data: any) => {
        Swal.fire({
          icon: data.resultado[0].manage_user.action,
          title: data.resultado[0].manage_user.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.consultar()
        this.will.hide()
        this.usuarioForm.reset();
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.consultar()
        this.will.hide()
        this.usuarioForm.reset();
      }
    )
  }

  info: boolean = false;
  //abre el modal llamado will para hacer la opcion de guardar
  guardars() {
    this.info = true;
    this.will.show();
  }


  async actualizarUsuario(datos: any) {
    this.formularioupdate = { ...datos };
  
    try {
      const info = {
        option: 4,
        sucursalid: datos.sucursalid
      };
  
      const data1: any = await this.cp.sucursal(info).toPromise(); // Convertir el observable a una promesa

    if (data1?.resultado?.[0]?.manage_sucursal?.action !== 'error') {
      this.e = data1.resultado[0].manage_sucursal.data.empresaid;
    }
  
      const info2 = {
        cp: datos.idcp
      };
  
      const data2: any = await this.cp.codigopostar(info2).toPromise(); // Convertir el observable a una promesa
  
      this.code = data2.info.data[0].cp;
      this.est = data2.info.data[0].estado;
      this.mun = data2.info.data[0].municipio;
  
      this.usuarioForm.patchValue({
        usuario: datos.usuario,
        contrasena: datos.contrasena,
        nombre: datos.nombre,
        paterno: datos.paterno,
        materno: datos.materno,
        calle: datos.calle,
        numero: datos.numero,
        idcp: datos.idcp,
        correo:datos.correo,
        telefono: datos.telefono,
        activo:datos.activo,
        fecharegistro:datos.fecharegistro,
        fechacierre: datos.fechacierre,
        usuariomodifico: datos.usuariomodifico,
        fechamodificacion: datos.fechamodificacion,
        perfilid: datos.perfilid,
        sucursalid: datos.sucursalid,
        userid: datos.userid,
        codigopostal: this.code,
        municipio: this.mun,
        estado: this.est,
        empresa:  this.e
        
      });
  
      const infos = {
        option: 6,
        empresaid: this.e
      }
      this.cp.sucursal(infos).subscribe(
        (data: any) => {
          if (data.resultado[0].manage_sucursal.action == 'error') {
            Swal.fire({
              icon: data.info.action,
              title: data.info.message,
              allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
              allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
            });
  
          } else {
            this.sucursales = data.resultado[0].manage_sucursal.data;
            console.log(this.sucursales)
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
      this.consultarCodigosPostales(this.code);
      this.imprimir();
    } catch (error) {
      // Manejar errores si es necesario
    }
  }
  

  imprimir() {
   

    console.log(this.usuarioForm.value)
    this.info = false;
    this.will.show();
  }
  eliminarUsuario(datos: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Eliminar usuario ' + datos.usuarios,
      text: 'Esta seguro de eliminar al usuario ya se podra recuperar',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
      allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
    }).then((result) => {
      if (result.isConfirmed) {
        this.elimina(datos.userid)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Acción cuando se hace clic en Cancelar o se cierra la alerta

      }
    });
  }
  elimina(dato: any) {
    const info = {
      option: 3,
      userid: dato
    }

    this.user.User(info).subscribe(
      (data: any) => {
        Swal.fire({
          icon: data.resultado[0].manage_user.action,
          title: data.resultado[0].manage_user.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.usuarioForm.reset();
        this.consultar()
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
  consultar() {

    const info = {
      option: 5
    }
    this.user.User(info).subscribe(
      (data: any) => {
        this.dataSource.data = data.resultado[0].manage_user.data; // Llenar dataSource con los datos
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

  guardar(datos: any) {
    const info = {
      option: 1,
      ...datos
    }
    this.user.User(info).subscribe(
      (data: any) => {
        Swal.fire({
          icon: data.resultado[0].manage_user.action,
          title: data.resultado[0].manage_user.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.usuarioForm.reset();
        this.will.hide()
        this.consultar()
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.consultar()
        this.will.hide()
        this.usuarioForm.reset();
      }
    )
  }
  //filtra los resultados de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  consultarCodigosPostales(dato: any) {

    const info = {
      cp: dato
    }
    this.cp.codigopostarl(info).subscribe(
      (data: any) => {
        if (data.info.action == 'error') {
          Swal.fire({
            icon: data.info.action,
            title: data.info.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.colonia = data.info.data;
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

  consultarDespuesDe5Digitos() {
    const codigoControl = this.usuarioForm.get('codigopostal');
    const codigoValue = codigoControl?.value;

    if (codigoValue && codigoValue.length === 5) {
      this.consultarCodigosPostales(codigoValue);
    }

  }

  seleccionarColonia(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue !== null) {
      const selectedColonia = this.colonia.find((item: any) => item.id == selectedValue);
      if (selectedColonia) {
        this.usuarioForm.patchValue({
          municipio: selectedColonia.municipio,
          estado: selectedColonia.estado
        });
      }
    }
  }
  seleccionarSucursal(event: Event) {
    const selectedValue = (event.target as HTMLInputElement).value;

    console.log(selectedValue)
    if (selectedValue !== null) {
      this.llenardatos = this.sucursales.find((item: any) => item.empresaid == selectedValue);
      console.log(this.llenardatos)

    }
  }
  consultarol() {

    const info = {
      option: 5
    }
    this.cp.roles(info).subscribe(
      (data: any) => {
        if (data.resultado[0].manage_rol.action == 'error') {
          Swal.fire({
            icon: data.info.action,
            title: data.info.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.rol = data.resultado[0].manage_rol.data;
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

  Empresas() {

    const info = {
      option: 5
    }
    this.cp.Empresax(info).subscribe(
      (data: any) => {
        if (data.resultado[0].manage_empresa.action == 'error') {
          Swal.fire({
            icon: data.info.action,
            title: data.info.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.empre = data.resultado[0].manage_empresa.data;
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
  suc(event: any) {
    const selectedValue = event.target.value;

    const info = {
      option: 6,
      empresaid: selectedValue
    }
    this.cp.sucursal(info).subscribe(
      (data: any) => {
        if (data.resultado[0].manage_sucursal.action == 'error') {
          Swal.fire({
            icon: data.info.action,
            title: data.info.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.sucursales = data.resultado[0].manage_sucursal.data;
          console.log(this.sucursales)
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
}
