import { fromJS } from 'immutable'
import { types } from './constant'
import { flagState } from '../../reducers/reducerUitls'

const initialState = {
  updataFeedStatusSuccess: false
}

export default function login(iState = initialState, action) {
  let nextIState = fromJS(iState)

  nextIState = flagState(nextIState, action)
    .handle(types.UPDATE_FEED_STATUS, 'updataFeedStatusSuccess')
    .get()

  return nextIState.toJS()
} 