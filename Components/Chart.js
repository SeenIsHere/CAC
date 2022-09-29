import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Nav } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import Filter from "bad-words"

import Image from "next/image"
import CommonWords from "/commonWords"

ChartJS.register(ArcElement, Tooltip, Legend);
const filter = new Filter()
console.log(filter.isProfane("Potato"))


const validShades = [
  "#ffffff",
  "#fef6fa",
  "#fbe4f1",
  "#f9d2e7",
  "#f6c0de",
  "#f4aed4",
  "#f29ccb",
  "#ef8ac1",
  "#ed78b8",
  "#ea66ae",
  "#e854a5",
  "#e5429b",
  "#e33092",
  "#e11e88",
  "#cf1c7d",
  "#bd1a73",
  "#ab1768",
  "#99155d",
  "#871252",
  "#751047",
  "#630d3c",
  "#510b31",
  "#3f0926",
  "#2d061b",
  "#1b0410",
  "#090105"
].map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)

const Chart = ({ shortData, mediumData, longData }) => {
  const [timeframe, setTimeframe] = useState(2);
  const [common, setCommon] = useState(true);
  const [profanity, setProfanity] = useState(false);
  const router = useRouter()


  useEffect(() => {
    if (!shortData || !mediumData || !longData) router.replace("/")
  })

  const createOptions = (data) => {
    const entries = Object.entries(data)
      .filter(x => common ? true : !CommonWords.includes(x[0]))
      .filter(x => profanity || !filter.isProfane(x))
      .sort((a, b) => b[1] - a[1])
      .slice(0, 50)


    var labels = entries.map((x) => x[0]);
    var dataValues = entries.map((x) => x[1]);


    var backgroundColors = entries.map(x => {
      const abc = "abcefghijklmnopqrstuvwxyz"
      return validShades[abc.indexOf(x[0][0])]
    });


    return {
      labels,
      datasets: [
        {
          label: "Words",
          data: dataValues,
          hoverOffset: 8,
          backgroundColor: backgroundColors,
          borderWidth: 0
        }
      ]
    };
  };

  return (
    <div className="chartContainer">
      <Nav
        className="w-100 d-flex"
        variant="pills"
        fill={true}
      >
        <Nav.Item onClick={(() => { setTimeframe(1) })} className="flex-fill">
          <Nav.Link className="timeframe-nav" active={timeframe === 1}>1 Month</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={(() => { setTimeframe(2) })} className="flex-fill">
          <Nav.Link className="timeframe-nav" active={timeframe === 2}>6 Month</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={(() => { setTimeframe(3) })} className="flex-fill">
          <Nav.Link className="timeframe-nav" active={timeframe === 3}>All time</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={(() => { setCommon(true) })} className="flex-fill">
          <Nav.Link className="commonwords-nav" active={common}>All Words</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={(() => { setCommon(false) })} className="flex-fill">
          <Nav.Link className="commonwords-nav" active={!common}>Unique Words</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={(() => { setProfanity(true); console.log("show") })} className="flex-fill">
          <Nav.Link className="filterprofanity-nav" active={profanity}>Show Profanity</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={(() => { setProfanity(false); console.log("hide") })} className="flex-fill">
          <Nav.Link className="filterprofanity-nav" active={!profanity}>Hide Profanity</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="pieContainer">
        <div className="pie">
          <Pie data={createOptions([shortData, mediumData, longData][timeframe - 1])} options={{ plugins: { legend: { display: false } } }} />
        </div>
      </div>
    </div>
  );
};

export default Chart;
