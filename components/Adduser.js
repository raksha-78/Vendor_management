import { useReducer } from "react"
import { BiPlus } from "react-icons/bi"
import Success from "./success"

import { useQueryClient,useMutation } from "react-query"
import { addVendor,getVendor } from "./lib/helper"

// const formReducer=(state,event)=>{
//     return{
//         ...state,
//         [event.target.name]:event.target.value // access the all the values 
//     }
// }

export default function Adduser(setFormData){
    const queryClient=useQueryClient()

    const addMutation=useMutation(addVendor,{
        onSuccess:()=>{
            queryClient.invalidateQueries(['users'])
           
        }
    })
    
    const handleSubmit=(e)=>{
        e.preventDefault();// deafult event
        // if(Object.keys(formData).length==0) return alert("Empty feilds..."); /// if empty form submit
        
        let formData=new FormData(e.target)


        let{name,accountno,accountname,address1,address2,city,country,zipcode}=formData;
  
        console.log('sdasd',formData.get('name'))
        const model={
            name:formData.get('name'),
            accountno:formData.get('accountno'),
            accountname:formData.get('accountname'),
            address1:formData.get('address1'),      // here we create the database table model schema using mongoose schema
            address2:formData.get('address2'),
            city:formData.get('city'),
            country:formData.get('country'),
            zipcode:formData.get('zipcode')
        }

        addMutation.mutate(model)



    }
    // if(Object.keys(formData).length>0) return <Success message={"DATA ADDED SUCCESSFULLY"}></Success>

    if(addMutation.isLoading)return <div>loading....!</div>
    if(addMutation.isError)return <div>Error....!</div>
    if(addMutation.isSuccess) return <Success message={"Added Successfully"}></Success>

    return(
       
            <form className="grid lg:grid-cols-2 w-4/6 gap-4 justify-center" onSubmit={handleSubmit}>
                <div className="input-type">
                    <input type="text" className="border w-full px-5 py-3 focus:outline-none rounded-md" name="name" placeholder="VendorName"/>
                </div>
                <div className="input-type">
                    <input type="number"  className="border w-full px-5 py-3 focus:outline-none rounded-md" name="accountno" placeholder="Bank Account no"/>
                </div>
                <div className="input-type">
                    <input type="text"  className="border w-full px-5 py-3 focus:outline-none rounded-md" name="accountname" placeholder="Bank Account name"/>
                </div>
                <div className="input-type">
                        <input type="text" className="border w-full px-5 py-3 focus:outline-none rounded-md" name="address1" placeholder="AddressLine1"/>
                </div>
                <div className="input-type">
                    <input type="text" className="border w-full px-5 py-3 focus:outline-none rounded-md" name="address2" placeholder="AddressLine2"/>
                </div>
                <div className="input-type">
                    <input type="text"  className="border w-full px-5 py-3 focus:outline-none rounded-md" name="city" placeholder="City"/>
                </div>                 
                <div className="input-type">
                    <input type="text"  className="border w-full px-5 py-3 focus:outline-none rounded-md" name="country" placeholder="Country"/>
                </div>
                <div className="input-type">
                    <input type="number"   className="border w-full px-5 py-3 focus:outline-none rounded-md" name="zipcode" placeholder="Zipcode"/>
                </div>
            <button type="submit" className="flex justify-center  text-md w-4/6 bg-green-500 text-white px-4 py-2 border-rounded-md hover:bg-gray-500 hover:border-green-500 hover:text-green-500">Add User
            <span className="px-1"><BiPlus size={24}></BiPlus></span></button>
            </form>
    )
}