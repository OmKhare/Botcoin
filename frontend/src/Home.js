import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import botcoin from './main';
import axios from 'axios'

function Home() {
  const [coin, setCoin] = useState(botcoin.botcoin.chain)
  useEffect(()=>{
    fetch("/coins").then(res => {
      if(res.ok){
        return res.json()
      }
    }).then(jsonRes => setCoin(jsonRes[0].chain));
  })
    
  let chains = [];
  const [ind, setInd] = useState(0)

  // console.log(botcoin.botcoin.chain)

  for (var i = 0; i < coin.length; i++) {
    chains.push(coin[i]);
  }

  const [transaction, setTransaction] = useState('null');

  return (
    <div className="App">
      <div class="cards">
        {chains.map((chain,index)=>{
          return <div class="card" onClick={()=>{setTransaction(chains[index].transactions); setInd(index)}}>
          <div class="card-body">
            <h5 class="card-title">Block {index+1}{index===0 && <small class="text-muted"> (Genesis block)</small>}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="head">Hash</span><br/>
              <div class="text-truncate1">
                <small style={{color:'#' + chain.hash.substring(0,6)}}>{chain.hash}</small>
              </div>
              <span class="head">Hash of previous block</span><br/>
              <div class="text-truncate1" style={{color:'#' + chain.previousHash.substring(0,6)}}><small>{chain.previousHash}</small></div>
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
      <div class="head2">
        <h2>Transactions inside Block {ind+1}</h2>
      </div>
      <div>{ind===0 ? 'There are no transactions in this block' : 
      <table class="table table-hover table-striped">
        <thead>
          <tr >
            <th  scope="col">#</th>
            <th  scope="col">From</th>
            <th  scope="col">To</th>
            <th  scope="col">Amount</th>
            <th  scope="col">Timestamp</th>
            <th  scope="col">Valid?</th>
          </tr>
        </thead>
        <tbody >
          {transaction.map((trans,index)=>{
          return <tr>
            <td >{index}</td>
            <td  class="text-truncate">
              <a>{index==0 ? trans.fromAddress : "System"}</a>
              <span  class="text-muted"><br/><small >{index==0 ? "(That's yours!)" : "(Mining Reward)"}</small></span>
            </td>
            <td  class="text-truncate">
              <a>{trans.toAddress}</a>
              <span  class="text-muted"><br/><small >{index==1 && "(That's yours!)"}</small></span>
            </td>
            <td >{trans.amount}</td>
            <td >{chains[ind].timestamp}<br/><span  class="text-muted"><small >date & time</small></span></td>
            <td ><span >✓</span></td>
          </tr>
          })}
        </tbody>
      </table>
      }</div>
    </div>
  );

}

export default Home;