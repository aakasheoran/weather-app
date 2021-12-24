const fetch = require('node-fetch');

const geocode = async (loc) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(loc)}.json?access_token=${process.env.MAPBOX_TOKEN}`;
  const res = await fetch(url);
  try {
    const { features } = await res.json();
    if (!features || features.length === 0) {
      return { errorMsg: 'Could not get coordinates for this location' };
    } 
    const long = features[0].center[0];
    const lat = features[0].center[1];
    const placeName = features[0].place_name;
    return { long, lat, placeName, errorMsg: '' };
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = geocode;
 