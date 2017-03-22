// const apiKey =  'cd5d3b9fae8549724d78fe69cc25516d';
const apiKey =  'bcb83c4b54aee8418983c2aff3073b3b';
export const fetchWeather = query => {
  const type = !!parseInt(query) ? 'id' : 'q';
  return $.getJSON({
    method: "GET",
    url: `http://api.openweathermap.org/data/2.5/weather?${type}=${query}&APPID=${apiKey}&units=imperial`
  });
};

export const fetchBatchWeather = query => {
  return $.getJSON({
    method: "GET",
    url: `http://api.openweathermap.org/data/2.5/group?id=${query}&APPID=${apiKey}&units=imperial`
  });
};
