//import express and burger.js
//create the router for the app, and export the router at the end of the files
//set up all the routes for the app and use mysql queries here
var express = require('express');

//from the documentation: Use the express.Router class to create modular, mountable route handlers. A Router instance is a
//complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
var router = express.Router();
//////////////////////////////
var burger = require('../models/burger.js');
// var bodyParser = require('body-parser');
// var connection = require('../config/connection.js');

//get route to index
router.get('/', function(req, res) {
  res.redirect("/burgers");
  });

router.get('/burgers', function(req, res) {
  // express cb response by calling burger.selectAllBurger
  burger.all(function(burgerData) {
    // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
    res.render("index", { burger_data: burgerData });
  });
});

//post route --> back to index
router.post("/burgers/create", function(req, res) {
  // takes the request obj using it as input for burger.addBurger
  burger.create(req.body.burger_name, function(result) {
    //wrapper for orm.js that using mysql insert cb will return a console log,
    //render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});

//put the route back to index
router.put('/burgers/update', function(req, res) {
  burger.update(req.body.burger_id, function(result) {
    console.log(result)
    res.redirect('/');
  });
});

module.exports = router;
