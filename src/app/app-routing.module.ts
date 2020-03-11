import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesModule } from './employees/employees.module';


const routes: Routes = [
  {
    path:'',
    redirectTo:'',
    pathMatch: 'full' 
  },
  {    
  path:'employees',
  loadChildren: () => EmployeesModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
