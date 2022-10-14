const simplifyTrackData = (tracks) => {
    return tracks.slice(0, 12).map((song) => ({
        name: song.name,
        artist: song.artists[0].name,
        albumCoverURL: song.album.images[0].url,
        url: song.external_urls.spotify,
        songID: song.id,
      }));
}

export { simplifyTrackData }
