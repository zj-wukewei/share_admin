import {fromJS} from 'immutable'

import phase from '../constants/phrase'

const data = (fetchType, defaultData) => {
  const initValue = {
    loading: false,
    loaded: false,
    data: defaultData || null
  }

  return (iState = fromJS(initValue), action) => {
    let nextIState = iState

    switch (action.type) {
      case fetchType + phase.START:
        nextIState = nextIState.set('loaded', false).set('loading', true)
        break

      case fetchType + phase.SUCCESS:
        nextIState = nextIState.set('loaded', true).set('loading', false).set('data', action.data)
        break

      case fetchType + phase.FAILURE:
        nextIState = nextIState.set('loaded', false).set('loading', false).set('data', defaultData || null)
        break

      default:
        break
    }

    return nextIState
  }
}

export default data
