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
      const users = userstore.getAllUsers();
      let numMovies = movies.length;
      let numTracks = 0;
      for (let item of movies) {
        numTracks += item.tracks.length;
      }
    
      let numUsers = users.length;
      let averageMovies = numMovies/numUsers;
      if (isNaN(averageMovies)) {
        averageMovies = 0;
      }
      let averageTracks = numTracks/numUsers;
      if (isNaN(averageTracks)) {
        averageTracks = 0;
      }
    
    var mostContributions= "";
    var sumContributions = 0;
    var mostProfilePic = "";
    for (let i = 0; i < users.length; i++) {
      let movies = movieStore.getUserMovies(users[i].id);
      let numMovies = movies.length;
      let numTracks = 0;
      for (let item of movies) {
        numTracks += item.tracks.length;
      }
      if (((numMovies + numTracks) > sumContributions)) {
        sumContributions = numMovies + numTracks;
        mostContributions = users[i].firstName + " " + users[i].lastName;
        mostProfilePic = users[i].picture;
      }
      else if (((numMovies + numTracks) === sumContributions) {
        mostContributions = mostContributions + ", " + users[i].firstName + " " + users[i].lastName;
        mostProfilePic = "";
      }
    }
    
    var leastContributions= "";
    var sumContributions2 = 0;
    var leastProfilePic = "";
    for (let i = 0; i < users.length; i++) {
      let movies = movieStore.getUserMovies(users[i].id);
      let numMovies = movies.length;
      let numTracks = 0;
      for (let item of movies) {
        numTracks += item.tracks.length;
      }
      if (((numMovies + numTracks) < sumContributions2) || sumContributions2 === 0) {
        sumContributions2 = numMovies + numTracks;
        leastContributions = users[i].firstName + " " + users[i].lastName;
        leastProfilePic = users[i].picture;
      }
      else if (((numMovies + numTracks) === sumContributions2) && sumContributions2 !== 0){
        leastContributions = leastContributions + ", " + users[i].firstName + " " + users[i].lastName;
        leastProfilePic = "";
      }
    }
    
    if (mostContributions === "") {
      mostContributions = "No one yet";
    }
    
    if (leastContributions === "") {
      leastContributions = "No one yet";
    }


    const viewData = {
      title: 'Disney Movie Soundtracks 101',
      totalMovies: numMovies,
      totalTracks: numTracks,
      avgMovies: averageMovies,
      avgTracks: averageTracks,
      bigContributer: mostContributions,
      smallContributer: leastContributions,
      bigProfilePic: mostProfilePic,
      smallProfilePic: leastProfilePic,
    };
    response.render('index', viewData);
  },
  //login function to render login page
  login(request, response) {
    const viewData = {
      title: 'Login - Disney Movie Soundtracks 101',
    };
    response.render('login', viewData);
  },
  //logout function to render logout page
  logout(request, response) {
    response.cookie('movie', '');
    response.redirect('/');
  },
 //signup function to render signup page
  signup(request, response) {
    const viewData = {
      title: 'Sign Up - Disney Movie Soundtracks 101',
    };
    response.render('signup', viewData);
  },
 //register function to render the registration page for adding a new user
  register(request, response) {
    const user = request.body;
    user.id = uuid(),
    user.picture = request.files.picture;
    logger.info('registering' + user.email);
    userstore.addUser(user, function() {
      response.cookie('movie', user.email);
      logger.info('logging in' + user.email);
      response.redirect('/start');
    });
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
    }
  },
 //utility function getCurrentUser to check who is currently logged in
  getCurrentUser (request) {
    const userEmail = request.cookies.movie;
    return userstore.getUserByEmail(userEmail);
  }
}

module.exports = accounts;