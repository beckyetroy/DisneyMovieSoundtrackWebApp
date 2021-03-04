const playlist = {
  index(request, response) {
    const playlistId = request.params.id;
    logger.debug('Playlist id = ' + playlistId);
    const viewData = {
      title: 'Playlist',
    };
    response.render('playlist', viewData);
  },
};