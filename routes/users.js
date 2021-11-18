const express = require('express');
const router = express.Router();

const UserModel = require("../models/users");

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//SIGN-UP
router.post("/sign-up", async function (req, res, next) {
  let userExists = await UserModel.findOne({ email: req.body.email });

  if (userExists) {
    res.redirect("/");
  } else {
    const newUser = new UserModel({
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

    res.redirect("/search");
  }
});

//SIGN-IN
router.post("/sign-in", async function (req, res, next) {
  let userExists = await UserModel.findOne({
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

module.exports = router;
