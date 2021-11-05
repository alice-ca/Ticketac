var express = require('express');
var router = express.Router();

const journeyModel = require('../models/journeys');
const userModel = require('../models/users');


//LOGIN
router.get("/", function (req, res, next) {
  if (!req.session.user) {
    req.session.user = {};
  }
  res.render("login", { users: req.session.user });
});


//SEARCH
router.get('/search', function (req, res, next) {
  if (req.session.user) {
    res.render('search');
  } else if (req.session.user == {}) {
    res.redirect('/');
  }
});

//BOOKING
router.post('/booking', async function (req, res, next) {
  if (req.session.user) {
    var date = new Date(req.body.date);

    var matchingJourneys = await journeyModel.find({
      departure: req.body.departure,
      arrival: req.body.arrival,
      date: new Date(req.body.date),
    });

    if (matchingJourneys == []) {
      res.render('fail');
    } else {
      res.render('booking', { matchingJourneys, date });
    }

    var date = new Date(req.body.date);
    var newstring = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }


    var matchingJourneys = await journeyModel.find({
      departure: newstring(req.body.departure),
      arrival: newstring(req.body.arrival),
      date: new Date(req.body.date),
    });


    //console.log(matchingJourneys);

    if (matchingJourneys == []) {
      res.render('fail');
    } else {
      res.render('booking', { matchingJourneys, date });
    }

  } else {
    res.redirect('/');
  }
});

//ADD-CARD
router.get('/addCard', async function (req, res, next) {
  if (req.session.user) {

    if (!req.session.card) {
      req.session.card = []
    }

    var addedJourney = await journeyModel.findById(req.query.id);

    req.session.card.push(addedJourney);

    res.redirect('/card');
  } else {
    res.redirect('/');
  }
});

router.get('/card', function (req, res, next) {
  if (req.session.user) {
    res.render('card', { card: req.session.card });
  } else {
    res.redirect('/');
  }
});


//CONFIRM
router.get('/confirm', async function (req, res, next) {
  if (req.session.user) {
    var user = await userModel.findById(req.session.user.id);

    for (let i = 0; i < req.session.card.length; i++) {

      user.lastTrips.push(req.session.card[i]._id);
    }
    await user.save();
    req.session.card = [];

    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

//LASTTRIPS
router.get('/lastTrips', async function (req, res, next) {
  if (req.session.user) {
    console.log(req.session.user)
    var user = await userModel.findById(req.session.user.id).populate('lastTrips').exec()
    var lastTrips = user.lastTrips
    res.render('lastTrips', { lastTrips });
  } else {
    res.redirect('/');
  }
});


<<<<<<< HEAD
=======
// check graphismes
// vider panier quand on confirme
// check pq card marche 1 fois sur 2
// pouvoir aller sur toutes les pages QUE si session + login/sign-in (redirect si req.session==undefined) : (rajouter un pop-up pour dire qu'on doit se logger ?)
// clic sur connection : logout si req.session
// gérer route confirm










>>>>>>> ba609fc82a8560b70b7d842db599ed0dd19443c1








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
