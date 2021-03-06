import { combineReducers } from 'redux'

import { wrapReducerState } from './reducerUitls'
import { initUserInfo, types as UserTypes } from '../containers/User/constant'
import { types as CategoryTypes } from '../containers/Tag/constant'
import { types as FeedTypes } from '../containers/Home/constant'
import data from './data.reducer'
import pageList from './page-list.reducer'

import login from '../containers/Login/reducer'
import user from '../containers/User/reducer'
import category from '../containers/Tag/reducer'
import feed from '../containers/Home/reducer'

const rootReducer = combineReducers({
  login,
  category,
  user,
  feed,
  commentList: wrapReducerState(pageList(FeedTypes.FETCH_COMMENT_LIST)),
  feedList: wrapReducerState(pageList(FeedTypes.FETCH_FEED_LIST)),
  userList: wrapReducerState(data(UserTypes.FETCH_USER_LIST)),
  userInfo: wrapReducerState(data(UserTypes.FETCH_USER_INFO, initUserInfo)),
  categoryList: wrapReducerState(data(CategoryTypes.FETCH_CATEGORY_LIST))
})

export default rootReducer