'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const movieStore = {

  store: new JsonStore('./models/movie-store.json', { movieCollection: [] }),
  collection: 'movieCollection',

  getAllMovies() {
    return this.store.findAll(this.collection);
  },

  getMovie(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addMovie(movie) {
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
};

module.exports = movieStore;