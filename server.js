const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://khare_om:12345@cluster0.6a3qo.mongodb.net/botcoin", 
 {
  useNewUrlParser: true,
  useUnifiedTopology: true
 }
)

app.use("/", require("./routes/coinRoute"))

app.listen(3001, function(){
 console.log("Express server is running on port 3001")
})