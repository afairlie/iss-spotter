const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = (unparsedIP) => {
  const parsedIP = JSON.parse(unparsedIP).ip;
  return request(`https://ipvigilante.com/${parsedIP}`);
}

const fetchISSFlyOverTimes = (coords) => {
  const parsedCoords = JSON.parse(coords).data; 
  return request(`http://api.open-notify.org/iss-pass.json?lat=${parsedCoords.latitude}&lon=${parsedCoords.longitude}`);
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
}

const printPassTimes = (passTimes) => {
  for (let pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}

module.exports = { nextISSTimesForMyLocation, printPassTimes };