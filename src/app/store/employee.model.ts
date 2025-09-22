import { Employee } from "../model/Employee";

export interface EmployeeModel {
    empObj: Employee;
    list: Employee[],
    errorMessage: string
}