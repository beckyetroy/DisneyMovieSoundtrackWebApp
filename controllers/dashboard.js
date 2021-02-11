'use strict';

// import all required modules
const logger = require('../utils/logger');

// create dashboard object
const dashboard = {

  // index method - responsible for creating and rendering the view
  index(request, response) {

    // display confirmation message in log
    logger.info('dashboard rendering');

    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'Playlist App Dashboard',
    };

    // render the dashboard view and pass through the data
    response.render('dashboard', viewData);
  },
};

// export the dashboard module
module.exports = dashboard;