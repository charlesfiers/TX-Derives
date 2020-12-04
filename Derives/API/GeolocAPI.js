const API_GOOGLE_TOKEN = "0cca89bd096975ad759a90c2c8f7d674";

export function getLocWithLatLonGoogle (lat, lon) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&key=' + API_GOOGLE_TOKEN
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getLocWithLatLonGouv (lat, lon) {
    const url = 'https://geo.api.gouv.fr/communes?lat=' + lat + '&lon=' + lon + '&format=json&fields=surface,population'
    return fetch(url)
    .then(response => response.json())
    .catch((error) => console.error(error))
}
