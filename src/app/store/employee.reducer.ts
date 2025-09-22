import { createReducer, on } from "@ngrx/store";
import { employeeState } from "./employee.state";
import { addEmployeeSucess, deleteEmployeeSucces, getEmployee, loadEmployeesFailure, loadEmployeesSuccess, updateEmployeeSuccess } from "./employee.action";

const _employeeReducer = createReducer(employeeState,
    on(loadEmployeesSuccess, (state, action) => {
        return {
            ...state,
            list: action.list,
            errorMessage: ''
        }
    }),
    on(loadEmployeesFailure, (state, action) => {
        return {
            ...state,
            list: [],
            errorMessage: action.errorMessage
        }
    }),
     on(deleteEmployeeSucces, (state, action) => {
        const _newData = state.list.filter(o=> o.id!=action.empId)
        return {
            ...state,
            list: [],
            errorMessage: ''
        }
    }),
    on(addEmployeeSucess, (state, action) => {
        const _newdata = { ...action.data };
        return {
            ...state,
            list: [...state.list, _newdata],
            errormessage: ''
        }
    }),
    on(updateEmployeeSuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.data.id ? action.data : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(getEmployee, (state, action) => {
        let _newdata = state.list.find(o =>o.id === action.empId);
        if(_newdata==null){
            _newdata= state.empObj;
        }
        return {
            ...state,
            empObj:_newdata
        }
    })
);


export function employeeReducer(state: any, action: any) {
    return _employeeReducer(state, action);
}