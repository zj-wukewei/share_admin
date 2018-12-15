import { fromJS } from 'immutable';
import { types } from './constant';
import * as phrase from '../../constants/phrase';
import { flagState } from '../../reducers/reducerUitls';
import UserManager from '../../utils/userManager';

const initialState = {
  account: {},
  loginSuccess: false,
  logoutSuccess: false,
  information: {}
}

export default function login(iState = initialState, action) {
  let nextIState = fromJS(iState);

  switch (action.type) {
    case types.DO_LOGIN + phrase.SUCCESS:
      UserManager.set(action.data)
      nextIState = nextIState.set('account', action.data)
      break;

    case types.DO_LOGIN + phrase.FAILURE:
      nextIState = nextIState.set('loginFailMsg', action.err.msg);
      break;

    case types.INFORMATION + phrase.SUCCESS:
      nextIState = nextIState.set('information', action.data)
      break

    default:
      break;
  }

  nextIState = flagState(nextIState, action)
    .handle(types.DO_LOGIN, 'loginSuccess')
    .handle(types.DO_LOGOUT, 'logoutSuccess')
    .get()

  return nextIState.toJS()
} 