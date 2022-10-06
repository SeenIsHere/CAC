const getSong = async ({ name, artist }) => {
  name = "asdasdasdacvswrg3hqgewqrgh"
  artist = "onadsofnsojdvnokqweng9uwrjgpkasdmnfo"
  var x = await new Promise((resolve, reject) => {
    fetch(
      `https://api.genius.com/search?q=${encodeURIComponent(
        `${name} ${artist}`
          .toLowerCase()
          .replace(/ *\([^)]*\) */g, "")
          .replace(/ *\[[^\]]*]/, "")
          .replace(/feat.|ft./g, "")
          .replace(/\s+/g, " ")
          .trim()
      )}&access_token=${process.env.GENIUS_ACCESS_TOKEN}`
    )
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });

  return x;
};

export { getSong };