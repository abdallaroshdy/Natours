const responseMSG = require('./ResponseMessages')


module.exports = (res , err)=>{

    let error = err;

    if(err.message){
        error = err.message;
    }else if(err.errorResponse && err.errorResponse.errmsg){
        error = err.errorResponse.errmsg;
    }

    res.status(400).json({
        status : responseMSG.fail, 
        massage : error 
    });

}