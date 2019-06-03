import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffComponent } from './components/staff/staff.component';
import { CreatestaffComponent } from './components/staff/createstaff/createstaff.component';

const routes: Routes = [

  { path: '', redirectTo: '/personal', pathMatch: 'full' },
  {path: 'personal', component: StaffComponent},
  {path: 'crear', component: CreatestaffComponent},
  {path: '**', pathMatch: 'full', redirectTo: ''},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
