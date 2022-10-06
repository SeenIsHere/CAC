import Head from "next/head";
import Image from "next/image";

import { Button, Navbar, Nav, Container } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import Router from 'next/router'

import pic from "../Images/logo.png";
import Buymeacoffee from "../Images/Buymeacoffee.svg"
import HomeNavBar from "../Components/HomeNavBar"


ChartJS.register(ArcElement, Tooltip, Legend);

const App = () => {
  return (
    <>
      <Head>
        <title>Spie</title>
      </Head>
      <div className="home">
        <HomeNavBar />
        <div className="centralStuff">
            <div className="pie">
                <Pie 
                    data={{  
                        labels: [ 'Spotify', 'Lyrics', 'Spie'],
                        datasets: [{
                            label: 'Example',
                            data: [300, 50, 100],
                            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)' ],
                        }]
                    }}
                    options={{ plugins: { legend: { display: false } } }}
                />
            </div>
            <p>Get your most listened to lyrics with Spie!</p>
            <Button onClick={()=>{ Router.replace('/spotify') }}>Get Started</Button>
        </div>
        
      </div>
    </>
  );
};

export default App;


