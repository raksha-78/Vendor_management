import { BiCheck } from "react-icons/bi"


export default function Success({message}){

    return(

        <div className="Success container mx-auto">
            <div className="flex justify-center mx-auto border-yellow-200  bg-yellow-300 w-3/6 text-gray-900 text-md my-4 py-2 text-center">
            {message}<BiCheck size={35} color="green"></BiCheck>
            </div>
        </div>
    )
}