import { combineReducers } from 'redux';

import login from '../containers/Login/reducer'; 

const rootReducer = combineReducers({
    login
});
  
export default rootReducer;