'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const movie = require('./controllers/movie.js');

// connect routes to controllers
router.get('/', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/movie/:id', movie.index);
router.get('/movie/:id/deleteTrack/:trackid', movie.deleteTrack);
router.get('/dashboard/:id/deleteMovie', dashboard.deleteMovie);

router.post('/movie/:id/addtrack', movie.addTrack);
router.post('/dashboard/addmovie', dashboard.addMovie);

// export router module
module.exports = router;