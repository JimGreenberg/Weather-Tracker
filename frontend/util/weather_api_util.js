const apiKey = '0c6887ca19ca753c65c470a739cbd8c6'; // please don't steal

export const fetchWeather = query => (
  $.ajax({
    method: "GET",
    url: `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=imperial`
  })
);

export const fetchBatchWeather = arr => {
  let query = arr.slice(0,20).join(',');//max 20 listings per batch request
  return $.ajax({
    method: "GET",
    url: `http://api.openweathermap.org/data/2.5/group?id=${query}&appid=${apiKey}&units=imperial`
  });
};
