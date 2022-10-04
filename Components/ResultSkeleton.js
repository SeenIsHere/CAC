import { Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import LyricsPieChart from "./LyricsPieChart";



const ResultSkeleton = ({ data, focusSong, setFocusSong  }) => {
  const [filterCommon, setFilterCommon] = useState(false);
  const [filterProfanity, setFilterProfanity] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!data) router.replace("/");
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
        <Nav.Item onClick={()=>{ setFocusSong(null) }} >
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

export default ResultSkeleton;
