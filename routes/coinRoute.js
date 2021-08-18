const express = require('express')
const router = express.Router();
const Coin = require("../models/botcoinModel")

router.route("/create").post((req,res)=>{
 const chain = req.body.chain;
 const difficulty = req.body.difficulty;
 const miningReward = req.body.miningReward;
 const pendingTransactions = req.body.pendingTransactions;
 const newCoin = new Coin({
  chain,
  difficulty,
  miningReward,
  pendingTransactions,
 });

 newCoin.save();
});

// router.route("/coins").get((req,res)=>{
//  Coin.find({},function(err,coins){
//   if(err) console.warn(err)
//   res.json(coins)
//  })
// })

router.route("/coins").get((req,res)=>{
 Coin.find().sort({$natural:-1}).then(foundCoin => res.json(foundCoin))
})

module.exports = router;