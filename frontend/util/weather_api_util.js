const apiKey = '0c6887ca19ca753c65c470a739cbd8c6'; // please don't steal

export const fetchWeather = query => (
  $.ajax({
    method: "GET",
    url: `api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=imperial`
  })
);

export const fetchBatchWeather = array => {
  let query = array.slice(0,20).split(',');//max 20 listings per batch request
  return $.ajax({
    method: "GET",
    url: `api.openweathermap.org/data/2.5/group?ids=${query}&appid=${apiKey}&units=imperial`
  });
};
