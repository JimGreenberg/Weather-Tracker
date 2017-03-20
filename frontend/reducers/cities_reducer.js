import {RECEIVE_CITY, RECEIVE_CITIES, REMOVE_CITY} from '../actions/city_actions';
import merge from 'lodash/merge';

const CitiesReducer = (oldState = {}, action) => {

  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_CITIES:
      return merge({}, oldState, action.cities);
    case RECEIVE_CITY:
      return merge({}, oldState, {[action.city.id]: action.city});
    case REMOVE_CITY:
      let newState = merge({}, oldState);
      delete newState[action.city.id];
      return newState;
    default:
      return oldState;
  }
};

export default CitiesReducer;
