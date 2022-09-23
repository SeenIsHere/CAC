import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Nav } from "react-bootstrap"
import { useState } from "react"

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

const Chart = ({ shortData, mediumData, longData }) => {
  const [timeframe, setTimeframe] = useState(2)
  
  const createOptions = (data) => {
    const entries = Object.entries(data)
       .sort((a, b) => b[1] - a[1])
      .slice(0, 100)


    var labels = entries.map((x) => x[0]);
    var dataValues = entries.map((x) => x[1]);

    
    var backgroundColors = [];

    labels.forEach((x, i) => {
    backgroundColors.push(validShades[ 24-i % 24])
    })

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
        <Nav.Item onClick={(()=>{ setTimeframe(1) })} className="flex-fill">
          <Nav.Link active={timeframe === 1}>1 Month</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={(()=>{ setTimeframe(2) })} className="flex-fill">
          <Nav.Link active={timeframe === 2}>6 Month</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={(()=>{ setTimeframe(3) })} className="flex-fill">
          <Nav.Link active={timeframe === 3}>All time</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="pieContainer">
        <div className="pie">
          <Pie data={createOptions([shortData, mediumData, longData][timeframe-1])} options={{ plugins: { legend: { display: false } } }}/>
        </div>
      </div>
      
    </div>
  );
};

export default Chart;
