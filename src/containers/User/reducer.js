import {fromJS} from 'immutable'
import {types} from './constant'
import {flagState} from '../../reducers/reducerUitls'

const initialState = {
  updateInfoSuccess: false
}

export default function users(iState = initialState, action) {
  let nextIState = fromJS(iState)
  nextIState = flagState(nextIState, action)
    .handle(types.POST_USER_INFO, 'updateInfoSuccess')
    .get()

  return nextIState.toJS()
} 