import { getSong } from "./getSong";
import { extractLyrics } from "./extractLyrics";

const songsToWords = async (songs) => {
  var allLyrics = await Promise.all(
    songs.items.map(async (item, index) => {
      const primaryArtist = item.artists[0].name;

      var genius = await getSong({ name: item.name, artist: primaryArtist });

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
    })
  );

  var allWords = {};

  allLyrics
    .filter((val) => val !== null)
    .forEach((lyric) => {
      lyric.split(" ").forEach((word) => {
        if (word.trim() == "") return;
        if (word.trim() in allWords) allWords[word.trim()] += 1;
        else allWords[word.trim()] = 1;
      });
    });

    return allWords
};

export default songsToWords;