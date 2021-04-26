'use strict';

const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');
const movieStore = require('../models/movie-store.js');

//create an accounts object
const accounts = {

  //index function to render index page
  index(request, response) {

    // display confirmation message in log
    logger.info('start rendering');
    
      // app statistics calculations
      const movies = movieStore.getAllMovies();
      let numMovies = movies.length;
      let numTracks = 0;
      for (let item of movies) {
        numTracks += item.tracks.length;
      }

    const viewData = {
      title: 'Disney Movie Soundtracks 101',
      totalMovies: numMovies,
      totalTracks: numTracks,
    };
    response.render('index', viewData);
  },
  //login function to render login page
  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },
  //logout function to render logout page
  logout(request, response) {
    response.cookie('playlist', '');
    response.redirect('/');
  },
 //signup function to render signup page
  signup(request, response) {
    const viewData = {
      title: 'Login',
    };
    response.render('signup', viewData);
  },
 //register function to render the registration page for adding a new user
  register(request, response) {
    const user = request.body;
    user.id = uuid();
    userstore.addUser(user);
    logger.info('registering' + user.email);
    response.redirect('/dashboard');
  },
  //authenticate function to check user credentials and either render the login page again or the start page.
  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if ((user) && (user.password === request.body.password)) {
      response.cookie('movie', user.email);
      logger.info('logging in' + user.email);
      response.redirect('/start');
    } else {
      response.redirect('/login');
      showLogInError();
    }
  },
 //utility function getCurrentUser to check who is currently logged in
  getCurrentUser (request) {
    const userEmail = request.cookies.playlist;
    return userstore.getUserByEmail(userEmail);
  }
}

module.exports = accounts;