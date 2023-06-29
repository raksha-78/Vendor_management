import connectmongo  from "../../../database/conn.js"
import {deleteVendor, getVendor,postVendor, updateVendor} from '../../../database/controller.js'

export default async function handler(req, res) {
    //here we check the any error in the connection of mongodb connection

    connectmongo().catch(()=>res.status(405).json({error:"error on connection"}))
    // In this methode we check the methodes if user makes the GET,POST,PUT ,DELETE  request here we perform the operation based on methode

     const {method}=req

     switch(method){  // it was for checking the request from user it will used in postman api checker
        case 'GET':
            getVendor(req,res)
            break; 
        case 'POST':
            postVendor(req,res)
            break; 
        case 'PUT':
            updateVendor(req,res)
            break; 
        case 'DELETE':
           deleteVendor(req,res)
            break; 
        default:
            res.setHeader('Allow',['GET','POST','PUT','DELETE']); 
            res.status(405).end(`Method ${method}Not allowed`)
        
     }
    }
    