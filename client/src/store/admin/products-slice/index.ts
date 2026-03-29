import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface ProductList{
    image:string        
    title:string,         
    description:string 
    category:string     
    brand:string        
    price:number        
    salePrice:number    
    totalStock:number   
    averageReview:number 
}

interface ProductState{
    isLoading:boolean
    productList:ProductList[]
}

interface FormAsybcThunk{
    formData:ProductList
    id:number
}

const initialState:ProductState = {
    isLoading:false,
    productList:[]
}

export const addNewProduct = createAsyncThunk(
    "products/addnewproduct",
    async (formData:ProductList) =>{
        const result = await axios.post(
            "http://localhost:5000/api/admin/products/add", formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        return result?.data
    }
)

export const fetchAllProducts = createAsyncThunk(
    "products/fetchAllproducts",
    async () =>{
        const result = await axios.get(
            "http://localhost:5000/api/admin/products/get",
        )

        return result?.data
    }
)

export const editProduct = createAsyncThunk(
    "products/editProduct",
    async ({id,formData}:FormAsybcThunk) =>{
        const result = await axios.put(`
            http://localhost:5000/api/admin/products/edit/${id}`, formData,{
                headers: {
                    "Content-Type": "application/json",
                },
            })

        return result?.data
    }
)

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id:number) =>{
        const result = await axios.delete(`
            http://localhost:5000/api/admin/products/delete/${id}`)

        return result?.data
    }
)

const AdminProductsSlice = createSlice({
   name:"adminProducts",
   initialState,
   reducers:{ },
   extraReducers:(builder)=>{
       builder.addCase(fetchAllProducts.pending,(state)=>{
           state.isLoading = true
       })
       .addCase(fetchAllProducts.fulfilled,(state,action)=>{
           state.isLoading = false
           state.productList = action.payload.data
       })
       .addCase(fetchAllProducts.rejected,(state)=>{
           state.isLoading = false
           state.productList = []
       })
   }
})

export default AdminProductsSlice.reducer