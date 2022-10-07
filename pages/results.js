import TopSongList from "../Components/TopSongList";

Array.prototype.isEmpty = function () {
  return !this.length;
};

const Results = ({ topSongs }) => <TopSongList topSongs={topSongs} />;

export async function getServerSideProps({ query }) {
  if (!("access_token" in query))
    return { redirect: { destination: "/error?code=No Access Token" } };

  var topTracksRes = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term",
    { headers: { Authorization: "Bearer " + query.access_token } }
  )
  
  console.log(topTracksRes)
  
  var topTracks = await topTracksRes.json();

  if ("error" in topTracks)
    return {
      redirect: { destination: "/error?code=" + topTracks.error.message },
    };
  if (topTracks.items.isEmpty())
    return { redirect: { destination: "/error?code=No Top Songs" } };

  var songs = topTracks.items.slice(0, 12).map((song) => ({
    name: song.name,
    artist: song.artists[0].name,
    albumCoverURL: song.album.images[0].url,
    songURI: song.uri,
    songID: song.id,
  }));

  return { props: { topSongs: songs } };
}

export default Results;
