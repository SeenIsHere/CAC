import Image from "next/future/image";
import HomeNavBar from "../Components/HomeNavBar";

//Pictures
import Group from "../public/Group.jpeg";
import TaylorHeadshot from "../public/Taylor-Headshot.jpeg";
import JamieHeadshot from "../public/Jamie-Headshot.jpeg";
import SeanHeadshot from "../public/Sean-Headshot.jpeg";
import ByronHeadshot from "../public/Byron-Headshot.jpeg";

const AboutUs = () => {
  return (
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
          <div className="teamProfile">
            <Image
              src={TaylorHeadshot}
              className="teamPFP"
              priority
              alt="Taylor PFP"
            />
            <div className="teamDesc">
              <h5> Taylor Houghtaling </h5>
              <p>
                {" "}
                programming haiku&#39;s <br />
                requires a lot of effort <br />
                hello world, easy{" "}
              </p>
            </div>
          </div>
          <div className="teamProfile">
            <Image
              src={JamieHeadshot}
              className="teamPFP"
              priority
              alt="Jamie PFP"
            />
            <div className="teamDesc">
              <h5> Jamie Aleman-Mendoza </h5>
              <p>
                {" "}
                Dual Athlete: I play soccer and volleyball and I really like
                sand.{" "}
              </p>
            </div>
          </div>
          <div className="teamProfile">
            <Image
              src={SeanHeadshot}
              className="teamPFP"
              priority
              alt="Sean PFP"
            />
            <div className="teamDesc">
              <h5> Sean Devine </h5>
              <p>
                {" "}
                Lead Backend Developer. Check out my personal{" "}
                <a
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noreferrer">
                  site
                </a>
                . Love ⚾ &#38; 🥋{" "}
              </p>
            </div>
          </div>
          <div className="teamProfile">
            <Image
              src={ByronHeadshot}
              className="teamPFP"
              priority
              alt="Byron PFP"
            />
            <div className="teamDesc">
              <h5> Byron Manuel </h5>
              <p>
                {" "}
                Somewhat lazy coder but eccentric graphic designer. Obsessed
                with music.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
