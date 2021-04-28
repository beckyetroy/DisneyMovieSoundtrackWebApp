'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const cloudinary = require('cloudinary');
const logger = require('../utils/logger');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const movieStore = {

  store: new JsonStore('./models/movie-store.json', { movieCollection: [] }),
  collection: 'movieCollection',

  getAllMovies() {
    return this.store.findAll(this.collection);
  },

  getMovie(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  getUserMovies(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  addMovie(movie, response) {
    movie.picture.mv('tempimage', err => {
        if (!err) {
          cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            movie.picture = result.url;
            response();
          });
        }
      });
    this.store.add(this.collection, movie);
  },

  removeMovie(id) {
    const movie = this.getMovie(id);
    this.store.remove(this.collection, movie);
  },

  removeAllMovies() {
    this.store.removeAll(this.collection);
  },

  addTrack(id, track) {
    const playlist = this.getMovie(id);
    playlist.tracks.push(track);
  },

  removeTrack(id, trackId) {
    const movie = this.getMovie(id);
    const tracks = movie.tracks;
    _.remove(tracks, { id: trackId});
  },
  
  editTrack(id, trackId, updatedTrack) {
    const movie = this.getMovie(id);
    logger.info(movie);
    const tracks = movie.tracks;
    logger.info(tracks);
    const index = tracks.findIndex(track => track.id === trackId);
    tracks[index].title = updatedTrack.title;
    tracks[index].singer = updatedTrack.singer;
    tracks[index].genre = updatedTrack.genre;
    tracks[index].youtube = updatedTrack.youtube;
  },
};

module.exports = movieStore;