'use strict';

const playlistStore = {

  // import the playlist collection object
  playlistCollection: require('./playlist-store.json').playlistCollection,

  // function to get all of the playlists
  getAllPlaylists() {
    return this.playlistCollection;
  },

};

// export the playlistStore object so it can be used elsewhere
module.exports = playlistStore;