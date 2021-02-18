'use strict';

const developerStore = {

  // import the developer collection object
  developerCollection: require('./developer-store.json').developerCollection,

  // function to get all of the developers
  getAllDevelopers() {
    return this.developerCollection;
  },

};

// export the developerStore object so it can be used elsewhere
module.exports = developerStore;