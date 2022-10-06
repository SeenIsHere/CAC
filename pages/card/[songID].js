import { Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";

import LyricsPieChart from "../../Components/LyricsPieChart";

import songsToWords from "../../Methods/songsToWords";

import CommonWords from "/commonWords";
import Filter from "bad-words";
const filter = new Filter();


const Card = ({ data }) => {
  const [filterCommon, setFilterCommon] = useState(false);
  const [filterProfanity, setFilterProfanity] = useState(true);
  const router = useRouter();
  // const { songID } = router.query;

  useEffect(() => {
    // if (!data) router.replace("/");
  });



  return (
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
            setFilterProfanity(false)
          }}
          className="flex-fill">
          <Nav.Link className="filterprofanity-nav" active={!filterProfanity}>
            Show Profanity
          </Nav.Link>
        </Nav.Item>
        <Nav.Item
          onClick={() => {
            setFilterProfanity(true)
          }}
          className="flex-fill">
          <Nav.Link className="filterprofanity-nav" active={filterProfanity}>
            Hide Profanity
          </Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={()=>{ router.back() }} >
          <Nav.Link>
            Return
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="pieContainer">
        <div className="pie">
          <LyricsPieChart
            data={data}

            filterCommonWords={filterCommon}
            filterProfanity={filterProfanity}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;

export async function getServerSideProps({
    params,
    req,
    res,
    query,
    preview,
    previewData,
    resolvedUrl,
    locale,
    locales,
    defaultLocale,
  }){

    if (!("access_token" in query)) return { redirect: { destination: '/error?code=No Access Token' }, }

    var song = await fetch(
      "https://api.spotify.com/v1/tracks/" + query.songID,
      { headers: { Authorization: "Bearer " + query.access_token } }
    ).then((res) => res.json());

    if ("error" in song) return { redirect: { destination: '/error?code=' + song.error.message }, }
   
    var lyrics = await songsToWords(song)
    if(!lyrics) return { redirect: { destination: '/error?code=Could Not Retrieve Lyrics For This Song'}, };
    var words = {};
  
    lyrics.split(" ").forEach((word) => {
          if (word.trim() == "") return;
          if (word.trim() in words) words[word.trim()] += 1;
          else words[word.trim()] = 1;
        });

    words = Object.entries(words)

    var data = {}

    data.all = words

    data.filterProfanity  = words  .filter((entry) => !filter.isProfane(entry[0]))

    data.filterCommonWords  = words .filter((entry) => !CommonWords.includes(entry[0]))

    data.allFilters  = words .filter((entry) => !(CommonWords.includes(entry[0]) || filter.isProfane(entry[0]) ))



    return { props: { data } }
}