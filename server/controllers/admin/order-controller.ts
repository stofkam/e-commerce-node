import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";

export const getAllOrdersOfAllUsers = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany();
        if (!orders) {
            return res.status(404).json({
                success: false,
                message: "No orders found",
            });
        }
     return    res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
}

export const getAllOrderDetailsForAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await prisma.order.findUnique({
            where: {
                id: +id
            }
        })
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "No order found",
            });
        }
        return res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
}

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;
        const order = await prisma.order.update({
            where: {
                id: +id
            },
            data: {
                orderStatus
            }
        })
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "No order found",
            });
        }
        return res.status(200).json({
            success: true,
           message: "Order status updated successfully",       
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
}