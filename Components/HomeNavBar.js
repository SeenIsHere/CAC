import Image from "next/image";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import pic from "../Images/logo.png";
import Buymeacoffee from "../Images/Buymeacoffee.svg";
import Router from "next/router";

const HomeNavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" className="home-nav-bar">
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <Image src={pic} width="30" height="30" alt="" />
          Spie
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav navbar={true} className="ms-auto">
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  Router.push("/");
                }}>
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  Router.push("/about-us");
                }}>
                About Us
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="https://www.buymeacoffee.com/spie"
                className="py-0">
                <Buymeacoffee width="169.2" height="36" />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Button
                onClick={() => {
                  Router.replace("/spotify");
                }}>
                Log In
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HomeNavBar;
