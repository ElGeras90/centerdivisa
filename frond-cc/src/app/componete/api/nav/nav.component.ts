import { Component, HostListener, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private snack: MatSnackBar,
     private router: Router) {

  }
  menuOptions = [
    { label: 'Inicio', route: '/inicio' },
    { label: 'Usuarios', route: '/usuarios' },
    { label: 'Productos', route: '/productos' },
    // Agrega más opciones según tus necesidades
  ];

}
