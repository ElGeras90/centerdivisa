import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { userservice } from '../../servicios/userService';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  @ViewChild("will", { static: false })
  will: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  usuarioForm!: FormGroup;
  displayedColumns: string[] = ['usuario', 'correo', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);
  constructor(private router: Router,
    private modalService: NgbModal,
    private user: userservice) { }

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
      userid: new FormControl()
    });

    this.consultar();

   
  }
  ngAfterViewInit(): void{
    setTimeout(() => {
      this.dataSource.paginator = this.paginator; // Configurar el paginador
      this.paginator.pageSize = 10; // Establecer el tamaño de página predeterminado
    });
  }
  onSubmit() {
    if (this.usuarioForm.valid) {
      // Enviar el formulario al servicio o realizar la acción que necesites
      console.log(this.usuarioForm.value);
      if(this.info ==true){
      this.guardar(this.usuarioForm.value)
      }else{
        this.actualiza(this.usuarioForm.value)
      }
    } else {
      // Mostrar mensajes de error o realizar acciones apropiadas
    }
  }
  actualiza(value: any) {
    const info = {
      option:2,
      ...value
    }
 
    this.user.Login(info).subscribe(
      (data:any) => {
        Swal.fire({
          icon: data.resultado[0].manage_user.action,
          title: data.resultado[0].manage_user.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
       this.consultar()
       this.usuarioForm.reset();
      },(error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

    }
    )
  }

  info: boolean = false;

  guardars(){
    this.info = true;
    this.will.show();
  }
  actualizarUsuario(datos:any){
    this.usuarioForm.patchValue({
      ...datos
    });
    this.info = false;
    this.will.show();
  }

  eliminarUsuario(datos:any){
    console.log(datos)
    Swal.fire({
      icon: 'warning',
      title: 'Eliminar usuario '+ datos.usuarios,
      text: 'Esta seguro de eliminar al usuario ya se podra recuperar',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
      allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
    }).then((result) => {
      if (result.isConfirmed) {
        this.elimina(datos.userid)
        console.log('Aceptar');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Acción cuando se hace clic en Cancelar o se cierra la alerta
        console.log('Cancelar');

      }
    });
  }
  elimina(dato:any){
    const info = {
      option:3,
      userid:dato
    }
 
    this.user.Login(info).subscribe(
      (data:any) => {
        Swal.fire({
          icon: data.resultado[0].manage_user.action,
          title: data.resultado[0].manage_user.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.usuarioForm.reset();
       this.consultar()
      },(error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

    }
    )
  }
  consultar(){

    const info = {
      option:5
    }
    this.user.Login(info).subscribe(
      (data:any) => {
        console.log(data.resultado[0].manage_user.data)
        this.dataSource.data = data.resultado[0].manage_user.data; // Llenar dataSource con los datos
      },(error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
    }
    )
  }

  guardar(datos:any){
    const info = {
      option:1,
      ...datos
    }
    this.user.Login(info).subscribe(
      (data:any) => {
        Swal.fire({
          icon: data.resultado[0].manage_user.action,
          title: data.resultado[0].manage_user.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.usuarioForm.reset();
       this.consultar()
      },(error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

    }
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    console.log(event)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
