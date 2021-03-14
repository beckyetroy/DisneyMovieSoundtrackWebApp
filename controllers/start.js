'use strict';

// import all required modules
const logger = require('../utils/logger');

// create start object
const start = {

  // index method - responsible for creating and rendering the view
  index(request, response) {

    // display confirmation message in log
    logger.info('start rendering');

    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'Disney Soundtracks 101'
    };

    // render the start view and pass through the data
    response.render('start', viewData);
  },
};

$('#Left1').onmouseover(function() {
    $('#Left2').attr('src', 'images/classTimetable2.jpg');
   },
   function() {
    $('#classTimetable').attr('src', 'images/classTimetable.jpg');
   });

// export the start module
module.exports = start;