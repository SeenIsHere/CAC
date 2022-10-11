import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


const createOptions = (data, songColors) => {

  var labels = data.map((entry) => entry[0][0].toUpperCase() + entry[0].slice(1));
  var dataValues = data.map((entry) => entry[1]);

  return {
    labels,
    datasets: [
      {
        label: "Words",
        data: dataValues,
        backgroundColor: songColors,
        borderWidth: 0,
      },
    ],
  };
};

const LyricsPieChart = ({
  data,
  filterProfanity,
  filterCommonWords,
  songColors,
}) => {
  if (filterProfanity && filterCommonWords)
    return (
      <Pie
        data={createOptions(data.allFilters, songColors)}
        options={{ plugins: { legend: { display: false } } }}
      />
    );
  if (filterProfanity && !filterCommonWords)
    return (
      <Pie
        data={createOptions(data.filterProfanity, songColors)}
        options={{ plugins: { legend: { display: false } } }}
      />
    );
  if (!filterProfanity && filterCommonWords)
    return (
      <Pie
        data={createOptions(data.filterCommonWords, songColors)}
        options={{ plugins: { legend: { display: false } } }}
      />
    );
  return (
    <Pie
      data={createOptions(data.all, songColors)}
      options={{ plugins: { legend: { display: false } } }}
    />
  );
};

export default LyricsPieChart;
