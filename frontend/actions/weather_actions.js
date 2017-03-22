import * as WeatherApiUtil from '../util/weather_api_util';

export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const RECEIVE_BATCH_WEATHER = 'RECEIVE_BATCH_WEATHER';

export const receiveWeather = data => ({
  type: RECEIVE_WEATHER,
  data
});

export const receiveBatchWeather = datas => ({
  type: RECEIVE_BATCH_WEATHER,
  datas
});

export const fetchWeather = query => (
  dispatch => (WeatherApiUtil.fetchWeather(query)
    .then(data => dispatch(receiveWeather(data))))
);

export const fetchBatchWeather = query => (
  dispatch => (WeatherApiUtil.fetchBatchWeather(query)
    .then(datas => dispatch(receiveBatchWeather(datas))))
);
