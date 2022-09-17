import { geniusOptions } from "../config";

const getLyrics = async ({ name, artist }) => {
  var x = await new Promise((resolve, reject) => {
    fetch(
      `https://api.genius.com/search?q=${encodeURIComponent(
        name
      )}&access_token=${geniusOptions.access_token}`
    )
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });

  return x;
};

export default getLyrics;
