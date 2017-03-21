cities.each do |city|
  json.set! city.api_code do
    json.partial! 'api/cities/city', city: city
  end
end
