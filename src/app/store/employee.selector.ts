import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployeeModel } from "./employee.model";

const getEmployeeState = createFeatureSelector<EmployeeModel>('employee')

export const getEmployeeList = createSelector(getEmployeeState, (state) => {
    return state.list;
})

export const selectEmployee=createSelector(getEmployeeState,(state)=>{
    return state.empObj;
})