import { getSong } from "./getSong";
import { extractLyrics } from "./extractLyrics";

const songsToWords = async (song) => {
  const primaryArtist = song.artists[0].name;

  var genius = await getSong({ name: song.name, artist: primaryArtist });

  if(genius.response.hits.length === 0) return null

  const filteredSongs = genius.response.hits.filter(
    (hit) =>
      hit.result.primary_artist.name.toLowerCase() ===
      primaryArtist.toLowerCase()
  );

  if (filteredSongs.length === 0) return null;

  const lyrics = await extractLyrics(
    `https://genius.com${filteredSongs[0].result.path}`
  );

  return lyrics;
};

export default songsToWords;
