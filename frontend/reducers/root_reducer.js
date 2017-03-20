import {combineReducers} from 'redux';
import SessionReducer from './session_reducer';
import UsersReducer from './users_reducer';
import CitiesReducer from './cities_reducer';


const RootReducer = combineReducers({
  session: SessionReducer,
  user: UsersReducer,
  cities: CitiesReducer
});

export default RootReducer;
