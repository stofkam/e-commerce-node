import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth/auth-routes"
import productRouter from "./routes/admin/products-routes"
import adminOrderRouter from "./routes/admin/order-routes"
import commonFeatureRouter from "./routes/common/feature-routes"


const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control","Expires","Pragma"],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRouter);
app.use("/api/admin/products", productRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/common/feature", commonFeatureRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
