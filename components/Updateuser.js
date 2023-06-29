import { useReducer } from "react"
import { BiBrush } from "react-icons/bi"
import Success from "./success"
import { useQueryClient, useMutation, useQuery,  } from "react-query"
import { getVendor,getVendors,updateVendor } from "./lib/helper"

// const formReducer=(state,event)=>{
//     return{
//         ...state,
//         [event.target.name]:event.target.value // access the all the values 
//     }
// }


export default function Updateuser({formId,formData,setFormData}){
   const queryClient=useQueryClient()
   const{isLoading,isError,data,error}= useQuery(['users',formId],()=>getVendor(formId))

   const UpdateMutation=useMutation((newData)=>{
    console.log(newData,'ooo',formId)
    updateVendor(formId,newData)
    
},{
    onSuccess:async(data)=>{
        queryClient.prefetchQuery('users',getVendors)
        console.log("data updated")
    }
   })
   if(isLoading)return <div>Loading.....</div>
   if(isError)return <div>Error.....</div>
    const{name,accountno,accountname,address1,address2,city,country,zipcode}=data

     //here we pass the values as object  and display in connsole
        const handleSubmit= async(e)=>{
        e.preventDefault();// deafult event

        // console.log('thi is the')

        let formData=new FormData(e.target)

        const formDataObject = Object.fromEntries(formData);

            // console.log(formData,'formData')
        // let updated=Object.assign({},data,formData,{})

        await UpdateMutation.mutate(formDataObject)

        if(Object.keys(formData).length==0) return console.log("FORM DATA VALUES ARE EMPTY"); /// if empty form submit
        console.log(formData)
    }
    

    // if(Object.keys(formData).length>0) return <Success message={"DATA ADDED SUCCESSFULLY"}></Success>

    return(
       
            <form className="grid lg:grid-cols-2 w-4/6 gap-4 justify-center" onSubmit={handleSubmit}>
                <div className="input-type">
                    <input type="text"  defaultValue={name} className="border w-full px-5 py-3 focus:outline-none rounded-md" name="name" placeholder="VendorName"/>
                </div>
                <div className="input-type">
                    <input type="number"  defaultValue={accountno} className="border w-full px-5 py-3 focus:outline-none rounded-md" name="accountno" placeholder="Bank Account no"/>
                </div>
                <div className="input-type">
                    <input type="text"  defaultValue={accountname} className="border w-full px-5 py-3 focus:outline-none rounded-md" name="accountname" placeholder="Bank Account name"/>
                </div>
                <div className="input-type">
                        <input type="text"  defaultValue={address1}className="border w-full px-5 py-3 focus:outline-none rounded-md" name="address1" placeholder="AddressLine1"/>
                </div>
                <div className="input-type">
                    <input type="text" defaultValue={address2}  className="border w-full px-5 py-3 focus:outline-none rounded-md" name="address2" placeholder="AddressLine2"/>
                </div>
                <div className="input-type">
                    <input type="text"  defaultValue={city} className="border w-full px-5 py-3 focus:outline-none rounded-md" name="city" placeholder="City"/>
                </div>                 
                <div className="input-type">
                    <input type="text"  defaultValue={country}  className="border w-full px-5 py-3 focus:outline-none rounded-md" name="country" placeholder="Country"/>
                </div>
                <div className="input-type">
                    <input type="number"  defaultValue={zipcode} className="border w-full px-5 py-3 focus:outline-none rounded-md" name="zipcode" placeholder="Zipcode"/>
                </div>
            <button className="flex justify-center  text-md w-4/6 bg-pink-500 text-white px-4 py-2 border-rounded-md hover:bg-gray-500 hover:border-green-500 hover:text-green-500">UpdateUser
            <span className="px-1"><BiBrush size={24}></BiBrush></span></button>
            </form>
    )
}