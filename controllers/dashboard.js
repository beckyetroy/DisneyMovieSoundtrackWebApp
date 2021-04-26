'use strict';

// import all required modules
const logger = require('../utils/logger');
const movieStore = require('../models/movie-store.js');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

// create dashboard object
const dashboard = {

  // index method - responsible for creating and rendering the view
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'Dashboard',
      movies: movieStore.getUserMovies(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    logger.info('about to render' + viewData.movies);
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  
  deleteMovie(request, response) {
    const movieId = request.params.id;
    logger.debug(`Deleting Movie ${movieId}`);
    movieStore.removeMovie(movieId);
    response.redirect('/dashboard');
  },
  
  addMovie(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newMovie = {
      id: uuid(),
      userid: loggedInUser.id,
      image: request.files.picture,
      title: request.body.title,
      year: request.body.year,
      director: request.body.director,
      imdb: request.body.imdb,
      tracks: [],
    };
    logger.debug('Creating a new Movie' + newMovie);
    movieStore.addMovie(newMovie, function() {
      response.redirect("/dashboard");
    });
  },
};

// export the dashboard module
module.exports = dashboard;