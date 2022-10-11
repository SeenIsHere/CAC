import { Card, Button, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";
import LoadingPage from "./LoadingPage";
import HomeNavBar from "./HomeNavBar";
import { simplifyTrackData } from "../Methods/simplifyTrackData";

const TopSongList = ({ topSongs, setSearchSongs }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChartRedirect = (song) => {
    setLoading(true);
    router.push({
      query: { access_token: router.query.access_token },
      pathname: "/card/" + song.songID,
    });
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="TopSongListContainer">
      <div className="searchContainer">
        <Button
          onClick={() => {
            router.replace("/");
          }}>
          Home
        </Button>

        <Form.Control
          size="lg"
          type="text"
          placeholder="Search"
          onChange={(text) => {
            setSearchQuery(text.target.value);
          }}
        />
        <Button
          onClick={() => {
            fetch(
              "/api/search?" +
                new URLSearchParams({
                  access_token: router.query.access_token,
                  q: searchQuery,
                })
            )
              .then((r) => r.json())
              .then((data) => {
                setSearchSongs(simplifyTrackData(data));
              });
          }}>
          Search
        </Button>
      </div>
      {topSongs.map((song, i) => (
        <div key={song.name + i}>
          <Card>
            <Card.Img
              variant="top"
              src={song.albumCoverURL}
              onClick={() => {
                handleChartRedirect(song);
              }}
            />
            <Card.Body>
              <Card.Title href={song.songURI}>{song.name}</Card.Title>
              <Card.Subtitle>{song.artist}</Card.Subtitle>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default TopSongList;
