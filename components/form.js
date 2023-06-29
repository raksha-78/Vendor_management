import { useReducer } from "react"
import { BiPlus } from "react-icons/bi"
import Success from "./success"
import Adduser from "./Adduser"
import Updateuser from "./Updateuser"
import { useSelector } from "react-redux"

const formReducer=(state,event)=>{
    return{
        ...state,
        [event.target.name]:event.target.value // access the all the values 
    }
}




export default function Form(){
    const[formData,setFormData]=useReducer(formReducer,{})  
    const formId=useSelector((state)=>state.app.client.formId)
   
//    console.log(flag,'flag')
    return(
        <div className='container mx-auto py-5'>
        {formId?Updateuser({formId,formData,setFormData}):Adduser({formData,setFormData})}
        </div>
    )
    
}