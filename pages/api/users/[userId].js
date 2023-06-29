import connectmongo  from "../../../database/conn.js"
import {deleteVendor, takesinglevendor, updateVendor} from '../../../database/controller.js'

export default async function handler(req, res) {
    connectmongo().catch(()=>res.status(405).json({error:"error on connection"}))
    //type of request

    const{method}=req

    switch(method){
        case "GET":
            takesinglevendor(req,res);
            break;
        case "PUT":
            updateVendor(req,res)
            break;
        case "DELETE":
            deleteVendor(req,res)
            break;
         default:
             res.setHeader('Allow',['GET','POST','PUT','DELETE']); 
            res.status(405).end(`Method ${method}Not allowed`)
            
    }


}
