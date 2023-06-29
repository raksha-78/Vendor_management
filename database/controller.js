import mongoose from "mongoose";
import Users from "../model/user";
import connectmongo from "./conn";
// import users from "../model/user.js";

// get http://localhost:3000/api/users
export async function getVendor(req, res) {
  try {
    // console.log("hello getvendor")
    await connectmongo();

    const user = await Users.find({}); //  await for asynchronus  here we find the all the documents from mongdbschema

    if (!user?.length) return res.status(404).json({ error: "Data not Found" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error, "error form the getVendor");
    res.status(404).json({ error: "Error on fetching the data" });
  }
}

export async function takesinglevendor(req,res){ // it will passed to userid js for select the one user based on request
  
  try {
    console.log("hellowwwwww singlevwndor")
    await connectmongo();

    const{userId}=req.query
// egga try maaadu ella battilla wait wait maadu // user id haaku illi yella haak nin alle
    //yenta madta eddya ,taaalo lwde ega onde value batt kaan terminal alli
    //64981ab767902971ee487ed1

    //64981a6867902971ee487ecf

    // http://localhost:3000/api/users/64981a6867902971ee487ecf
    if(userId){
      console.log("hitting",userId)
      const user=await Users.findOne({_id:new mongoose.Types.ObjectId(userId)});
      return res.status(200).json({msg:"success",data:user})
      console.log(user)
    }
    res.status(404).json({error:"user not selectd"})
  } catch (error) {
    console.log(error,"error from the takesinglevendor")
    res.status(404).json({error:"cannot get the user"})
    
  }

}

// post http://localhost:3000/api/users

export async function postVendor(req, res) {
  console.log("hitting");
  try {
    await connectmongo();

    const formdata = req.body;
    if (!formdata)
      return res.status(404).json({ error: "Data not provided..." });

    const data = await Users.create(formdata);
    console.log("mojer fucker")
    return res.json({ msg: "creadted successfully", data });
  } catch (error) {
    console.log(error, "error from the postVendor");
    return res.status(404).json({ error });
  }
}

//update

export const updateVendor = async (req, res) => {
  try {
    const { userId } = req.query;
    await connectmongo();
    
    
    console.log(req?.body,'swarht')
    console.log(userId,'user id')

    let ss=await Users.findByIdAndUpdate(
      
        new mongoose.Types.ObjectId(userId),
      
      
            req.body      
    );
    console.log(ss,"ddddddddddddd")
    return res.status(200).json({ msg: "successs" });
  } catch (error) {
    console.log(error, "error from the ");
    return res.status(404).json({ error });
  }
};
// export const updateVendor = async (req, res) => {
//   try {
//     await connectmongo();
//     const{userId}=req.query;
//     const{formData}=req.body;

//     if(userId&&formData){
//       await Users.findByIdAndUpdate(userId,formData);
//       req.status(200).json(formData)
//     }
//     req.status(404).json({error:"user not selected"})
//   }
//   catch(error){
//     res.status(404).json({error:"error while updateing"})
//   }
// }



//delete user

export const deleteVendor = async (req, res) => {
    try {
      const { userId } = req.query;
      await connectmongo();
  
      if(userId){
        const user=await Users.findByIdAndDelete(userId)
        return res.status(200).json({deleted:id})           // here we pass the id through url
      }
      return res.status(404).json({ error: "usernot selected" });
    } catch (error) {
      console.log(error, "error from the ");
      return res.status(404).json({ error :"error on deleting the user"});
    }
  };