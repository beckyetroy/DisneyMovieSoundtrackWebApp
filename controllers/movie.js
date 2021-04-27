'use strict';

const logger = require('../utils/logger');
const movieStore = require('../models/movie-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const movie = {
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
    response.render('movie', viewData);
    }
    else response.redirect('/');
},
  
  deleteTrack(request, response) {
    const movieId = request.params.id;
    const trackId = request.params.trackid;
    logger.debug(`Deleting Track ${trackId} from Movie ${movieId}`);
    movieStore.removeTrack(movieId, trackId);
    response.redirect('/movie/' + movieId);
  },
  
  addTrack(request, response) {
    const movieId = request.params.id;
    const movie = movieStore.getMovie(movieId);
    const newTrack = {
      id: uuid(),
      title: request.body.title,
      singer: request.body.singer,
      genre: request.body.genre,
      youtube: request.body.youtube,
    };
    movieStore.addTrack(movieId, newTrack);
    response.redirect('/movie/' + movieId);
  },
  
   updateTrack(request, response) {
    const movieId = request.params.id;
    const trackId = request.params.trackId;
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

module.exports = movie;