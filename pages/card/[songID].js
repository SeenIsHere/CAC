import { Nav } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/future/image";
import axios from "axios";
import ColorThief from "pure-color-thief-node";
import Head from "next/head";

import SpotifyLogo from "../../Images/SpotifyLogo.png"

import LyricsPieChart from "../../Components/LyricsPieChart";
import songsToWords from "../../Methods/songsToWords";

import CommonWords from "/commonWords";
import Filter from "bad-words";
const filter = new Filter();

const numOfWords = 50;

const Card = ({ data, songColors, percentages, song }) => {
  const [filterCommon, setFilterCommon] = useState(false);
  const [filterProfanity, setFilterProfanity] = useState(true);
  const router = useRouter();

  return (
    <>
    <Head>
      <title>{song.title} by {song.primaryArtist}</title>
    </Head>
    <div className="chartContainer">
      <Nav className="w-100 d-flex" variant="pills" fill={true}>
        <Nav.Item
          onClick={() => {
            setFilterCommon(false);
          }}
          className="flex-fill">
          <Nav.Link className="commonwords-nav" active={!filterCommon}>
            All Words
          </Nav.Link>
        </Nav.Item>
        <Nav.Item
          onClick={() => {
            setFilterCommon(true);
          }}
          className="flex-fill">
          <Nav.Link className="commonwords-nav" active={filterCommon}>
            Unique Words
          </Nav.Link>
        </Nav.Item>
        <Nav.Item
          onClick={() => {
            setFilterProfanity(false);
          }}
          className="flex-fill">
          <Nav.Link className="filterprofanity-nav" active={!filterProfanity}>
            Show Profanity
          </Nav.Link>
        </Nav.Item>
        <Nav.Item
          onClick={() => {
            setFilterProfanity(true);
          }}
          className="flex-fill">
          <Nav.Link className="filterprofanity-nav" active={filterProfanity}>
            Hide Profanity
          </Nav.Link>
        </Nav.Item>
        <Nav.Item
          onClick={() => {
            router.back();
          }}>
          <Nav.Link>Return</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="pieContainer">
        <div className="pie">
          <LyricsPieChart
            data={data}
            songColors={songColors}
            filterCommonWords={filterCommon}
            filterProfanity={filterProfanity}
          />
        </div>
        <div className="infodiv">
          <div className="albumInfo">
            <Image src={song.albumCover} width="500" height="500" alt="Cover Art" className="albumCoverImg" />
            <div className="songDetails" onClick={() => { router.replace(song.uri) }}>
              <p className="songName">{song.title}</p>
              <p className="artistName">{song.primaryArtist}</p>
              <Image src={SpotifyLogo} width={256} height={75} alt="Spotify Logo" className="spotifyLogo" />
            </div>
          </div>
          <div className="percentageList">
            <h1>Percentage List</h1>
            {percentages.map((pair, i) => (
              <p key={pair[0]}>{`#${i + 1}. ${pair[0]} - ${pair[1]}`}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Card;

export async function getServerSideProps({ query }) {
  if (!("access_token" in query))
    return { redirect: { destination: "/error?code=No Access Token" } };

  var song = await fetch("https://api.spotify.com/v1/tracks/" + query.songID, {
    headers: { Authorization: "Bearer " + query.access_token },
  }).then((res) => res.json());

  if ("error" in song)
    return { redirect: { destination: "/error?code=" + song.error.message } };

  const albumCover = song.album.images[2].url,
    title = song.name,
    primaryArtist = song.artists[0].name,
    uri = song.uri

  var lyrics = await songsToWords(song);
  if (!lyrics)
    return {
      redirect: {
        destination: "/error?code=Could Not Retrieve Lyrics For This Song",
      },
    };
  var words = {};

  lyrics.split(" ").forEach((word) => {
    if (word.trim() == "") return;
    if (word.trim() in words) words[word.trim()] += 1;
    else words[word.trim()] = 1;
  });

  words = Object.entries(words);

  var data = {};

  data.all = words.sort((a, b) => b[1] - a[1]);

  data.filterProfanity = words
    .filter((entry) => !filter.isProfane(entry[0]))
    .sort((a, b) => b[1] - a[1]);

  data.filterCommonWords = words
    .filter((entry) => !CommonWords.includes(entry[0]))
    .sort((a, b) => b[1] - a[1]);

  data.allFilters = words
    .filter(
      (entry) => !(CommonWords.includes(entry[0]) || filter.isProfane(entry[0]))
    )
    .sort((a, b) => b[1] - a[1]);

  //Percentages
  var totalWords = data.all.reduce((prev, curr) => prev + curr[1], 0);
  var percentages = data.all
    .slice(0, 10)
    .map((val) => [
      val[0][0].toUpperCase() + val[0].slice(1),
      Math.round((val[1] / totalWords) * 100 * 1000) / 1000 + "%",
    ]);

  //Creates a buffer from the album url, loads the buffer, then gets the color pallette and formats it into rgba css tag form
  const response = await axios.get(albumCover, {
    responseType: "arraybuffer",
  });
  const buffer = Buffer.from(response.data, "utf-8");
  const img = new ColorThief();
  await img.loadImage(buffer, "image/jpg");
  const songColors = await img
    .getColorPalette(numOfWords)
    .map((x) => `rgba(${x.join(", ")}, 1)`);

  data.all = data.all.slice(0, numOfWords);
  data.filterCommonWords = data.filterCommonWords.slice(0, numOfWords);
  data.filterProfanity = data.filterProfanity.slice(0, numOfWords);
  data.allFilters = data.allFilters.slice(0, numOfWords);

  return {
    props: {
      data,
      songColors,
      percentages,
      song: { albumCover, title, primaryArtist, uri },
    },
  };
}
