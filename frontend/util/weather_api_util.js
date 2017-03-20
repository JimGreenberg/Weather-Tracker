export const fetchWeather = query => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${city.user_id}/cities/${city.id}`
  });
};
