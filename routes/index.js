var express = require('express');
var router = express.Router();

const journeyModel = require('../models/journeys');
const userModel = require('../models/users');


//LOGIN
router.get("/", function (req, res, next) {
  res.render("login", { users: req.session.user });
});


//SEARCH
router.get('/search', function (req, res, next) {
  res.render('search');
});

//BOOKING
router.post('/booking', async function (req, res, next) {

  var date = new Date(req.body.date);

  var matchingJourneys = await journeyModel.find({
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: new Date(req.body.date),
  });

  if (matchingJourneys !== []) {
    res.render('booking', { matchingJourneys, date });
  } else {
    res.render('fail');
  }
});

//CARD
router.get('/addCard', async function (req, res, next) {
  if (!req.session.card) {
    req.session.card = []
  }

  var addedJourney = await journeyModel.findById(req.query.id);

  req.session.card.push(addedJourney);


  console.log(req.session.card);

  res.render('card', { card: req.session.card });
});

//LASTTRIPS
router.get('/lastTrips', function (req, res, next) {
  res.render('lastTrips');
});












// Remplissage de la base de donnée, une fois suffit

var city = ["Paris", "Marseille", "Nantes", "Lyon", "Rennes", "Melun", "Bordeaux", "Lille"]
var date = ["2018-11-20", "2018-11-21", "2018-11-22", "2018-11-23", "2018-11-24"]
router.get('/save', async function (req, res, next) {

  // How many journeys we want
  var count = 300

  // Save  ---------------------------------------------------
  for (var i = 0; i < count; i++) {

    departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
    arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

    if (departureCity != arrivalCity) {

      var newUser = new journeyModel({
        departure: departureCity,
        arrival: arrivalCity,
        date: date[Math.floor(Math.random() * Math.floor(date.length))],
        departureTime: Math.floor(Math.random() * Math.floor(23)) + ":00",
        price: Math.floor(Math.random() * Math.floor(125)) + 25,
      });

      await newUser.save();

    }

  }
  res.render('index', { title: 'Express' });
});


// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get('/result', function (req, res, next) {

  // Permet de savoir combien de trajets il y a par ville en base
  for (i = 0; i < city.length; i++) {

    journeyModel.find(
      { departure: city[i] }, //filtre

      function (err, journey) {

        console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
      }
    )

  }


  res.render('index', { title: 'Express' });
});

module.exports = router;
