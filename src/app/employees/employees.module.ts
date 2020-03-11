import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeListComponent } from '../employees/employee-list/employee-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';    
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [EmployeeListComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    FormsModule,
    ModalModule.forRoot()
  ]
})
export class EmployeesModule { }
