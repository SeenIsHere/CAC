import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingPage from "../../Components/LoadingPage";

const Results = ({ access_token }) => {
  const router = useRouter();

  useEffect(() => {
    if(error) router.replace("/")
    else router.replace({ pathname: "/results", query: { access_token } });
  });

  return (<LoadingPage />);
};

export default Results;

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
  }){
    if(!("code" in query)) return { redirect: { destination: '/error?code=No Code Provided' } }

    if("error" in query) return { redirect: { destination: '/' } }

    const postQuery = `code=${query.code}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&grant_type=authorization_code`;

    const tokenAuth = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(   
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": postQuery.length,
      },
      body: postQuery,
    }).then((res) => res.json());

    if ("error" in tokenAuth) return { redirect: { destination: '/error?code=' + tokenAuth.error.message }, }

    const { access_token } = tokenAuth;

    return { props: { 
      access_token,
      error: null
    } }
}