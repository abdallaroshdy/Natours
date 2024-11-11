const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : [true , "You should Enter name"],
        unique : true
    },
    duration :{
        type : Number,
        required : [true , "You should Enter duration"]
    },
    maxGroupSize :{
        type : Number,
        required : [true , "You should Enter group size"]
    },
    difficulty : {
        type : String,
        required : [true , "You should Enter difficulty"]
    },
    price : {
        type : Number,
        required : [true , "You should Enter price"]
    },
    priceDiscount : {
        type : Number
    },
    ratingAvrage : {
        type : Number,
        default : 4.5
    },
    ratingQuantity : {
        type : Number,
        default : 0
    },
    summary : {
        type : String,
        trim : true,
        required : [true , "You should Enter summary"]
    },
    desciption : {
        type : String,
        trim : true
    },
    imageCover : {
        type : String,
        required : [true , "A tour must have a image cover"]
    },
    images : [String],
    CreatedAt : {
        type : Date,
        default : ()=>{
            return Date.now();
        },
        select : false
    },
    startDates : [Date]

});


const TourModel = mongoose.model('Tour' , tourSchema);

module.exports = TourModel;