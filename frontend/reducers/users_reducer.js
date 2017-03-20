import merge from 'lodash/merge';
import {RECEIVE_USER} from '../actions/user_actions';

const UsersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_USER:
      return merge({}, oldState, action.user);
    default:
      return oldState;
  }
};

export default UsersReducer;
