import { LIST_USERS, USER_LOGIN } from './actions';
import { INITIAL_STATE } from './IAppState';

export function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LIST_USERS:
      return Object.assign({}, state, { users: action.payload });
      case USER_LOGIN:
      return Object.assign({}, state, { auth: action.payload });
    default:
      return state;
  }
}
