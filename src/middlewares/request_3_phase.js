import * as phase from '../constants/phrase';

export const THREE_PHASE = Symbol('THREE_PHASE');

export default ({ dispatch, getState }) => next => action => {
  const threePhase = action[THREE_PHASE]
  if (typeof threePhase === 'undefined') {
    return next(action)
  }
  const type = threePhase.type
  const startParam = threePhase.startParam
  next({ type: type + phase.START, ...startParam })

  threePhase.http(getState()).then(handleResponseData, handleError)

  function getDataReducerNeed(response) {
    if (!threePhase.handleResponse) {
      return {}
    }
    return threePhase.handleResponse(response)
  }

  function handleResponseData(response) {
    next({ type: type + phase.SUCCESS, data: getDataReducerNeed(response) })
  }

  function handleError(err) {
    console.log('err', err)
    next({ type: type + phase.FAILURE, err })
  }
}
