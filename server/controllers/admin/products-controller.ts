import { prisma } from "../../lib/prisma";
import { Request,Response } from "express";

export  const handleImageUpload = async (req:Request,res:Response) =>{
   const {image} = req.body
   if(!image){
    return res.status(400).json({
        success: false,
        message: "Image not found"
    })
   }

try {
    const newImage = await prisma.feature.create({
        data: {
            image
        }
    })
  return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      image: newImage
  })
} catch (error) {
    console.log(error)

    return res.status(500).json({
        success: false,
        message: "Some error occured"
    })
}
}

export const addProduct = async (req:Request, res:Response) =>{

    try {
        const { 
            image ,        
            title,         
            description ,  
            category  ,    
            brand  ,       
            price  ,       
            salePrice   ,  
            totalStock   , 
            averageReview 
        } = req.body

        const newProduct = await prisma.product.create({
            data: {
                image,        
                title,         
                description ,  
                category  ,    
                brand  ,       
                price: parseInt(price)  ,       
                salePrice: parseInt(salePrice)   ,  
                totalStock :parseInt(totalStock)  , 
                averageReview: parseInt(averageReview) 
            }
        })
        if(newProduct){
            return res.status(200).json({
                success: true,
                message: "Product added successfully",
                data: newProduct
            })
        }
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Some error occured"
        })
        
    }
}

export const fetchAllProducts = async (req:Request, res:Response) =>{
 try {
    const listOfProducts = await prisma.product.findMany()
    res.status(200).json({
        success: true,
        data: listOfProducts
    })
 } catch (error) {
    console.log(error)

    return res.status(500).json({
        success: false,
        message: "Some error occured"
    })
 }
}

export const editProduct = async (req:Request, res:Response) =>{        
    try {
        const { 
            image ,        
            title,         
            description ,  
            category  ,    
            brand  ,       
            price  ,       
            salePrice   ,  
            totalStock   , 
            averageReview 
        } = req.body

        const updatedProduct = await prisma.product.update({
            where: {
                id: +req.params.id
            },
            data: {
                image,        
                title,         
                description ,  
                category  ,    
                brand  ,       
                price: parseInt(price)  ,         
                salePrice:parseInt(salePrice)   ,  
                totalStock:parseInt(totalStock)  ,    
                averageReview:  parseInt(averageReview)
            }
        })
        if(updatedProduct){
            return res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: updatedProduct
            })
        }
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Some error occured"
        })
        
    }    
}

export const deleteProduct = async (req:Request, res:Response) =>{        
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                id: +req.params.id
            }
        })
        if(deletedProduct){
            return res.status(200).json({
                success: true,
                message: "Product deleted successfully",
              
            })
        }
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Some error occured"
        })
        
    }    
}   



