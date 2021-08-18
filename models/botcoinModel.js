const mongoose = require("mongoose");

const coinSchema = {
 chain: Array,
 difficulty: Number,
 miningReward: Number,
 pendingTransactions: Array,
}

const Coin = mongoose.model("Coin", coinSchema)

module.exports = Coin;