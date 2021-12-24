const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const hbs = require('hbs');

const weatherController = require('./controllers/weather-controller');

dotenv.config();
const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicDirPath));

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Aakash'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Aakash'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    message: 'God bless you'
  })
});

app.get('/weather', weatherController);

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: '404 - Requested help page not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: '404 - Page Not Found'
  })
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
});