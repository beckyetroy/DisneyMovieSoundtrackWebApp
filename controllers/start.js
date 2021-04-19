'use strict';

// import all required modules
const logger = require('../utils/logger');
const movieStore = require('../models/movie-store.js');

// create start object
const start = {

  // index method - responsible for creating and rendering the view
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

    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'Disney Soundtracks 101',
      totalMovies: numMovies,
      totalTracks: numTracks,
    };

    // render the start view and pass through the data
    response.render('start', viewData);
  },
};

// export the start module
module.exports = start;