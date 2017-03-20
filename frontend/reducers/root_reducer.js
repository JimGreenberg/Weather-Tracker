import {combineReducers} from 'redux';
import SessionReducer from './session_reducer';
import UsersReducer from './users_reducer';
import CitiesReducer from './cities_reducer';
import WeatherReducer from './weather_reducer';


const RootReducer = combineReducers({
  session: SessionReducer,
  user: UsersReducer,
  cities: CitiesReducer,
  weather: WeatherReducer
});

export default RootReducer;
