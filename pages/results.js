import TopSongList from "../Components/TopSongList";
import { useState } from "react"
import { simplifyTrackData } from "../Methods/simplifyTrackData"

Array.prototype.isEmpty = function () {
  return !this.length;
};

const Results = ({ topSongs }) => {
  const [searchSongs, setSearchSongs] = useState(null)
  return <TopSongList topSongs={searchSongs ?? topSongs} setSearchSongs={setSearchSongs} />;
}

export async function getServerSideProps({ query }) {
  if (!("access_token" in query))
    return { redirect: { destination: "/error?code=No Access Token" } };

  var topTracks = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?" + new URLSearchParams({ limit: 12, time_range: "medium_term" }),
    { headers: { Authorization: "Bearer " + query.access_token } }
  ).then((res) => res.json());

  if ("error" in topTracks)
    return {
      redirect: { destination: "/error?code=" + topTracks.error.message },
    };
  if (topTracks.items.isEmpty())
    return { redirect: { destination: "/error?code=No Top Songs" } };

  var songs = simplifyTrackData(topTracks.items)

  return { props: { topSongs: songs } };
}

export default Results;
