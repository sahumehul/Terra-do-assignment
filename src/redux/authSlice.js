import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    message : "",
    user: "",
    token : "",
    loading: false,
    error : ""
}

export const signupUser = createAsyncThunk("signupuser", async(userData)=>{

    const result = await  fetch("http://localhost:5000/register",{
        method : "post",
        headers :{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(userData)
      })

    return await result;
})

const authSlice = createSlice({
    name :"user",
    initialState,
    reducers: {

    },
    extraReducers : {
        [signupUser.pending] : (state,action)=>{
            state.loading = true;
        },
        [signupUser.fulfilled] : (state,{payload : {error, message}})=>{
            state.loading = false;
            // if(error){
            //     state.error = error
            // }else{
            //     state.message = message
            // }
        },
        [signupUser.rejected] : (state,action)=>{
            state.loading = true;
        }
    }
})

export default authSlice.reducers;