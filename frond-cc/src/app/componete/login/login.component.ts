import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormBuilder, FormGroup y Validators
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

import { AuthenticationService } from '../servicios/AuthenticationService';
import Swal from 'sweetalert2';
import { EncryptDataService } from '../servicios/encriptar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup; // Crea el FormGroup

  constructor(private fb: FormBuilder,
    private router: Router,
    private Auth:AuthenticationService,
    private key: EncryptDataService) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required], // Crea un FormControl para el campo usuario
      contraseña: ['', Validators.required] // Crea un FormControl para el campo contraseña
    });
  }

  // Función para enviar el formulario
  async onSubmit() {
    if (this.loginForm.valid) {
      const usuarioControl = this.loginForm.get('usuario');
      const contraseñaControl = this.loginForm.get('contraseña');
  

      if (usuarioControl && contraseñaControl) {
        const usuario = usuarioControl.value;
        const contraseña = contraseñaControl.value;
        
        const hashedPassword = await this.hashPassword(contraseña);


        console.log('Datos cifrados:', hashedPassword);

        console.log( this.key.encriptar(usuario));
       

        this.Auth.Login(usuario,contraseña).subscribe(
          (data:any) => {
            if(data.info[0].login_usuario.action == 'error'){
              Swal.fire({
                icon: data.info[0].login_usuario.action,
                title: data.info[0].login_usuario.message,
                allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
                allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
              });
            }else{
              this.Auth.loginUser(data.info[0].login_usuario,data.Token)
              this.router.navigate(['api']);
            }
          },(error: any) => {
            console.log(error);

          }
        )
      }
    }
  }

  async hashPassword(password:any) {
    const saltRounds = 10; // Número de rondas de sal
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
  
}
