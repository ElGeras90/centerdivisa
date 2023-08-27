import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormBuilder, FormGroup y Validators
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

import { AuthenticationService } from '../servicios/AuthenticationService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup; // Crea el FormGroup

  constructor(private fb: FormBuilder,
    private router: Router,
    private Auth:AuthenticationService) {
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

        console.log('Usuario:', usuario);
        console.log('Contraseña:', contraseña);

        this.Auth.Login(usuario,hashedPassword).subscribe(
          (data:any) => {
              console.log(data)
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
