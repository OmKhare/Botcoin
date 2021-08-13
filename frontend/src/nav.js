import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Nav, Container } from 'react-bootstrap'
export default function NavBar() {
 return (
  <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/">Botcoin</Navbar.Brand>
        <Nav className="me-left" id="navcomp">
          <Nav.Link href="#home">Settings</Nav.Link>
          <Nav.Link href="/Transaction" >Create Transaction</Nav.Link>
        </Nav>
        </Container>
  </Navbar>
 )
}
