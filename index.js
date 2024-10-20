const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require('mongoose');

const app = express();

dotEnv.config();

app.use(express.json());

app.get('/' , (req,res)=>{
    res.status(200).send("Wellcome on Server Side")
});

app.listen(process.env.PORT , ()=>{
    console.log("server run successfully");
});

mongoose.connect(process.env.DB).then( ()=>{
    console.log("DataBase Connected successfully");
});
