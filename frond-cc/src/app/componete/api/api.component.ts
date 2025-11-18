import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../servicios/AuthenticationService';
import { slideInAnimation } from '../servicios/animations';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class ApiComponent implements OnInit {

  menus: any[] | null = null;
  constructor(private snack: MatSnackBar, private router: Router, private auth: AuthenticationService) {
    this.screenWidth = window.innerWidth;

  }

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav; // <- Agregamos "{ static: true }" aquí
  screenWidth: number | undefined;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }
  ngOnInit(): void {
        const dmnues = localStorage.getItem('menus');

    if (dmnues !== null) {
     const dmo = JSON.parse(dmnues);

     this.menus = dmo
      
    } 
    if (localStorage.getItem('ID') == null) {
      this.router.navigate(['login']);
    }
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['login']);
  }

}
