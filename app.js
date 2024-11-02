const express = require("express");


const toursRouter = require("./Routes/Tours")


const app = express();




app.use(express.json());
app.use(express.static(`${__dirname}/Uploads`))



app.get('/' , (req,res)=>{
    res.status(200).send("Wellcome on Server Side")
});



app.use('/api/v1/tours' , toursRouter);

module.exports = app ;