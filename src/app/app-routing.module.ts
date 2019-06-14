import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffComponent } from './components/staff/staff.component';
import { CreatestaffComponent } from './components/staff/createstaff/createstaff.component';
import { SalaryComponent } from './components/salary/salary.component';
import { AlimentoComponent } from  './components/alimento/alimento.component';
import { VacunaComponent } from  './components/vacuna/vacuna.component';
<<<<<<< HEAD
import { GraphifComponent } from './components/graphif/graphif.component';
=======
import { GraphicComponent } from './components/graphic/graphic.component';
>>>>>>> 6ffeb32011d563250223b5578d06408736a73a2f

const routes: Routes = [

  { path: '', redirectTo: '/personal', pathMatch: 'full' },
  {path: 'personal', component: StaffComponent},
  {path: 'crear', component: CreatestaffComponent},
  {path: 'salario', component: SalaryComponent},
<<<<<<< HEAD
  {path: 'graficas', component: GraphifComponent},
  
=======
  {path: 'grafico', component: GraphicComponent},
>>>>>>> 6ffeb32011d563250223b5578d06408736a73a2f
  {path: 'alimento', component: AlimentoComponent},
  {path: 'vacuna', component: VacunaComponent},
  {path: '**', pathMatch: 'full', redirectTo: ''},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
