import { createAction, props } from "@ngrx/store";
import  { Employee } from '../model/Employee';

export const LOAD_EMPLOYEES = 'GetAll Employees'
export const LOAD_EMPLOYEES_SUCCESS = 'GetAll Employees Success'
export const LOAD_EMPLOYEES_FAILURE = 'GetAll Employees Failure'

export const DELETE_EMPLOYEE = '[Employee] delete'
export const DELETE_EMPLOYEE_SUCCESS = '[Employee] delete success'

export const ADD_EMPLOYEE = '[employee] add'
export const ADD_EMPLOYEE_SUCCESS = '[employee] add succ'

export const UPDATE_EMPLOYEE = '[employee] update'
export const UPDATE_EMPLOYEE_SUCCESS = '[employee] update succ'

export const GET_EMPLOYEE = '[employee] get employee'

export const loadEmployees = createAction(LOAD_EMPLOYEES)
export const loadEmployeesSuccess = createAction(LOAD_EMPLOYEES_SUCCESS,  props<{ list: Employee[] }>())
export const loadEmployeesFailure = createAction(LOAD_EMPLOYEES_FAILURE, props<{errorMessage: string}>())

export const deleteEmployee = createAction(DELETE_EMPLOYEE,props<{empId:number}>())
export const deleteEmployeeSucces = createAction(DELETE_EMPLOYEE_SUCCESS, props<{ empId:number }>())


export const addEmployee = createAction(ADD_EMPLOYEE,props<{data:Employee}>())
export const addEmployeeSucess = createAction(ADD_EMPLOYEE_SUCCESS, props<{ data:Employee }>())

export const updateEmployee = createAction(UPDATE_EMPLOYEE,props<{data:Employee}>())
export const updateEmployeeSuccess = createAction(UPDATE_EMPLOYEE_SUCCESS, props<{ data:Employee }>())

export const getEmployee = createAction(GET_EMPLOYEE,props<{empId:number}>())

export const emptyAction = createAction('empty')