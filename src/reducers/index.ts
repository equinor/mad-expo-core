import { combineReducers } from 'redux';
import departmentIdReducer from './departmentId';

const rootReducer = combineReducers({
  departmentId: departmentIdReducer,
});

export default rootReducer;
