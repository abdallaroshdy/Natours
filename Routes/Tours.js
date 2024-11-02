const express = require('express');
const Router = express.Router();
const fs =require('fs');
const responseMSG = require("../Utilities/ResponseMessages");
const tourController = require('../Controllers/TourController');



// const toursPath = `${__dirname}/../dev-data/data/tours.json`; 

// const tours = JSON.parse(
//     fs.readFileSync(toursPath)
// );

// Router.param('id' , (req,res,next,val)=>{

//     console.log(val)
//     next();
// });

Router.route('/')
.get(tourController.AllTours)
.post(tourController.addTour);

Router.route('/:id')
.get(tourController.singleTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour);

module.exports = Router;