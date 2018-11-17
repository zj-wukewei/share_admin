import {_get, _post} from '../../utils/post'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {types} from './constant'
import phase from '../../constants/phrase'

const urlPrefix = '/admin'

export function fetchUserList(options) {
    return {
      [THREE_PHASE]: {
        type: types.FETCH_USER_LIST,
        http: () => _post(`${urlPrefix}/users`, { body: options }),
        handleResponse: response => response
      }
    }
}

export function changeUserState(uId, deleted) {
  return {
    [THREE_PHASE]: {
      type: types.CHANGE_USER_STATE,
      http: () => _get(`${urlPrefix}/user/state/${uId}/${deleted}`)
    }
  }
}

export function fetchUserInfo(uId) {
  return {
    [THREE_PHASE]: {
      type: types.FETCH_USER_INFO,
      http: () => _get(`${urlPrefix}/user/${uId}`),
      handleResponse: response => response
    }
  }
}

export function updateUserInfo(userInfo) {
  return {
    [THREE_PHASE]: {
      type: types.POST_USER_INFO,
      http: () => _post(`${urlPrefix}/user/info`, {body: userInfo})
    }
  }
}


export function changeLocalUserInfo(userInfo) {
  return {
    type: types.FETCH_USER_INFO + phase.SUCCESS,
    data: userInfo
  }
}