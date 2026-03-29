import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

interface AuthState{
    isAuthenticated:boolean,
    isLoading:boolean,
    user:{
        name:string,
        email:string,
        id:number,
        role:string
    } | null
}

type FormDatas = {
    name?: string,
    email: string,
    password: string,
}

const initialState:AuthState={
   isAuthenticated:false,
   isLoading:true,
   user:null
}

export const registerUser=createAsyncThunk('auth/register',async(formData:FormDatas)=>{
    const response = await axios.post("http://localhost:5000/api/auth/register", formData, { withCredentials: true });
    return response.data
})

export const loginUser=createAsyncThunk('auth/login',async(formData:FormDatas)=>{
    const response = await axios.post("http://localhost:5000/api/auth/login", formData, { withCredentials: true });
    return response.data
})

export const logoutUser=createAsyncThunk('auth/logout',async()=>{
    const response = await axios.post("http://localhost:5000/api/auth/logout",{}, { withCredentials: true });
    return response.data
})

export const checkAuth=createAsyncThunk('auth/checkauth',async()=>{
    const response = await axios.get("http://localhost:5000/api/auth/check-out", {
         withCredentials: true,
        headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
        
        });
    return response.data
})


const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
   
        setUser:()=>{}
    },
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(registerUser.fulfilled,(state)=>{
            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
        })
        .addCase(registerUser.rejected,(state)=>{
            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
        })
        .addCase(loginUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isAuthenticated=action.payload.success
            state.user=action.payload.success ? action.payload.user : null
        })
        .addCase(loginUser.rejected,(state)=>{
            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
        })
        .addCase(checkAuth.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(checkAuth.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isAuthenticated=action.payload.success
            state.user=action.payload.success ? action.payload.user : null
        })
        .addCase(checkAuth.rejected,(state)=>{
            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
        })

        .addCase(logoutUser.fulfilled,(state)=>{
            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
        })
    
   
}})

export const {setUser}=authSlice.actions
export default authSlice.reducer