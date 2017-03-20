import {RECEIVE_WEATHER, RECEIVE_BATCH_WEATHER} from '../actions/weather_actions';
import merge from 'lodash/merge';

const WeatherReducer = (oldState = {}, action) => {

  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_BATCH_WEATHER:
      return merge({}, oldState, action.datas);
    case RECEIVE_WEATHER:
      return merge({}, oldState, {[action.data.id]: action.data});
    default:
      return oldState;
  }
};

export default WeatherReducer;
