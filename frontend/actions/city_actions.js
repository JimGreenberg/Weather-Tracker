import * as CityApiUtil from '../util/city_api_util';

export const RECEIVE_CITY = 'RECEIVE_CITY';
export const REMOVE_CITY = 'REMOVE_CITY';
export const RECEIVE_CITIES = 'RECEIVE_CITIES';

export const receiveCity = city => ({
  type: RECEIVE_CITY,
  city
});

export const removeCity = city => ({
  type: REMOVE_CITY,
  city
});

export const receiveCities = cities => ({
  type: RECEIVE_CITIES,
  cities
});

export const fetchCity = id => (
  dispatch => (CityApiUtil.fetchCity(id)
    .then(city => dispatch(receiveCity(city))))
);

export const deleteCity = id => (
  dispatch => (CityApiUtil.deleteCity(id)
    .then(city => dispatch(removeCity(city))))
);

export const updateCity = city => (
  dispatch => (CityApiUtil.updateCity(city)
    .then(city => dispatch(receiveCity(city))))
);

export const addCity = city => (
  dispatch => (CityApiUtil.addCity(city)
    .then(city => dispatch(receiveCity(city))))
);

export const fetchCities = user_id => (
  dispatch => (CityApiUtil.fetchCities(user_id)
    .then(cities => dispatch(receiveCities(cities))))
);
