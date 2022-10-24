import Image from "next/future/image";
import HomeNavBar from "../Components/HomeNavBar";
import Head from "next/head"

//Pictures
import Group from "../Images/Group.jpeg";
import TaylorHeadshot from "../Images/Taylor-Headshot.jpeg";
import JamieHeadshot from "../Images/Jamie-Headshot.jpeg";
import SeanHeadshot from "../Images/Sean-Headshot.jpeg";
import ByronHeadshot from "../Images/Byron-Headshot.jpeg";


var teamInfo = [
  {
    content: (
      <p>
        programming haiku&#39;s <br />
        requires a lot of effort <br />
        hello world, easy
      </p>
    ),
    name: "Taylor Houghtaling",
    image: TaylorHeadshot,
  },
  {
    content: (
      <p>Dual Athlete: I play soccer and volleyball and I really like sand.</p>
    ),
    name: "Jamie Aleman-Mendoza",
    image: JamieHeadshot,
  },
  {
    content: (
      <p>
        Lead Backend Developer. Love ⚾ &#38; 🥋
      </p>
    ),
    name: "Sean Devine",
    image: SeanHeadshot,
  },
  {
    content: (
      <p>
        Somewhat lazy coder but eccentric graphic designer. Obsessed with music.
      </p>
    ),
    name: "Byron Manuel",
    image: ByronHeadshot,
  },
];

const AboutUs = () => {
  return (
    <>
    <Head>
      <title>About Us</title>
    </Head>
    
    <div className="amongUsContainer">
    <HomeNavBar />
      <div
        className="introDiv"
        style={{ backgroundImage: `url(${Group.src})` }}>
        <div className="abtUs">
          <h1> About Us </h1>
          <p>
            We&#39;re a group of sophomore, computer science majors from ACIT in
            New Jersey hoping to express a little bit of creativity and
            development with Spie.
          </p>
        </div>
      </div>
      <div className="spieDiv">
        <div className="abtSpie">
          <p>
            Spie is a lyrics pie chart app that arranges the lyrics of Spotify
            songs into a pie chart. At first, Spie was among a list of other
            concepts and ideas our group had scrapped, but after careful
            consideration and a light of interest, Spie became something much
            more. Together we created a simple but interesting project that uses
            the Spotify API to grab user data and tracks their most played
            songs, producing a pie chart that ultimately rounds out how many
            times a word is used in the song.
          </p>
        </div>
      </div>
      <div className="teamDiv">
        <h1> Our Team </h1>
        <div className="teamProfiles">
          {teamInfo.map((memberInfo) => (
            <div className="teamProfile" key={memberInfo.name}>
              <Image
                src={memberInfo.image}
                className="teamPFP"
                priority
                alt={memberInfo.name + " PFP"}
              />
              <div className="teamDesc">
                <h5>{memberInfo.name}</h5>
                {memberInfo.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutUs;