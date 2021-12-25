const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const weatherController = async (req, res) => {
  const city = req.query.address; 
  if (!city) {
    return res.send({
      error: 'No address provided'
    })
  }
  const geocodeResult = await geocode(city);
  const { long, lat, placeName, errorMsg } = geocodeResult;
  if (!errorMsg) {
    const unit = 'ca';
    const options = {
      unitToUse: unit || ''
    }
    const data = await forecast(lat, long, placeName, options);
    res.send({
      forecast: data,
      location: city,
      address: placeName
    });
  } else {
    res.send({
      error: errorMsg
    });
  }
};

module.exports = weatherController;