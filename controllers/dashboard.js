'use strict';

// import all required modules
const logger = require('../utils/logger');
const playlistStore = require('../models/playlist-store.js');

// create dashboard object
const dashboard = {

  // index method - responsible for creating and rendering the view
  index(request, response) {

    // display confirmation message in log
    logger.info('dashboard rendering');

    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'Playlist App Dashboard',
      playlists: playlistStore.getAllPlaylists(),
    };

    // render the dashboard view and pass through the data
    logger.info('about to render', viewData.playlists);
    response.render('dashboard', viewData);
  },
};

// export the dashboard module
module.exports = dashboard;