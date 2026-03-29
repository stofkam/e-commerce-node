
import express from "express"
import { getAllOrdersOfAllUsers, getAllOrderDetailsForAdmin, updateOrderStatus } from "../../controllers/admin/order-controller"

const router = express.Router()
router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getAllOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);

export default router