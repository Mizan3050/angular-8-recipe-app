import {User} from '../user.model';
import {AuthActions, AUTHENTICATE_SUCCESS, AUTHENTICATE_FAIL, LOGIN_START, LOGOUT, SIGN_UP_START, CLEAR_ERROR} from './auth.actions';

export interface State {
  user: User;
  authError;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(state: State = initialState, action: AuthActions) {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
      return {
        ...state,
        authError: null,
        loading: false,
        user
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        loading: false
      };
    case LOGIN_START:
    case SIGN_UP_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        authError: action.payload
      };
    case CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
}
