const fetch = require('node-fetch');

const getWeather = async (lat, long, place, { unitToUse: unit = ''} = {}) => {
  const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${long}?units=${unit}`;
  const res = await fetch(url);
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
module.exports = getWeather;
