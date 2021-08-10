import { Navbar, Nav, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Botcoin</Navbar.Brand>
        <Nav className="me-left" id="navcomp">
          <Nav.Link href="#home">Settings</Nav.Link>
          <Nav.Link href="#features">Create Transaction</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;
