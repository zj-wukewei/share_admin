import {_post} from '../../utils/post'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {types} from './constant'

const urlPrefix = '/admin'

export function fetchCategoryList(options) {
  return {
    [THREE_PHASE]: {
      type: types.FETCH_CATEGORY_LIST,
      http: () => _post(`${urlPrefix}/category`, {body: options}),
      handleResponse: response => response
    }
  }
}

export function addCategory(options) {
  return {
    [THREE_PHASE]: {
      type: types.ADD_CATEGORY,
      http: () => _post(`${urlPrefix}/category/add`, {body: options}),
      handleResponse: response => response
    }
  }
}