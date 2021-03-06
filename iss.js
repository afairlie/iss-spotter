const request = require('request');

const fetchMyIP = (callback) => {

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

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body)=> {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyover. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const passes = JSON.parse(body).response;
      callback(null, passes);
    }
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((err, ip) => {
    if (err) {
      callback(err, null);
      return;
    } else {
      fetchCoordsByIP(ip, (err, coords) => {
        if (err) {
          callback(err, null);
          return;
        } else {
          fetchISSFlyOverTimes(coords, (err, result) => {
            if (err) {
              callback(err, null);
              return;
            } else {
              callback(null, result);
            }
          });
        }
      });
    }
  });
}

module.exports = { nextISSTimesForMyLocation };