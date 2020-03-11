import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EmployeesModule } from '../employees.module';
import { EmployeeService } from 'src/app/employee.service';
import { NgForm } from '@angular/forms'; 
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  modalRef: BsModalRef;
  employee: Employee = new Employee();
  employees: any;
  editemployee: any;
  id = {'id' : ''};
  model:any = {};
  datatable: any

  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";  
  isValidFormSubmitted = false; 

  @ViewChild('dttable') dttable;
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  constructor(private modalService: BsModalService, private empService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }
  ngAfterViewInit() {
    console.log("afterinit");
    setTimeout(() => {
      this.datatable = $(this.dttable.nativeElement);
      this.datatable.DataTable();
    }, 1000);
  }

  onSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;  
    if (form.invalid) {  
       return;  
    } else {
      this.empService.post(this.employee).subscribe(res => {
        this.modalRef.hide();
        this.getEmployees();
        console.log(res);
        this.isValidFormSubmitted = true;  
        form.resetForm(); 
      },error => {
        console.log(error);
      })
    }
  }

  getEmployees() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };

    this.empService.get().subscribe(res => {
      this.employees = res;
      this.dtTrigger.next();
    },error => {
      console.log(error);
    })
  }

  onUpdate(){
    this.empService.update(this.editemployee).subscribe(res => {
      this.modalRef.hide();
      this.getEmployees();
    },error => {
      console.log(error);
    })
  }

  deleteEmp() {
    this.empService.delete(this.id).subscribe(res => {
      this.modalRef.hide();
      this.getEmployees();
    },error => {
      console.log(error);
    })
  }

  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  openModalEdit(template: TemplateRef<any>,emp ) {
    this.modalRef = this.modalService.show(template);
    this.editemployee = emp; 
  }

  openModalDelete (template: TemplateRef<any>,id ) {
    this.id = id;
    this.modalRef = this.modalService.show(template);
  }


}

class Employee {
  name: string;
  phone: string;
  city: string;
  address1: string;
  address2:string;
  postal_code:string
}