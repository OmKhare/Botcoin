import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import botcoin from './main';

export default function Transaction() {

 return (
  <div class="container">
   <h1 style={{marginTop:"10px"}}>Create transaction</h1>
   <p >Transfer some botcoin to someone!</p><br/>
   <div  class="form-group">
    <label  for="fromAddress">From address</label>
    <input aria-describedby="fromAddressHelp" class="form-control ng-untouched ng-pristine" disabled id="fromAddress" type="text" placeholder="04eb8be1a1e34521ff86e72860df54dea363502ac8c407ce4391f00fc111d3689beb914b42abd7a7459c7ca98ef269e1af47e7b6b3e8fa32aee98d50b46668cd27"/>
     <small  class="form-text text-muted" id="fromAddressHelp"> This is your wallet address. You cannot change it because you can only spend your own coins. </small>
   </div>
   <div  class="form-group">
    <label  for="toAddress">To address</label>
    <input  aria-describedby="toAddressHelp" class="form-control ng-untouched ng-pristine ng-valid" id="toAddress" type="text"/>
    <small  class="form-text text-muted" id="toAddressHelp"> The address of the wallet where you want to send the money to. You can type random text here (if you are not interested in recovering the funds) </small>
   </div>
   <div  class="form-group">
    <label  for="amount">Amount</label>
    <input  aria-describedby="amountHelp" class="form-control ng-untouched ng-pristine ng-valid" id="amount" type="number"/>
    <small  class="form-text text-muted" id="amountHelp"> You can transfer any amount. Account balance is not checked in this demo. Have at it! </small>
   </div>
   <button  class="btn btn-primary" type="submit">Sign &amp; create transaction</button></div>
 )
}
