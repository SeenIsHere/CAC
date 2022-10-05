import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingPage from "../../Components/LoadingPage";

const Results = ({ access_token, error }) => {
  const router = useRouter();

  useEffect(() => {
    if(error) router.replace("/")
    else router.replace({ pathname: "/results", query: { access_token } });
  });

  return (<LoadingPage />);
};

export default Results;

export async function getServerSideProps({ query }){
    if(!("code" in query)) return { props: { access_token: null, error: "No Code Provided" } }

    if("error" in query) return { props: { access_token: null, error: "User Cancel" } }

    const postQuery = `code=${query.code}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&grant_type=authorization_code`;

    const access = await fetch("https://accounts.spotify.com/api/token", {
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

    return { props: { 
      access_token: access.access_token,  
      error: null
    } }
}