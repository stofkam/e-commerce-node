
import express from "express"
import { authMiddleware, loginUser, logoutUser, registerUser } from "../../controllers/auth/auth-controller"
import { Request, Response,NextFunction } from 'express';
const router = express.Router()

interface AuthRequest extends Request {
    user?:{
         name: string
        email: string
        id:    string
        role : string
    }
}

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout",logoutUser)
router.get("/check-out",authMiddleware, (req:AuthRequest, res:Response) =>{
    const user = req.user as AuthRequest["user"];
    return res.status(200).json({
        success: true,
        message: "User is authenticated",
        user
    })
} )
    


export default router