import {combineReducers} from 'redux'

import {wrapReducerState} from './reducerUitls'
import {types as UserTypes} from '../containers/User/constant'
import {types as CategoryTypes} from '../containers/Tag/constant'
import data from './data.reducer'

import login from '../containers/Login/reducer'
import category from '../containers/Tag/reducer'

const rootReducer = combineReducers({
  login,
  category,
  userList: wrapReducerState(data(UserTypes.FETCH_USER_LIST)),
  categoryList: wrapReducerState(data(CategoryTypes.FETCH_CATEGORY_LIST))
})

export default rootReducer