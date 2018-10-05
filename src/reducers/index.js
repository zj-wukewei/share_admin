import {combineReducers} from 'redux'

import {wrapReducerState} from './reducerUitls'
import {types as UserTypes} from '../containers/User/constant'
import data from './data.reducer'

import login from '../containers/Login/reducer'

const rootReducer = combineReducers({
  login,
  userList: wrapReducerState(data(UserTypes.FETCH_USER_LIST))
})

export default rootReducer