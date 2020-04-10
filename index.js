const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  } else {
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        console.log(err);
        return;
      } else {
        fetchISSFlyOverTimes(coords, (err, result) => {
          if (err) {
            console.log(err);
            return;
          } else {
            console.log(result);
          }
        });
      }
    });
  }
});

