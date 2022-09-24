import Head from "next/head";
import Image from "next/image";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import pic from "/public/logo.png";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Router from 'next/router'

ChartJS.register(ArcElement, Tooltip, Legend);

const App = () => {
  return (
    <>
      <Head>
        <title>Spie</title>
      </Head>
      <div className="home">
        <Navbar collapseOnSelect expand="lg" bg="light">
          <Container fluid>
            <Navbar.Brand href="/" className="d-flex align-items-center">
              <Image src={pic} width="30" height="30" alt=""/>
              Spie
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav navbar={true} className="ms-auto">
                <Nav.Item>
                  <Nav.Link>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>About Us</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Button onClick={()=>{ Router.push('/spotify') }}>Log In</Button>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
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
            <Button onClick={()=>{ Router.push('/spotify') }}>Get Started</Button>
        </div>
        
      </div>
    </>
  );
};

export default App;
