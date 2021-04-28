'use strict';

// import all required modules
const logger = require('../utils/logger');
const movieStore = require('../models/movie-store.js');
const accounts = require ('./accounts.js');

// create start object
const start = {

  // index method - responsible for creating and rendering the view
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    // display confirmation message in log
    logger.info('start rendering');
    
    if(loggedInUser){    
      // app statistics calculations
      const movies = movieStore.getUserMovies(loggedInUser.id);
      let numMovies = movies.length;
      let numTracks = 0;
      for (let item of movies) {
        numTracks += item.tracks.length;
      }
      
      let averageTracks = numTracks/numMovies;
      if (isNaN(averageTracks)) {
        averageTracks = 0;
      }
      
      var biggestTrack= "";
      var sumTracks = 0;
      var biggestProfilePic = "";
      for (let i = 0; i < movies.length; i++) {
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
        else if (((numMovies + numTracks) === sumContributions)) {
          mostContributions = mostContributions + " | " + users[i].firstName + " " + users[i].lastName;
          mostProfilePic = "";
        }
      }

    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'Disney Soundtracks 101',
      totalMovies: numMovies,
      totalTracks: numTracks,
      averageTracks: averageTracks,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
    };

    // render the start view and pass through the data
    response.render('start', viewData);
  }
    else response.redirect('/');
  },
}

// export the start module
module.exports = start;