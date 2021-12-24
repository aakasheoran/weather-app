const weatherForm = document.querySelector('form.location-form');
const searchInput = weatherForm.querySelector('input');
const dataState = document.querySelector('p#data-state');
const message = document.querySelector('p#message');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  dataState.innerText = 'Loading...';
  message.innerText = '';
  const query = searchInput.value;
  fetch(`/weather?address=${query}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        message.innerText = data.error;
      } else {
        message.innerText = data.forecast;
      }
      dataState.innerText = '';
    });
  });
});