import Image from "next/image";
import { Card, Button, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";
import LoadingPage from "./LoadingPage";


const TopSongList = ({ topSongs, focusSong, setFocusSong }) => {

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleChartRedirect = (song) => {
    setFocusSong(song)
  }

  if(loading) return <LoadingPage />

  return (
    <div className="TopSongListContainer">
      <div className="searchContainer">
        <Form.Control size="lg" type="text" placeholder="Search" />
      </div>
      {topSongs.map((song) => (
        <div key={song.name}>
          <Card>
            <Card.Img variant="top" src={song.albumCoverURL} onClick={() => { handleChartRedirect(song) }}/>
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
