import { Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import LyricsPieChart from "./LyricsPieChart";



const ResultSkeleton = ({ shortData, mediumData, longData }) => {
  const [timeframe, setTimeframe] = useState(1);
  const [filterCommon, setFilterCommon] = useState(false);
  const [filterProfanity, setFilterProfanity] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!shortData || !mediumData || !longData) router.replace("/");
  });

  return (
    <div className="chartContainer">
      <Nav className="w-100 d-flex" variant="pills" fill={true}>
        <Nav.Item
          onClick={() => {
            setTimeframe(0);
          }}
          className="flex-fill">
          <Nav.Link className="timeframe-nav" active={timeframe === 0}>
            1 Month
          </Nav.Link>
        </Nav.Item>
        <Nav.Item
          onClick={() => {
            setTimeframe(1);
          }}
          className="flex-fill">
          <Nav.Link className="timeframe-nav" active={timeframe === 1}>
            6 Month
          </Nav.Link>
        </Nav.Item>
        <Nav.Item
          onClick={() => {
            setTimeframe(2);
          }}
          className="flex-fill">
          <Nav.Link className="timeframe-nav" active={timeframe === 2}>
            All time
          </Nav.Link>
        </Nav.Item>
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
      </Nav>
      <div className="pieContainer">
        <div className="pie">
          <LyricsPieChart
            data={[shortData, mediumData, longData][timeframe]}

            filterCommonWords={filterCommon}
            filterProfanity={filterProfanity}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultSkeleton;
