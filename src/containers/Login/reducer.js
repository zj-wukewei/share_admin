import { fromJS } from 'immutable';
import { types } from './constant';
import * as phrase from '../../constants/phrase';
import { flagState } from '../../reducers/reducerUitls';

const initialState = {
  account: {},
  loginSuccess: false,
  logoutSuccess: false
}

export default function login(iState = initialState, action) {
  let nextIState = fromJS(iState);

  switch (action.type) {
    case types.DO_LOGIN + phrase.SUCCESS:
      nextIState = nextIState.set('account', action.data)
        .set('loginFailMsg', '')
      break;
    
    case types.DO_LOGIN + phrase.FAILURE:
      nextIState = nextIState.set('loginFailMsg', action.err.msg);
      break;
    default:
      break;
  }

  nextIState = flagState(nextIState, action)
    .handle(types.DO_LOGIN, 'loginSuccess')
    .handle(types.DO_LOGOUT, 'logoutSuccess')
    .get()

  return nextIState.toJS()
} 