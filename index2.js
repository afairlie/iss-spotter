const { nextISSTimesForMyLocation , printPassTimes } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch(err => console.log(err));