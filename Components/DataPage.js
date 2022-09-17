import cheerio from "cheerio"
import { Fragment as Frag, useState, useEffect } from "react";

import { geniusOptions } from "../config";
import getLyrics from "../Methods/getLyrics";
import extractLyrics from "./extractLyrics";

import Chart from "./Chart";
import LoadingPage from "./LoadingPage";

const App = ({ code }) => {
  const [lyrics, setLyrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch("https://api.spotify.com/v1/me/top/tracks", {
    //   headers: {
    //     Authorization: `Bearer ${code}`
    //   }
    // })
    // .then((res) => res.json())
    // .then((spotifyData) => {
    //     if (spotifyData?.error) throw spotifyData;

    //     return getLyrics({ name: spotifyData.items[0].name, artist: "Roddy Ricch" })
    // })
    // .then((data) => {

    //     setLyrics(data.response);
    //     setLoading(false);
    // })
    // .then()


    // async function fetchData() {
    //     console.log(await extractLyrics("https://genius.com/Roddy-ricch-the-box-lyrics"))
    // }

    // fetchData();

    // fetch('/api?url=' + encodeURIComponent("https://api.spotify.com/v1/me/top/tracks"), { headers: { Authorization: `Bearer ${code}` } })
    // .then(res => res.json())
    // .then(console.log)

  }, []);

  if (!loading) return <LoadingPage />;

  var words = "abcdefghijklmnopqrstuvwxy".split("")

  var exampleData = {};

  words.forEach((a, i) => {
    exampleData[a] = Math.floor(Math.random() * 10000)
  })

  return <Chart wordData={exampleData} />;
};

export default App;
