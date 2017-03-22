const apiKey = '0c6887ca19ca753c65c470a739cbd8c6'; // please don't steal
// const apiKey =  'f816d7f39052e3a98b21952097a43076';
export const fetchWeather = query => {
  const type = !!parseInt(query) ? 'id' : 'q';
  return $.getJSON({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/weather?${type}=${query}&APPID=${apiKey}&units=imperial`
  });
};

export const fetchBatchWeather = query => {
  return $.getJSON({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/group?id=${query}&APPID=${apiKey}&units=imperial`
  });
};
