import mongoose from "mongoose"



const connectmongo=async()=>{
    try{
 await mongoose.connect(process.env.MONGO_URL) //here we perfrom database connection
 
 console.log(" database conneted successfully")
    // if(connection.readyState==1){
    //     console.log("Database connected successfully....")
    // }


}
    catch(errors){
        return Promise.reject(errors)

    }
}
export default connectmongo;