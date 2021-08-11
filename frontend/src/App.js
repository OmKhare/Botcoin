import { Navbar, Nav, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import botcoin from './main';

function App() {
  let chains = [];

  for (var i = 0; i < botcoin.chain.length; i++) {
    chains.push(botcoin.chain[i]);
  }

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
      <div class="cards">
        {chains.map((chain,index)=>{
          return <div class="card">
          <div class="card-body">
            <h5 class="card-title">Block {index+1}<small class="text-muted"> (Genesis block)</small></h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="head">Hash</span><br/>
              <div class="text-truncate">
                <small >{chain.hash}</small>
              </div>
              <span class="head">Hash of previous block</span><br/>
              <div class="text-truncate"><small>{chain.previousHash}</small></div>
            </li>
            <li class="list-group-item">
              <span class="head">Nonce</span><br />
              <div class="text-truncate text-muted">
                <small >{chain.nonce}</small>
              </div>
            </li>
            <li  class="list-group-item">
              <span  class="head">Timestamp</span><br/>
              <div  class="text-truncate text-muted">
                <small >{chain.timestamp}</small>
              </div>
            </li>
          </ul>
        </div>
        })}
        
      </div>
    </div>
  );
}

export default App;
