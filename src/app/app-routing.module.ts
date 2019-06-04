import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffComponent } from './components/staff/staff.component';
import { CreatestaffComponent } from './components/staff/createstaff/createstaff.component';
<<<<<<< HEAD
import { SalaryComponent } from './components/salary/salary.component';
=======
import { AlimentoComponent } from  './components/alimento/alimento.component';
import { VacunaComponent } from  './components/vacuna/vacuna.component';
>>>>>>> 75c02caee17fbcc762ce171d9e3a00dd021965d9

const routes: Routes = [

  { path: '', redirectTo: '/personal', pathMatch: 'full' },
  {path: 'personal', component: StaffComponent},
  {path: 'crear', component: CreatestaffComponent},
<<<<<<< HEAD
  {path: 'salario', component: SalaryComponent},
  
=======
  {path: 'alimento', component: AlimentoComponent},
  {path: 'vacuna', component: VacunaComponent},  
>>>>>>> 75c02caee17fbcc762ce171d9e3a00dd021965d9
  {path: '**', pathMatch: 'full', redirectTo: ''},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
