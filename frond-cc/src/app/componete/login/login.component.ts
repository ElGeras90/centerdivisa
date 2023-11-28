import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormBuilder, FormGroup y Validators
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

import { AuthenticationService } from '../servicios/AuthenticationService';
import Swal from 'sweetalert2';
import { EncryptDataService } from '../servicios/encriptar';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;

  private motivationalQuotes: string[] = [
      "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, serás exitoso.",
      "Cada nuevo día es una oportunidad para comenzar de nuevo y hacerlo mejor. No desperdicies ese regalo.",
      "El primer paso para lograr algo es decidir que ya no quieres seguir donde estás.",
      "El tiempo es limitado. No lo desperdicies viviendo la vida de otra persona. ¡Sé tú mismo y persigue tus sueños!",
      "Los desafíos son lo que hacen la vida interesante. Supéralos y crece.",
      "La actitud es la diferencia entre un obstáculo y una oportunidad. Mantén una actitud positiva y transforma tu día.",
      "No importa lo lento que vayas, siempre y cuando no te detengas.",
      "Hoy es una página en blanco. Escribe una gran historia.",
      "El éxito no es el resultado de un acto espontáneo, sino de decisiones diarias.",
      "Tus pensamientos son la base de tu realidad. Mantén tus pensamientos positivos.",
      "No puedes cambiar el viento, pero puedes ajustar las velas para alcanzar tu destino.",
      "La persistencia es el camino al éxito. Nunca te rindas en la búsqueda de tus metas.",
      "El camino hacia tus sueños puede ser difícil, pero cada paso te acerca un poco más a ellos.",
      "El miedo es solo un obstáculo en el camino hacia el éxito. Supéralo y alcanza tus metas.",
      "La paciencia y la perseverancia tienen un poder mágico en sí mismas. Nunca subestimes su influencia.",
      "Cada día es una oportunidad para mejorar y acercarte a tus sueños. Aprovecha al máximo este día.",
      "La autodisciplina es el puente entre las metas y los logros. Mantén el enfoque y mantente disciplinado.",
      "No busques la felicidad fuera de ti, está en el interior. Encuéntrala y comparte esa alegría con el mundo.",
      "El fracaso es una parada en el camino hacia el éxito. Aprende de tus errores y sigue adelante.",
      "La vida es corta, así que vive cada día con pasión y gratitud. Hoy es un regalo, por eso se llama 'presente'."
    ]
  
  
  loginForm: FormGroup; // Crea el FormGroup
  motivationalQuote: string = '';

  constructor(private fb: FormBuilder,
    private router: Router,
    private Auth:AuthenticationService,
    private key: EncryptDataService,
    private d: ChangeDetectorRef,
    private x: EncryptDataService
    ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required], // Crea un FormControl para el campo usuario
      contraseña: ['', Validators.required] // Crea un FormControl para el campo contraseña
    });
  }
  ngOnInit() {
    this.motivationalQuote = this.getRandomQuote();
    this.d.detectChanges();
  }

  // Función para enviar el formulario
  async onSubmit() {
    console.log(this.loginForm.value.usuario);
    if (this.loginForm.valid) {
      const usuarioControl = this.loginForm.value.usuario;
      const contraseñaControl = this.loginForm.value.contraseña;
  
      if (usuarioControl && contraseñaControl) {
        const usuario = usuarioControl;
        const contraseña = contraseñaControl;
  
        if (usuario !== null && contraseña !== null) {
  
          this.Auth.Login(usuario, contraseña).subscribe(
            (data: any) => {
              console.log(data)
              if (data.info[0].login_usuario.action == 'error') {
                Swal.fire({
                  icon: data.info[0].login_usuario.action,
                  title: data.info[0].login_usuario.message,
                  allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
                  allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
                });
              } else {
                this.Auth.loginUser(data.info[0].login_usuario, data.Token)
                this.router.navigate(['api']);
              }
            },
            (error: any) => {
              console.log(error);
            }
          );
        }
      }
    }
  }
  

  async hashPassword(password:any) {
    const saltRounds = 10; // Número de rondas de sal
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  getRandomQuote(): string {
    const randomIndex = Math.floor(Math.random() * this.motivationalQuotes.length);
    return this.motivationalQuotes[randomIndex];
  }
  
  togglePasswordVisibility(event: Event) {
    event.preventDefault(); // Detener la propagación del evento
    this.hide = !this.hide; // Cambiar la visibilidad de la contraseña
  }
}
