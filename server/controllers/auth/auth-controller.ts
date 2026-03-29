import { prisma } from "../../lib/prisma"
import { Request, Response,NextFunction } from 'express';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
type Requests = {
    body: {
        name: string
        email: string
        password: string
    }
}
type RequestLogin = {
    body: {
       
        email: string
        password: string
    }
}

interface AuthRequest extends Request {
    user?:{
         name: string
        email: string
        id:    string
        role : string
    }
}
export const registerUser = async (req:Request, res:Response) => {
    const { name, email, password } = req.body as unknown as Requests["body"]

    try {
        const checkUser = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (checkUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 12)

         const newUser = await prisma.user.create({
            data: {
                email,
                password: hashPassword,
               name
            }
        })

        return res.status(200).json({
            success: true,
            message: "User created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const loginUser = async (req:Request, res:Response) =>{
    const { email, password } = req.body as unknown as RequestLogin["body"]

    try {
        const checkUser = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password)

        if (!checkPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }

        const token = jwt.sign({
            id: checkUser.id,
            email: checkUser.email,
            name: checkUser.name,
            role: checkUser.role
        },"CLIENT_SECRET_KEY",{expiresIn: "60m"})

        res.cookie("token", token, {
            httpOnly: true,
            secure: false
        }).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: checkUser.id,
                email: checkUser.email,
                name: checkUser.name,
                role: checkUser.role
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const logoutUser = async (req:Request, res:Response) =>{
   res.clearCookie("token").json({
       success: true,
       message: "User logged out successfully"
   })
}

export const authMiddleware = async (req:AuthRequest, res:Response, next:NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized user!"
        });
    }
    try {
        const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
        req.user = decoded as  AuthRequest["user"];
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized user!"
        });
    }
}