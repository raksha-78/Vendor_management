import { Schema,model,models } from "mongoose";

const UserSchema=new Schema({


    name:String,
    accountno:Number,
    accountname:String,
    address1:String,      // here we create the database table model schema using mongoose schema
    address2:String,
    city:String,
    country:String,
    zipcode:Number
})
const Users= models.user || model('user',UserSchema) // it will create a new model in mongodb databse

export default Users;