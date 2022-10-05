import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


var validShades = [
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
  "#090105",
]
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

const createOptions = (data) => {
  var sortedData = data.sort((a, b) => b[1] - a[1]).slice(0, 50)

  var labels = sortedData.map((entry) => entry[0][0].toUpperCase() + entry[0].slice(1));
  var dataValues = sortedData.map(entry => entry[1])

  var backgroundColor = labels.map((label) => {
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return validShades[abc.indexOf(label[0])];
  });

  return {
    labels,
    datasets: [{
        label: "Words",
        data: dataValues,
        hoverOffset: 8,
        backgroundColor,
        borderWidth: 0,
      }]
  };
};

const LyricsPieChart = ({ data, filterProfanity, filterCommonWords,  }) => {

    if(filterProfanity && filterCommonWords)  return <Pie data={createOptions(data.allFilters, true)} options={{ plugins: { legend: { display: false } } }} />
    if(filterProfanity && !filterCommonWords) return <Pie data={createOptions(data.filterProfanity)} options={{ plugins: { legend: { display: false } } }} />
    if(!filterProfanity && filterCommonWords) return <Pie data={createOptions(data.filterCommonWords)} options={{ plugins: { legend: { display: false } } }} />
    return <Pie data={createOptions(data.all)} options={{ plugins: { legend: { display: false } } }} />

};

export default LyricsPieChart;



