class ApiFetures{

    constructor(data, query){
        this.query = query;
        this.data = data;
    }


    filtering(){
        let Objquery = {...this.query};
        const executeQueries = ['page' , 'sort' ,'limit','fields' , 'select'];

        executeQueries.forEach(element => {
            delete Objquery[element];
        });

        let strQuery = JSON.stringify(Objquery)
        .replace(/\b(gt|gte|lt|lte)\b/g , match => `$${match}`);

        this.data = this.data.find(JSON.parse(strQuery));


        return this;
    }


    sorting(){

        if(this.query.sort){
            this.data = this.data.sort(this.query.sort.split(',').join(' ')) 
        }else{
            this.data = this.data.sort('-CreatedAt') 
        }


        return this;
    }



    selecting(){


        if(this.query.select){
            this.data = this.data.select(this.query.select.split(',').join(' ')) 
        }else{
            this.data = this.data.select("-__v")
        }


        return this;
    }


    pagination(){
        let page = this.query.page * 1 || 1;
        let limit = this.query.limit * 1 || 100;
        let skip = (page-1)*limit;


        // if(req.query.page){
        //     const dataLength = await Tours.countDocuments();
        //     // console.log(dataLength);
        //     // console.log(skip);
        //     if(skip>=dataLength){
        //         throw('This page Not have any data ');
        //     }
        // }

        this.data = this.data.skip(skip).limit(limit);


        return this;
    }
}


module.exports = ApiFetures;