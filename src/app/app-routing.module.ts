import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffComponent } from './components/staff/staff.component';
import { CreatestaffComponent } from './components/staff/createstaff/createstaff.component';
import { SalaryComponent } from './components/salary/salary.component';
import { AlimentoComponent } from  './components/alimento/alimento.component';
import { VacunaComponent } from  './components/vacuna/vacuna.component';
import { GraphifComponent } from './components/graphif/graphif.component';
import { LoginComponent } from './components/login/login.component';

import { EditStaffComponent } from './components/staff/editstaff/editstaff.component';
import { CrearVacunaComponent } from './components/vacuna/crear-vacuna/crear-vacuna.component';

const routes: Routes = [

  { path: '', redirectTo: '/grafico', pathMatch: 'full' }, 
  {path: 'login', component: LoginComponent},
  {path: 'personal', component: StaffComponent},
  {path: 'crear-personal', component: CreatestaffComponent},
  {path: 'editar-personal/:id', component: EditStaffComponent},
  {path: 'crear-vacuna', component: CrearVacunaComponent},
  {path: 'salario', component: SalaryComponent},
  {path: 'grafico', component: GraphifComponent},
  {path: 'alimento', component: AlimentoComponent},
  {path: 'vacuna', component: VacunaComponent},  

  {path: '**', pathMatch: 'full', redirectTo: ''},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
