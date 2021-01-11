const WEATHER_TOKEN = "ceb4721bd6f96a27d235dcf63f627193"

const WEATHER_TOKEN2 = "8b154e655b6e2d24d86ede9d844a2f4c"

/* === API récupérant la météo avec les coords === */
export function getWeatherWitLatLon (lat, lon) {
  const url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + WEATHER_TOKEN2 + "&units=metric"
  return fetch(url)
  .then(response => response.json())
  .catch((error) => console.error(error))
}

/* === API récupérant la météo également mais nombre de requêtes limitées donc on a préféré la première === */
export function getWeatherWithCity (city) {
    const url = "http://api.weatherstack.com/current?access_key=" + WEATHER_TOKEN + "&query=" + city
    return fetch(url)
    .then(response => response.json())
    .catch((error) => console.error(error))
}
