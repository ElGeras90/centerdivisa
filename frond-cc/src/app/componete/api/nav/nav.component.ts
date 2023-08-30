import { Component, HostListener, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent  implements OnInit {
  menus: any[] | null = null;
  constructor(private snack: MatSnackBar, private router: Router) {
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
     console.log(this.menus)
      
    } 
  }
 

}
