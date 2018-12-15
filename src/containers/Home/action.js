import { _get, _post } from '../../utils/post'
import { THREE_PHASE } from '../../middlewares/request_3_phase'
import { types } from './constant'
import phase from '../../constants/phrase'

const urlPrefix = '/feed'

export function fetchFeedList(options) {
    return {
        [THREE_PHASE]: {
            type: types.FETCH_FEED_LIST,
            http: () => _post(`${urlPrefix}/list`, { body: options }),
            handleResponse: response => response
        }
    }
}