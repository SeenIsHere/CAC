
import Chart from "../Components/Chart";
import songsToWords from "../Methods/songsToWords";

const Results = ({ data }) => {
  if("error" in data) return <div>{data.error}</div>

  return <Chart shortData={data.short} mediumData={data.medium} longData={data.long} />
  // return <p>{JSON.stringify(data)}</p>
}

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
}) {
  

  if(!("access_token" in query)) return { props: { data: { error: "No Access Token" } } }

  var shortTermSongs = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term", {
    headers: { Authorization: "Bearer " + query.access_token },
  }).then((res) => res.json());

  var mediumTermSongs = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term", {
    headers: { Authorization: "Bearer " + query.access_token },
  }).then((res) => res.json());

  var longTermSongs = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term", {
    headers: { Authorization: "Bearer " + query.access_token },
  }).then((res) => res.json());

  var shortTermWords = await songsToWords(shortTermSongs)
  var mediumTermWords = await songsToWords(mediumTermSongs)
  var longTermWords = await songsToWords(longTermSongs)

  return {
    props: {
      data: {
        short: shortTermWords,
        medium: mediumTermWords,
        long: longTermWords,
      },
    }, // will be passed to the page component as props
  };
}

export default Results;