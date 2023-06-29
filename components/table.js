import {BiEdit,BiTrashAlt} from 'react-icons/bi';  
// import data from '../database/data.json'
import { deleteVendor, getVendors } from './lib/helper';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { useSelector ,useDispatch} from 'react-redux';
import { toggleChangeAction,updateAction ,deleteAction} from '../redux/reducer';
import {addUser} from './Adduser'
import { useEffect, useState } from 'react';
// import{deletehandler} from '../pages/index'

export default function Table(){
    // console.log(getVendor()) here all the values are appear interms of promise
    // getVendor().then(res=>console.log(res))  //here all the vales are shown interms of array
    // const state=useSelector((state)=>state.app.client.toggleForm)
    // console.log(state)



    const{isLoading,isError,data,error}=useQuery('users',getVendors)
    if(isLoading) return <div>Vendor is loading</div>
    if(isError) return <div>got error {error}</div>

    
    return(
        <table className="min-w-full table-auto">
            <thead>
                <tr className="bg-gray-800">
                    <th className="px-4 py-2">
                        <span className="text-gray-200">Vendorname</span>
                    </th>
                    <th className="px-4 py-2">
                        <span className="text-gray-200">Bank Acc no</span>
                    </th>
                    <th className="px-4 py-2">
                        <span className="text-gray-200">Bank name</span>
                    </th>
                    <th className="px-4 py-2">
                        <span className="text-gray-200">AddressLine1</span>
                    </th>
                    <th className="px-4 py-2">
                        <span className="text-gray-200"> AddressLine2</span>
                    </th>
                    <th className="px-4 py-2">
                        <span className="text-gray-200"> city</span>
                    </th>
                    <th className="px-4 py-2">
                        <span className="text-gray-200"> country</span>
                    </th>
                    <th className="px-4 py-2">
                        <span className="text-gray-200"> Zipcode</span>
                    </th>
                    <th className="px-4 py-2">
                        <span className="text-gray-200"> Action</span>
                    </th>
                </tr>

            </thead>
            <tbody className="bg-gray-200">
                {
                     data?.map((obj,index)=><Tr{...obj}key={index}/>) 
                     // map used to access the array of objects
                     
                }
              

            </tbody>
        </table>
    )
        
}
function Tr({_id,name,accountno,accountname,address1,address2,city,country,zipcode}){
    const visible=useSelector((state)=>state.app.client.toggleForm)
    const dispatch=useDispatch()
    const querclient=useQueryClient()

    const onUpdate=()=>{
        dispatch(toggleChangeAction(_id))
        // console.log(visible)
        if(visible){
            dispatch(updateAction(_id))
        }
        

    



    }
    const deleteRow=()=>{
        if(!visible){
            dispatch(deleteAction(_id))
        }
    }

    const deletehandler= async(id)=>{
        if(id){
        await deleteVendor(id)
        await querclient.prefetchQuery('users',getVendors)
        // await dispatch(deleteAction(null))
        }
    }
    return(
        <tr className="bg-gray-50 text-center">
        <td className="px-4 py-2 flex-row items-center">
        <span>
            {name||"unknown"}
        </span>
        </td>
        <td className="px-4 py-2">
            <span>{accountno||"unknown"}</span>
        </td>
        <td className="px-4 py-2">
            <span>{accountname||"unknown"}</span>
        </td>
        <td className="px-4 py-2">
            <span>{address1||"unknown"}</span>
        </td>
        <td className="px-4 py-2">
            <span>{address2||"unknown"}</span>
        </td>
        <td className="px-4 py-2">
            <span>{city||"unknown"}</span>
        </td>
        <td className="px-4 py-2">
            <span>{country||"unknown"}</span>
        </td>
        <td className="px-4 py-2">
            <span>{zipcode||"unknown"}</span>
        </td>
        <td className="px-4 py-2 flex justify-around gap-5">
            <button className="cursor" onClick={onUpdate}><BiEdit size={25}color={"rgba(34,197,94) "}></BiEdit></button>
            <button className="cursor" onClick={()=>deletehandler(_id)}><BiTrashAlt size={25}color={"rgba(244,63,94) "}></BiTrashAlt></button>

        </td>
        
    </tr>

    )
}