export const fetchCity = city => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${city.user_id}/cities/${city.id}`
  });
};

export const fetchCities = user_id => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${user_id}/cities/`
  });
};

export const deleteCity = city => {
  return $.ajax({
    method: "DELETE",
    url: `/api/users/${city.user_id}/cities/${city.id}`
  });
};

export const updateCity = city => {
  return $.ajax({
    method: "PATCH",
    url: `/api/users/${city.user_id}/cities/${city.id}`,
    data: {city}
  });
};

export const addCity = city => {
  return $.ajax({
    method: "POST",
    url: `/api/users/${city.user_id}/cities/`,
    data: {city}
  });
};
