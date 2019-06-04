import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HomeComponent } from './components/home/home.component';
import { StaffComponent } from './components/staff/staff.component'
import { CreatestaffComponent } from './components/staff/createstaff/createstaff.component';
<<<<<<< HEAD
import { SalaryComponent } from './components/salary/salary.component';
import { CreatesalaryComponent } from './components/salary/createsalary/createsalary.component';
=======
import { AlimentoComponent } from './components/alimento/alimento.component';
import { CreateAlimentoComponent } from './components/alimento/create-alimento/create-alimento.component';
import { VacunaComponent } from './components/vacuna/vacuna.component';
import { CrearVacunaComponent } from './components/vacuna/crear-vacuna/crear-vacuna.component';
>>>>>>> 75c02caee17fbcc762ce171d9e3a00dd021965d9


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreatestaffComponent,
    StaffComponent,
<<<<<<< HEAD
    SalaryComponent,
    CreatesalaryComponent,
=======
    AlimentoComponent,
    CreateAlimentoComponent,
    VacunaComponent,
    CrearVacunaComponent,
>>>>>>> 75c02caee17fbcc762ce171d9e3a00dd021965d9
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
