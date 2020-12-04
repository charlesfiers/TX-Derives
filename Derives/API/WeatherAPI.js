const WEATHER_TOKEN = "ceb4721bd6f96a27d235dcf63f627193"

const WEATHER_TOKEN2 = "8b154e655b6e2d24d86ede9d844a2f4c"

export function getWeatherWithCity (city) {
    const url = "http://api.weatherstack.com/current?access_key=" + WEATHER_TOKEN + "&query=" + city
    return fetch(url)
    .then(response => response.json())
    .catch((error) => console.error(error))
}

export function getWeatherWitLatLon (lat, lon) {
  const url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + WEATHER_TOKEN2 + "&units=metric"
  return fetch(url)
  .then(response => response.json())
  .catch((error) => console.error(error))
}
