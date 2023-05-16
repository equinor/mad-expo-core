// src/actions/departmentId.js

export const SET_DEPARTMENT_ID = 'SET_DEPARTMENT_ID';

export function setDepartmentId(departmentId) {
  return {
    type: SET_DEPARTMENT_ID,
    payload: departmentId,
  };
}
