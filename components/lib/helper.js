
const BASE_URL="http://localhost:3000/"

export const getVendors= async()=>{
     const response= await fetch(`/api/users/`) 
     //this function return the all the values from mongodb database
     console.log(response)
    const json= await response.json()
    return json;



    }   

    //single user
export const getVendor=async(userId)=>{
     console.log(userId,'this is userid')
     const response=await fetch(`/api/users/${userId}`)
     // console.log(response,"mesagenotcme")
     const json= await response.json()
      if(json) return json;
      return{}
}

//posting a user

export async function addVendor(formData){
     console.log(formData,"ayyo")
     try {
          const Options={
               method:'POST',
               headers:{'content-type':"application/json"},
               body:JSON.stringify(formData)

          }
          const response=await fetch(`/api/users`,Options)
          const json= await response.json()

          return json
          
     } catch (error) {
          return error;
          
     }

}

//update the api
export async function updateVendor(userId,formData){

     console.log(formData,'formDataObject')
try {
     const Options={
          method:'PUT',
          headers:{'content-type':"application/json"},
          body:JSON.stringify(formData)

     }
     const response=await fetch(`/api/users/${userId}`,Options)
          const json= await response.json()
          return json

     
} catch (error) {
     return error
}
    
}

//delete user

export async function deleteVendor(userId){
     console.log('deleted id',userId)
     try {
          const Options={
               method:'DELETE',
               headers:{'content-type':"application/json"},
     
          }
          const response=await fetch(`${BASE_URL}api/users/${userId}`,Options)
               const json= await response.json()
               return json
     
          
     } catch (error) {
          return error
     }
         
     }
     
