import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../model/Employee';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CurrencyPipe, DatePipe } from '@angular/common'
import { Store } from '@ngrx/store';
import { deleteEmployee, loadEmployees } from '../../store/employee.action';
import { getEmployeeList } from '../../store/employee.selector';



@Component({
  selector: 'app-employee',
  imports: [MatCardModule, MatButtonModule, MatDialogModule,
    MatTableModule, CurrencyPipe, DatePipe
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit, OnDestroy {

  employeeList: Employee[] = [];
  dataTable!: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['id', 'name', 'role', 'doj', 'salary', 'action'];
  subscription= new Subscription();


  constructor(private dialog: MatDialog, private store: Store) {}


  ngOnInit(): void {
      this.getAllEmployees();
  }

  getAllEmployees() {
    this.store.dispatch(loadEmployees())
    this.store.select(getEmployeeList).subscribe((item)=> {
      this.employeeList = item;
      this.dataTable = new MatTableDataSource(this.employeeList)
    })
  }

  addEmployee() {
    this.openPopup(0);

  }

  deleteEmployee(empId: number) {
    if(confirm('Are you sure?')) {
      this.store.dispatch(deleteEmployee({empId: empId}))
      }
  }

  editEmployee(empId: number) {
    this.openPopup(empId);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  openPopup(empId: number) {
    this.dialog.open(AddEmployeeComponent, {
      width: '50%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        'code': empId
      }
    }).afterClosed().subscribe(o=>{
      this.getAllEmployees();
    });
  }
}
