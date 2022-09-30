
import songsToWords from "../Methods/songsToWords";
import { useRouter } from "next/router"
import { useEffect } from "react"
import LoadingPage from "../Components/LoadingPage";
import ResultSkeleton from "../Components/ResultSkeleton";

import CommonWords from "/commonWords"
import Filter from "bad-words";
const filter = new Filter();

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
  return <ResultSkeleton shortData={data.short} mediumData={data.medium} longData={data.long} />
  // return <p>{JSON.stringify(data.short.allFilters)}</p>
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

  var data = { 
    short: {}, 
    medium: {}, 
    long: {}, 
    error: null 
  }

  data.short.all  = Object.entries(await songsToWords(shortTermSongs)).slice(0, 200)
  data.medium.all = Object.entries(await songsToWords(mediumTermSongs)).slice(0, 200)
  data.long.all   = Object.entries(await songsToWords(longTermSongs)).slice(0, 200)

  data.short.filterProfanity  = data.short.all  .filter((entry) => !filter.isProfane(entry[0]))
  data.medium.filterProfanity = data.medium.all .filter((entry) => !filter.isProfane(entry[0]))
  data.long.filterProfanity   = data.long.all   .filter((entry) => !filter.isProfane(entry[0]))

  data.short.filterCommonWords  = data.short.all .filter((entry) => !CommonWords.includes(entry[0]))
  data.medium.filterCommonWords = data.medium.all.filter((entry) => !CommonWords.includes(entry[0]))
  data.long.filterCommonWords   = data.long.all  .filter((entry) => !CommonWords.includes(entry[0]))

  data.short.allFilters  = data.short.all .filter((entry) => !(CommonWords.includes(entry[0]) || filter.isProfane(entry[0]) ))
  data.medium.allFilters = data.medium.all.filter((entry) => !(CommonWords.includes(entry[0]) || filter.isProfane(entry[0]) ))
  data.long.allFilters   = data.long.all  .filter((entry) => !(CommonWords.includes(entry[0]) || filter.isProfane(entry[0]) ))

  return { props: { data } }
}

export default Results;