import { _post } from '../../utils/post'
import { THREE_PHASE } from '../../middlewares/request_3_phase'
import { types } from './constant'

const urlPrefix = '/admin'

const urlCommentPrefix = '/comment'

export function fetchFeedList(options) {
    return {
        [THREE_PHASE]: {
            type: types.FETCH_FEED_LIST,
            startParam: {
                pageNum: options.pageNum
            },
            http: () => _post(`${urlPrefix}/feed/list`, { body: options }),
            handleResponse: response => response
        }
    }
}

export function updateFeedStatus(options) {
    return {
        [THREE_PHASE]: {
            type: types.UPDATE_FEED_STATUS,
            http: () => _post(`${urlPrefix}/feed/status`, { body: options }),
            handleResponse: response => response
        }
    }
}

export function fetchCommentList(options) {
    return {
        [THREE_PHASE]: {
            type: types.FETCH_COMMENT_LIST,
            startParam: {
                pageNum: options.pageNum
            },
            http: () => _post(`${urlCommentPrefix}/list`, { body: options }),
            handleResponse: response => response
        }
    }
}