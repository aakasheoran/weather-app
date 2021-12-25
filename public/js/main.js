const weatherForm = document.querySelector('form.location-form');
const searchInput = weatherForm.querySelector('input');
const dataState = document.querySelector('p#data-state');
const message = document.querySelector('p#message');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  dataState.innerText = 'Loading...';
  message.innerText = '';
  const query = searchInput.value;
  fetch(`/api/weather?address=${query}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        message.innerText = data.error;
      } else {
        const text = `${data.address}\n${data.forecast.daily.data[0].summary} It is currently ${data.forecast.currently.temperature}°C.\nThe high today is ${data.forecast.daily.data[0].temperatureHigh}°C with a low of ${data.forecast.daily.data[0].temperatureLow}°C.\nThere is ${Math.round(data.forecast.currently.humidity)}% chance of rain.`;
        message.innerText = text;
      }
      dataState.innerText = '';
    });
  });
});