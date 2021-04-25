'use strict';

// import all required modules
const logger = require('../utils/logger');
const developerStore = require('../models/developer-store.js');
const accounts = require ('./accounts.js');

// create about object
const about = {

  // index method - responsible for creating and rendering the view
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    
    // display confirmation message in log
    logger.info('about rendering');
    
    if (loggedInUser) {
      // create view data object (contains data to be sent to the view e.g. page title)
      const viewData = {
      title: 'About the App',
      developers: developerStore.getAllDevelopers(),
    };
    response.render('about', viewData);
    }
    else response.redirect('/');    
  },
};

// export the about module
module.exports = about;