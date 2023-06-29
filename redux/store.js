import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import listenerMiddleware from "./listner";


export const store=configureStore ({
    
    reducer:{
       app:reducer,
    
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().prepend(listenerMiddleware.middleware) 
})