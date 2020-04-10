const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  } else {
    fetchCoordsByIP(ip, (err, data) => {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log(data);
      }
    });
  }
});

