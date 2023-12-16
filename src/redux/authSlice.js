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

    return await result.json();
})

export const signinUser = createAsyncThunk("signinuser", async(userData)=>{

    const result = await  fetch("http://localhost:5000/login",{
        method : "post",
        headers :{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(userData)
      })

    return await result.json();
})

const authSlice = createSlice({
    name :"user",
    initialState,
    reducers: {
        addToken : (state,action)=>{
            state.token = localStorage.getItem("token")
        },
        addUser : (state,action)=>{
            state.user = localStorage.getItem("user")
        },
        logout : (state,action)=>{
            state.token = null;
            localStorage.clear()
        }
    },
    extraReducers : {
        [signupUser.pending] : (state,action)=>{
            state.loading = true;
        },
        [signupUser.fulfilled] : (state,{payload : {error, message}})=>{
            state.loading = false;
            if(error){
                state.error = error
            }else{
                state.message = message
            }
        },
        [signinUser.rejected] : (state,action)=>{
            state.loading = true;
        },
        [signinUser.pending] : (state,action)=>{
            state.loading = true;
        },
        [signinUser.fulfilled] : (state,{payload : {error, message,token,user}})=>{
            state.loading = false;
            if(error){
                state.error = error
            }else{
                state.message = message;
                state.token = token;
                state.user = user;
            }
        },
        [signinUser.rejected] : (state,action)=>{
            state.loading = true;
        },
    }
})

export const {addToken,addUser,logout} = authSlice.actions;
export default authSlice.reducers;