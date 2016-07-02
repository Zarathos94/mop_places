var express = require('express');
var router = express.Router();
var appConfig = require('../appConfig.json');
var clubs = require('../clubs.json');
var food = require('../food.json');
var bars = require('../bars.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mop Places', apiKey: appConfig.googleAPI.mapsKey });
});

router.get('/clubs', function(req, res, next) {

  try {
    
    if(clubs.length == 0) {
      res.status(404).send({
        message: "Not found."
      })
    }
    else {
      res.send({
        clubList: clubs
      })
    }
  }
  catch(e) {
    res.status(500).send(e);
  }
});


router.get('/food', function(req, res, next) {

  try {

    if(food.length == 0) {
      res.status(404).send({
        message: "Not found."
      })
    }
    else {
      res.send({
        foodList: food
      })
    }
  }
  catch(e) {
    res.status(500).send(e);
  }
});


router.get('/bars', function(req, res, next) {

  try {

    if(bars.length == 0) {
      res.status(404).send({
        message: "Not found."
      })
    }
    else {
      res.send({
        barList: bars
      })
    }
  }
  catch(e) {
    res.status(500).send(e);
  }
});


module.exports = router;
