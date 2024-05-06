import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatListModule } from '@angular/material/list';


import { MatSidenavModule } from '@angular/material/sidenav';

import { MatMenuModule } from '@angular/material/menu';


import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginComponent } from './login/login.component';

import { MatCardModule } from '@angular/material/card';

import { ModalModule } from 'ngx-bootstrap/modal';

import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatSlideToggleModule,
    _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSnackBarModule,
        HttpClientModule,
        FormsModule,
        MatTabsModule,
        MatExpansionModule,
        CdkAccordionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatSidenavModule,
        MatMenuModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        ModalModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        _MatSlideToggleRequiredValidatorModule,
        ReactiveFormsModule,
        MatBadgeModule
    ],
    exports: [

        CommonModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSnackBarModule,
        HttpClientModule,
        FormsModule,
        MatTabsModule,
        MatExpansionModule,
        CdkAccordionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatSidenavModule,
        MatMenuModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        ModalModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        _MatSlideToggleRequiredValidatorModule,
        ReactiveFormsModule,
        MatCardModule,
        MatBadgeModule
    ]
})
export class imports { }