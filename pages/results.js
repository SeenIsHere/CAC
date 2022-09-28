
import Chart from "../Components/Chart";
import songsToWords from "../Methods/songsToWords";
import { useRouter } from "next/router"
import { useEffect } from "react"
import LoadingPage from "../Components/LoadingPage";

Array.prototype.isEmpty = function(){
  return !this.length
}

const Results = ({ data, error }) => {
  const router = useRouter()

  useEffect(() => {
    if(error && error === "No Top Songs") router.replace({ pathname: "/error", query: { "type": 0 }}) 
    else if(error) router.replace("/spotify")
  })

  if(error) return <LoadingPage />
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
  

  if(!("access_token" in query)) return { props: { data: null, error: "No Access Token" } }

  var shortTermSongs = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term", {
    headers: { Authorization: "Bearer " + query.access_token },
  }).then((res) => res.json());

  var mediumTermSongs = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term", {
    headers: { Authorization: "Bearer " + query.access_token },
  }).then((res) => res.json());

  var longTermSongs = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term", {
    headers: { Authorization: "Bearer " + query.access_token },
  }).then((res) => res.json());

  if("error" in shortTermSongs || "error" in mediumTermSongs || "error" in longTermSongs) return { props: { data: null, error: "Access Token Expired" } }
  
  if(shortTermSongs.items.isEmpty() || mediumTermSongs.items.isEmpty() || longTermSongs.items.isEmpty()) return { props: { data: null, error: "No Top Songs" } }


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
      error: null
    }, // will be passed to the page component as props
  };
}

export default Results;