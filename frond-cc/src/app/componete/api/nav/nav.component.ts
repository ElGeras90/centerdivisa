import { Component, HostListener, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from '../../servicios/AuthenticationService';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent  implements OnInit {
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
      console.log(dmnues)
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
