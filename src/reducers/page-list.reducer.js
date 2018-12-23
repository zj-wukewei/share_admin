import { fromJS, List } from 'immutable'

import phase from '../constants/phrase'
import { PageNum } from '../constants/constant';


export function updateList(curIState, callback) {
  return curIState.update('list', list => callback(list))
}


const data = (fetchType, defaultData) => {
  const initValue = {
    loading: false,
    loaded: false,
    hasMore: false,
    total: 0,
    data: defaultData || null
  }

  return (iState = fromJS(initValue), action) => {
    let nextIState = iState

    switch (action.type) {
      case fetchType + phase.START:
        nextIState = nextIState.set('loaded', false).set('loading', true)
        if (action.pageNum == PageNum) {
          nextIState = nextIState.set('list', List([]))
        }
        break

      case fetchType + phase.SUCCESS:
        let { total, hasMore } = action.data
        nextIState = nextIState.set('loaded', true).set('loading', false).set('hasMore', hasMore).set('total', total)
        nextIState = updateList(nextIState, list => list.concat(action.data.list))
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
