'use strict';

const logger = require('../utils/logger');
const movieStore = require('../models/movie-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const editmovie = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    const movieId = request.params.id;
    logger.debug('Movie id = ' + movieId);
    if (loggedInUser) {
    const viewData = {
      title: movieStore.getMovie(movieId).title,
      movie: movieStore.getMovie(movieId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
    };
    response.render('editmovie', viewData);
    }
    else response.redirect('/');
},
  
   updateTrack(request, response) {
    const movieId = request.params.id;
    const trackId = request.params.trackid;
    logger.debug("updating track " + trackId);
    const updatedTrack = {
      title: request.body.title,
      singer: request.body.singer,
      genre: request.body.genre,
      youtube: request.body.youtube,
    };
    movieStore.editTrack(movieId, trackId, updatedTrack);
    response.redirect('/movie/' + movieId);
  },
};

module.exports = editmovie;