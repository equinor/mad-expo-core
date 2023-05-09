// src/reducers/departmentId.js

const initialState = null;

export default function departmentIdReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_DEPARTMENT_ID':
      return action.payload;
    default:
      return state;
  }
}
