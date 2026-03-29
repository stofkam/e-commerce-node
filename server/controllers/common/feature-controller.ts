import { prisma } from "../../lib/prisma";
import { Request, Response,NextFunction } from 'express';

export const addFeatureImage = async (req:Request, res:Response) => {
   
     try {
        const {image} = req.body
        const featureImage = await prisma.feature.create({
            data: {
                image
            }
        })
        return res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            data: featureImage
        })
     } catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Some error occured"
        })
     }


}

export const getFeatureImages = async (req:Request, res:Response) => {
    try {
        const featureImages = await prisma.feature.findMany()
        return res.status(200).json({
            success: true,
            data: featureImages
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}
       