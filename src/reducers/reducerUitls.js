import * as phase from '../constants/phrase';

export function handleClear(action, targetType, key, iState) {
  if (action.type == phase.CLEAR + targetType) {
    return iState.set(key, false)
  }
  return iState
}

export function handleFlag(action, targetType, key, iState) {
  if (action.type == targetType + phase.SUCCESS) {
    return iState.set(key, true)
  }
  if (action.type == phase.CLEAR + targetType) {
    return iState.set(key, false)
  }
  return iState
}

export function flagState(iState, action) {
  let nextIState = iState
  let chain = {
    get: () => nextIState,
    handle: (type, key) => {
      if (action.type == type + phase.START) {
        nextIState = iState.set(key, false)
      }
      if (action.type == type + phase.SUCCESS) {
        nextIState = iState.set(key, true)
      }
      return chain
    }
  }

  return chain
}
