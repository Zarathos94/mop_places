var express = require('express');
var router = express.Router();
var appConfig = require('../appConfig.json');
var clubs = require('../clubs.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mop Places', apiKey: appConfig.googleAPI.mapsKey });
});

router.get('/clubs', function(req, res, next) {
  console.log(clubs);
  try {
    
    console.log(clubs);
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

module.exports = router;
