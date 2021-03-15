'use strict';

const logger = require('../utils/logger');
const movieStore = require('../models/movie-store');
const uuid = require('uuid');

const movie = {
  index(request, response) {
    const movieId = request.params.id;
    logger.debug('Movie id = ' + movieId);
    const viewData = {
      title: 'Movie',
      movie: movieStore.getMovie(movieId),
    };
    response.render('movie', viewData);
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
      artist: request.body.artist,
      genre: request.body.genre,
      duration: request.body.duration
    };
    movieStore.addTrack(movieId, newTrack);
    response.redirect('/movie/' + movieId);
  }
};

module.exports = movie;