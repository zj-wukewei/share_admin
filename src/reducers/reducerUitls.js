import * as phase from '../constants/phrase'
import {fromJS} from 'immutable'

export function handleClear(action, targetType, key, iState) {
  if (action.type === phase.CLEAR + targetType) {
    return iState.set(key, false)
  }
  return iState
}

export function handleFlag(action, targetType, key, iState) {
  if (action.type === targetType + phase.SUCCESS) {
    return iState.set(key, true)
  }
  if (action.type === phase.CLEAR + targetType) {
    return iState.set(key, false)
  }
  return iState
}

export function flagState(iState, action) {
  let nextIState = iState
  let chain = {
    get: () => nextIState,
    handle: (type, key) => {
      if (action.type === type + phase.START) {
        nextIState = iState.set(key, false).set('loading', true)

      }
      if (action.type === type + phase.SUCCESS) {
        nextIState = iState.set(key, true).set('loading', false)
      }

      if (action.type === type + phase.FAILURE) {
        nextIState = iState.set('loading', false)
      }
      return chain
    }
  }

  return chain
}

/**
 * 使用immutable，将reducer的state封装为iState，不可变数据
 * @param reducerFun 原reducer函数
 * @return 封装后的reducer函数
 */
export const wrapReducerState = reducerFun => (state, action) => {
  const iState = fromJS(state)
  return unwrapReducerState(state, iState, reducerFun(iState, action))
}

function unwrapReducerState(state, iState, nextIState) {
  if (iState === nextIState) {
    return state
  }
  return nextIState.toJS()
}
