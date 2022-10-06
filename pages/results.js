import songsToWords from "../Methods/songsToWords";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingPage from "../Components/LoadingPage";
import TopSongList from "../Components/TopSongList";

Array.prototype.isEmpty = function () {
  return !this.length;
};

const Results = ({ topSongs, error }) => {
  const router = useRouter();

  useEffect(() => {
    
    if (error && error === "No Top Songs")
      router.replace({ pathname: "/error", query: { type: 0 } });
    else if (error) router.replace("/spotify");
  });

  if (error) return <LoadingPage />;

  return <TopSongList topSongs={topSongs}/>

};

export async function getServerSideProps({ query }) {
  if (!("access_token" in query))
  return { redirect: { destination: '/error?code=No Access Token' }, }

  var topTracks = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term",
    { headers: { Authorization: "Bearer " + query.access_token } }
  )
  // .then(res => { 
  //   console.log(res, "\n\n\n", res.text())
  //   return res
  // }) 
  .then((res) => res.json());

  if ("error" in topTracks) return { redirect: { destination: '/error?code=' + topTracks.error.message }, }
  if (topTracks.items.isEmpty()) return { redirect: { destination: '/error?code=No Top Songs' }, }

    var songs = topTracks.items
      .slice(0, 12)
      .map(song => ({
          name: song.name,
          artist: song.artists[0].name,
          albumCoverURL: song.album.images[0].url,
          songURI: song.uri,
          songID: song.id
      })) 


  return { props: { topSongs: songs } };
}

export default Results;
