import * as APIUtil from '../util/session_api_util';
import {hashHistory} from 'react-router';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveCurrentUser = currentUser => {

  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_ERRORS,
    errors
  };
};

export const signIn = user => {
  return (dispatch) => {
    return APIUtil.signIn(user)
      .then(
        user => dispatch(receiveCurrentUser(user)),
        err => dispatch(receiveErrors(err.responseJSON))
      );
  };
};

export const signOut = () => {
  return (dispatch) => {
    return APIUtil.signOut()
      .then(hashHistory.push('/'))
      .then(
        user => dispatch(receiveCurrentUser(null)),
        err => dispatch(receiveErrors(err.responseJSON))
      );
  };
};

export const signUp = user => {
  return (dispatch) => {
    return APIUtil.signUp(user)
      .then(
        user => dispatch(receiveCurrentUser(user)),
        err => dispatch(receiveErrors(err.responseJSON))
      );
  };
};
