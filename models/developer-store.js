'use strict';

const JsonStore = require('./json-store');

const developerStore = {

  store: new JsonStore('./models/developer-store.json', { developerCollection: [] }),
  collection: 'developerCollection',

  // function to get all of the developers
  getAllDevelopers() {
    return this.store.findAll(this.collection);
  },

};

// export the developerStore object so it can be used elsewhere
module.exports = developerStore;