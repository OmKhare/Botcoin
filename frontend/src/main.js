const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1')

class Transaction{
 constructor(fromAddress, toAddress, amount){
  this.fromAddress = fromAddress;
  this.toAddress = toAddress;
  this.amount= amount;
 }

 calculateHash(){
  return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
 }

 signTransaction(signingKey){
  if(signingKey.getPublic('hex') !== this.fromAddress){
   throw new Error('You cannot sign transactions from other wallets')
  }

  const hashTx = this.calculateHash();
  const sig = signingKey.sign(hashTx, 'base64');
  this.signature = sig.toDER('hex');
 }

 isValid(){
  if(this.fromAddress === null) return true;
  if(!this.signature || this.signature.length===0){
   throw new Error('No signature in this transaction');
  }

  const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
  return publicKey.verify(this.calculateHash(), this.signature)
 }
}

class Block{
 constructor(timestamp, transactions, previousHash=''){
  this.timestamp = timestamp;
  this.transactions = transactions;
  this.hash = this.calculateHash();
  this.previousHash = previousHash;
  this.nonce = 0;
 }

 calculateHash(){
  return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) +this.nonce).toString();
 }

 // We check that the hash generated contains the number initial zeros equal to difficulty
 mineBlock(difficulty){
  while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
   this.nonce++;
   this.hash = this.calculateHash();
  }
  console.log("Block mined " + this.hash);
 }

 hasValidTransaction(){
  for(const tx of this.transactions){
   if(!tx.isValid()){
    return false;
   }
  }
  return true;
 }
}

class Blockchain{
 constructor(){
  this.chain = [this.createGenesisBlock()];
  this.difficulty = 2; 
  this.pendingTransactions = [];
  this.miningReward = 100;
 }

 createGenesisBlock(){
  return new Block(Date.parse("2017-01-01"), [], "0");
 }

 getLatestBlock(){
  return this.chain[this.chain.length-1];
 }

 minePendingTransactions(miningRewardAddress){
  const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
  this.pendingTransactions.push(rewardTx);
  
  let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
  block.mineBlock(this.difficulty);

  console.log('Block successfully mined');
  this.chain.push(block);

  this.pendingTransactions = [];
 }

 addTransaction(transaction){
  if(!transaction.fromAddress || !transaction.toAddress){
   throw new Error('Transaction must include from and to address');
  }

  if(!transaction.isValid()){
   throw new Error('Cannot add invalid transaction')
  }

  this.pendingTransactions.push(transaction);
 }

 getBalanceOfTransaction(address){
  let balance =0;
  for(const block of this.chain){
   for(const trans of block.transactions){
    
    if(trans.fromAddress === address){
     balance -= trans.amount;
    }

    if(trans.toAddress === address){
     balance += trans.amount;
    }
   }
  }
  return balance;
 }

 isChainValid(){
  for(let i=1; i<this.chain.length();i++){
   const currentBlock = this.chain[i];
   const previousBlock = this.chain[i-1];

   if(currentBlock.hash !== currentBlock.calculateHash()){
    return false;
   }

   if(!currentBlock.hasValidTransaction()){
    return false;
   }

   if(currentBlock.previousHash !== previousBlock.hash){
    return false;
   }
  }
  return true; 
 }
}

const myKey = ec.keyFromPrivate('04f95a219ee9e01ce14a90b4e3afd7d9e74bc4eac8049c071e63089eac94ad411b08d0221eb1fdbdc80723748daf4b64d9824eef84441631e3d645ea95e2a541ce');
const myWalletAddress = myKey.getPublic('hex');

let botcoin = new Blockchain();
const tx1 = new Transaction(myWalletAddress, 'public key1', 10);
tx1.signTransaction(myKey)
botcoin.addTransaction(tx1);

botcoin.minePendingTransactions(myWalletAddress);

const tx2 = new Transaction(myWalletAddress, 'public key2', 10);
tx2.signTransaction(myKey)
botcoin.addTransaction(tx2);

botcoin.minePendingTransactions(myWalletAddress);

console.log(JSON.stringify(botcoin, null, 4));

export default botcoin