import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import botcoin from './main';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import NavBar from './nav';
import Home from './Home';
import Transaction from './Transaction';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/transaction" component={Transaction}/>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
