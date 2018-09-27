import { _post } from '../../utils/post';
import { THREE_PHASE } from '../../middlewares/request_3_phase';
import { types } from './constant';

const urlPrefix = '/user';

export function doLogin(options) {
    return {
      [THREE_PHASE]: {
        type: types.FETCH_USER_LIST,
        http: () => _post(`${urlPrefix}/users`, { body: options }),
        handleResponse: response => response
      }
    }
  }