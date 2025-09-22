import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EmployeeService } from "../services/employee.service";
import { addEmployee, addEmployeeSucess, deleteEmployee, deleteEmployeeSucces, emptyAction, loadEmployees, loadEmployeesFailure, loadEmployeesSuccess, updateEmployee, updateEmployeeSuccess } from "./employee.action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class employeeEffect {
    //constructor(private actions$: Actions, private employeeService: EmployeeService) {}
    actions$ = inject(Actions);
    employeeService = inject(EmployeeService)
    toastr = inject(ToastrService)
    _loadEmployee = createEffect(()=>{
         return this.actions$.pipe(
            ofType(loadEmployees),
            exhaustMap((action) => {
                return this.employeeService.GetAll().pipe(
                    map((data) => {
                        return loadEmployeesSuccess({ list: data });
                    }),
                    catchError((error) => {
                        return of(loadEmployeesFailure({ errorMessage: error.errorMessage }));
                    })
                );
            })
        );
    });
    
      _deleteEmployee = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteEmployee),
            switchMap((action) => {
                return this.employeeService.Delete(action.empId).pipe(
                    switchMap((data) => {
                        return of(deleteEmployeeSucces({ empId: action.empId }),
                        this.Showalert('Deleted Successfully.','pass')
                    )
                    }),
                    catchError((err) => of(this.Showalert(err.message,'fail')))
                )
            })
        )
    )
 _addEmployee = createEffect(() =>
        this.actions$.pipe(
            ofType(addEmployee),
            switchMap((action) => {
                return this.employeeService.Create(action.data).pipe(
                    switchMap((data) => {
                        return of(addEmployeeSucess({ data: action.data }),
                        this.Showalert('Created Successfully.','pass')
                    )
                    }),
                    catchError((err) => of(this.Showalert(err.message,'fail')))
                )
            })
        )
    )

    _updateEmployee = createEffect(() =>
        this.actions$.pipe(
            ofType(updateEmployee),
            switchMap((action) => {
                return this.employeeService.Update(action.data).pipe(
                    switchMap((data) => {
                        return of(updateEmployeeSuccess({ data: action.data }),
                        this.Showalert('Updated Successfully.','pass')
                    )
                    }),
                    catchError((err) => of(this.Showalert(err.message,'fail')))
                )
            })
        )
    )
     Showalert(message: string, response: string) {
        if (response == 'pass') {
            this.toastr.success(message);
        }else{
            this.toastr.error(message);
        }
        return emptyAction();
    }

        
}