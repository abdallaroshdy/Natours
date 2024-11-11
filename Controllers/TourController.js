const Tours = require('../Models/ToursModel')
const errHandeler = require('../Utilities/ErrorHandeler')
const responseMSG = require('../Utilities/ResponseMessages')
const ApiFetures = require('../Utilities/apiFutures')



const AllTours = async(req,res)=>{

    try{

        const ApiFeture = new ApiFetures(Tours.find() , req.query).filtering().sorting().selecting().pagination();
        
        const tours = await ApiFeture.data;

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


const toursState = async (req,res)=>{

    try{

        const stat = await Tours.aggregate([
            {
                $match : {ratingAvrage :{$gte:4.5}}
            },
            {
                $group : {
                    _id : '$difficulty',
                    num : {$sum : 1},
                    MaxRate : {$max : '$ratingAvrage'},
                    MinRate : {$min : '$ratingAvrage'},
                    AvgRate : {$avg : '$ratingAvrage'},
                    Maxprice : {$max : '$price'},
                    Minprice : {$min : '$price'},
                    Avgprice : {$avg : '$price'}

                }
            },
            {
                $sort : {num : 1}
            },
            // {
            //     $match : {_id :{$ne:'easy'}}
            // }
        ]);


        res.status(200).json({
            status : responseMSG.success,
            data : stat
        });


    }catch(err){
        errHandeler(res,err);
    }


}


const topBasyMonth = async (req,res)=>{

    try{

        const year = req.params.year;

        const data = await Tours.aggregate([
            {
                $unwind: "$startDates"
            },
            {
                $match:{
                    startDates:{
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group:{
                    _id:{
                        $month:"$startDates"
                    },
                    num:{$sum:1},
                    tours:{$push : "$name"}
                }
            },
            {
                $addFields:{
                    month : "$_id"
                }
            },
            {
                $project:{ _id :0 }
            },
            {
                $sort:{num: -1}
            },
            // {
            //     $limit: 1
            // }
            
        ]);

        res.status(200).json({
            status : responseMSG.success,
            data : data
        });
    }catch(err){
        errHandeler(res,err);
    }
}


module.exports = {
    AllTours,
    addTour,
    singleTour,
    updateTour,
    deleteTour,
    toursState,
    topBasyMonth
}