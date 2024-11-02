const Tours = require('../Models/ToursModel')
const errHandeler = require('../Utilities/ErrorHandeler')
const responseMSG = require('../Utilities/ResponseMessages')

const AllTours = async(req,res)=>{

    try{

        let query = {...req.query};
        const executeQueries = ['page' , 'sort' ,'limit','fields'];

        executeQueries.forEach(element => {
            delete query[element];
        });

        let strQuery = JSON.stringify( query)
        .replace(/\b(gt|gte|lt|lte)\b/g , match => `$${match}`);

        query = JSON.parse(strQuery);


        const tours= await Tours.find(query);

        res.status(200).json({
            status : responseMSG.success ,
            result : tours.length,
            data : tours
        });

    }catch(err){
        console.log(err);
        errHandeler(res,err);
    }

}


const addTour = async (req,res)=>{

    try{

        await Tours.create(req.body);

        res.status(201).json({
            status : responseMSG.success,
            data : "new tour added successfully"
        });
    }catch(err){
        console.log(err);
        errHandeler(res,err);
    }

    
}


const singleTour = async(req,res)=>{

    try{
        const tour= await Tours.findById(req.params.id);

        res.status(200).json({
            status : responseMSG.success,
            data : tour
        });
    }catch(err){
        console.log(err);
        errHandeler(res,err);
    }

}


const updateTour = async(req,res)=>{

    try{
        const tour = await Tours.updateOne({_id : req.params.id} , req.body);
        // console.log(tour);

        if(tour.matchedCount===0){
            throw("this Tour is not Exist");
        }
        // else if(tour.modifiedCount===0){
        //     throw("this Tour is not Exist");
        // }

            
        res.status(200).json({
            status : responseMSG.success,
            data : "tour updated successfully"
        });

    }catch(err){
        console.log(err);
        errHandeler(res,err);
    }

}

const deleteTour = async(req,res)=>{

    try{
        const tour= await Tours.findByIdAndDelete(req.params.id);
        // console.log(tour);
        if(!tour){
            throw("this Tour is not Exist")
        }
        res.status(204).json({
            status : responseMSG.success,
            data : "tour deleted successfully"
        });
    }catch(err){
        // console.log(err);
        errHandeler(res,err);
    }

}

module.exports = {
    AllTours,
    addTour,
    singleTour,
    updateTour,
    deleteTour
}