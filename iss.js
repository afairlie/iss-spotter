/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      callback(null, JSON.parse(body).ip);
    }
  });
};

const fetchCoordsByIP = (IP, callback) => {
  request(`https://ipvigilante.com/${IP}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const { latitude, longitude } = JSON.parse(body).data;
      callback(null, {latitude, longitude});
    }
  });
};

const fetchISSFlyOverTimes = (coordinates, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=LAT&lon=LON`, (err, response, body)=> {
    console.log(body);
  })
}

fetchISSFlyOverTimes()

module.exports = { fetchMyIP, fetchCoordsByIP };