import Image from "next/image";
import PAUL from "../public/PAUL.png";
import logo from "../public/logo.png"
import HomeNavBar from "../Components/HomeNavBar";

const AboutUs = () => {
  return (
    <div className="amongUsContainer">
      <HomeNavBar />
      <div className="introDiv" style={{ backgroundImage: `url(${logo.src})` }}>
        <div className="abtUs">
          <h1> About Us </h1>
          <p>
            We're a group of sophomore, computer science majors from ACIT in New
            Jersey hoping to express a little bit of creativity and development
            with Spie.
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
            <div className="teamProfile">
            <Image src={PAUL} className="teamPFP" />
            <div className="teamDesc">
                <h5> Taylor Houghtaling </h5>
                <p> 5'10 tall hunk of a man. Inteligent, strong, sexy, amazing. </p>
            </div>
            </div>
            <div className="teamProfile">
            <Image src={PAUL} className="teamPFP" />
            <div className="teamDesc">
                <h5> Jamie Aleman-Mendoza </h5>
                <p>
                {" "}
                Dual Athlete: I play soccer and volleyball and I really like sand.{" "}
                </p>
            </div>
            </div>
            <div className="teamProfile">
            <Image src={PAUL} className="teamPFP" />
            <div className="teamDesc">
                <h5> Sean Devine </h5>
                <p> I love my team members more than friends :sussy_amogus_imposter: </p>
            </div>
            </div>
            <div className="teamProfile">
            <Image src={PAUL} className="teamPFP" />
            <div className="teamDesc">
                <h5> Byron Manuel </h5>
                <p>
                {" "}
                Somewhat lazy coder but eccentric graphic designer. Obsessed with
                music.
                </p>
            </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
