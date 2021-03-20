'use strict';

// import all required modules
const logger = require('../utils/logger');
const movieStore = require('../models/movie-store.js');
const uuid = require('uuid');

// create dashboard object
const dashboard = {

  // index method - responsible for creating and rendering the view
  index(request, response) {

    // display confirmation message in log
    logger.info('dashboard rendering');

    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'Disney Soundtracks App Dashboard',
      movies: movieStore.getAllMovies(),
    };

    // render the dashboard view and pass through the data
    logger.info('about to render', viewData.movies);
    response.render('dashboard', viewData);
  },
  
  deleteMovie(request, response) {
    const movieId = request.params.id;
    logger.debug(`Deleting Movie ${movieId}`);
    movieStore.removeMovie(movieId);
    response.redirect('/dashboard');
  },
  
  addMovie(request, response) {
    const img = URL.createObjectURL(request.body.image);
    const newMovie = {
      id: uuid(),
      image: img,
      title: request.body.title,
      year: request.body.year,
      director: request.body.director,
      imdb: request.body.imdb,
      tracks: [],
    };
    movieStore.addMovie(newMovie);
    response.redirect('/dashboard');
  },
};

// export the dashboard module
module.exports = dashboard;