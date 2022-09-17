import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Nav } from "react-bootstrap"
import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"

import "../styles/Chart.module.css"

import LoadingPage from "./LoadingPage";

ChartJS.register(ArcElement, Tooltip, Legend);

const validShades = [
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
]

const App = ({ wordData }) => {
  const [timeframe, setTimeframe] = useState(1)
  
  const createOptions = (data) => {
    var entries = Object.entries(data);

    var labels = entries.map((x) => x[0]);
    var dataValues = entries.map((x) => x[1]);

    
    var backgroundColors = [];

    labels.forEach((x, i) => {
    backgroundColors.push(validShades[24 - i])
    })

    return {
      labels,
      datasets: [
        {
          label: "Words",
          data: dataValues,
          hoverOffset: 4,
          backgroundColor: backgroundColors,
          borderWidth: 0
        }
      ]
    };
  };

  return (
    <div className="chartContainer">
      <Nav
        className="nav-pills timeframeSelect w-100"
        color="warning"
        // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item onClick={(()=>{ setTimeframe(1) })} className="timeframe w-auto">
          <Nav.Link active={timeframe === 1}>1 Month</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={(()=>{ setTimeframe(2) })} className="timeframe w-auto">
          <Nav.Link active={timeframe === 2}>6 Month</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={(()=>{ setTimeframe(3) })} className="timeframe w-atuo">
          <Nav.Link active={timeframe === 3}>All time</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={signOut}>Sign Out</Nav.Item>
      </Nav>
      <div className="pieContainer">
        <Pie data={createOptions(wordData)}/>
      </div>
      
    </div>
  );
};

export default App;
