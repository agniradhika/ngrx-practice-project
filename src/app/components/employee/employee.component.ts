import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../model/Employee';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-employee',
  imports: [MatCardModule, MatButtonModule, MatDialogModule,
    MatTableModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit, OnDestroy {

  employeeList: Employee[] = [];
  dataTable!: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['id', 'name', 'role', 'doj', 'salary', 'action'];
  subscription= new Subscription();

  constructor(private dialog: MatDialog, private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
      
  }

  getAllEmployees() {
    let sub = this.employeeService.GetAll().subscribe(item => {
      this.employeeList = item;
      this.dataTable = new MatTableDataSource(this.employeeList);
    })
    this.subscription.add(sub);
  }
  addEmployee() {
    this.dialog.open(AddEmployeeComponent, {
      width: '50%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms'
    });

  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
