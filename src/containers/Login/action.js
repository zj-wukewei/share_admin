import { _post } from '../../utils/post';
import { THREE_PHASE } from '../../middlewares/request_3_phase';
import { types } from './constant';

const urlPrefix = '/user';

export function doLogin(options) {
    return {
      [THREE_PHASE]: {
        type: types.DO_LOGIN,
        http: () => _post(`${urlPrefix}/login`, { body: options }),
        handleResponse: response => response
      }
    }
  }