import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    message : "",
    user: "",
    tasks :[],
    token : "",
    loading: false,
}

export const getData = createAsyncThunk("getdata", async(userData)=>{

    const result = await  fetch("http://localhost:5000/gettasks")

    return await result.json();
})


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

export const addTask = createAsyncThunk("addtask", async(tasks)=>{

    const result = await  fetch("http://localhost:5000/addtask",{
        method : "post",
        headers :{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(tasks)
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
        },
        editData(state, action) {
            const { id, newData } = action.payload;
            const index = state.data.findIndex((item) => item.id === id);
            if (index !== -1) {
              state.data[index] = { ...state.data[index], ...newData };
            }
          },
          deleteData(state, action) {
            const idToDelete = action.payload;
            state.data = state.data.filter((item) => item.id !== idToDelete);
          }
    },
    extraReducers : {
        [signupUser.pending] : (state)=>{
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
        [signupUser.rejected] : (state)=>{
            state.loading = true;
        },
        [signinUser.pending] : (state)=>{
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
        [signinUser.rejected] : (state)=>{
            state.loading = true;
        },
        [addTask.pending] : (state)=>{
            state.loading = true;
        },
        [addTask.fulfilled] : (state,action)=>{
            state.loading = false;
            state.user =action.payload
        },
        [addTask.rejected] : (state)=>{
            state.loading = true;
        },
        
    }
})

export const {addToken,addUser,logout,editData, deleteData} = authSlice.actions;
export default authSlice.reducers;