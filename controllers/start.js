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
      const movies = movieStore.getAllMovies();
      let numMovies = movies.length;
      let numTracks = 0;
      for (let item of movies) {
        numTracks += item.tracks.length;
      }

    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'Disney Soundtracks 101',
      totalMovies: numMovies,
      totalTracks: numTracks,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };

    // render the start view and pass through the data
    response.render('start', viewData);
  }
    else response.redirect('/');
  },
}

// export the start module
module.exports = start;