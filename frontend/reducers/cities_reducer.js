import {RECEIVE_CITY, RECEIVE_CITIES, REMOVE_CITY} from '../actions/city_actions';
import merge from 'lodash/merge';

const CitiesReducer = (oldState = {}, action) => {

  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_CITIES:
      return merge({}, action.cities);
    case RECEIVE_CITY:
      return merge({}, oldState, {[action.city.api_code]: action.city});
    case REMOVE_CITY:
      let newState = merge({}, oldState);
      delete newState[action.city.api_code];
      return newState;
    default:
      return oldState;
  }
};

export default CitiesReducer;
