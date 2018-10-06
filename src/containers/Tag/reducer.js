import {fromJS} from 'immutable'
import {types} from './constant'
import {flagState} from '../../reducers/reducerUitls'

const initialState = {
  addCategorySuccess: false
}

export default function login(iState = initialState, action) {
  let nextIState = fromJS(iState)

  nextIState = flagState(nextIState, action)
    .handle(types.ADD_CATEGORY, 'addCategorySuccess')
    .get()

  return nextIState.toJS()
} 