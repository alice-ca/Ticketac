var express = require('express');
var router = express.Router();
var UserModel = require("../models/users");


router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* POST sign-up page. */
router.post("/sign-up", async function (req, res, next) {
  var userExists = await UserModel.findOne({ email: req.body.email });
  console.log(userExists);
  if (userExists) {
    res.redirect("/");
  } else {
    var newUser = new UserModel({
      lastName: req.body.lastname,
      firstName: req.body.firstname,
      email: req.body.email,
      password: req.body.password,
      lastTrips: []
    });

    newUser = await newUser.save();

    req.session.user = {
      lastName: newUser.lastName,
      firstName: newUser.firstName,
      id: newUser._id,
    };

    console.log(req.session.user);

    res.redirect("/search");
  }
});

//SIGN - IN
router.post("/sign-in", async function (req, res, next) {
  var userExists = await UserModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (userExists) {
    req.session.user = {
      lastName: userExists.lastName,
      firstName: userExists.firstName,
      id: userExists._id,
    };
    console.log(req.session.user);
    res.redirect("/search");
  } else {
    res.redirect("/");
  }
});

// router.get("/logout", function(req, res, next) {
//  req.session.user = null;

//   res.redirect("/");
// });

module.exports = router;
