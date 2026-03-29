import express from 'express'
import { addProduct, deleteProduct, editProduct, fetchAllProducts, handleImageUpload } from '../../controllers/admin/products-controller'

const router = express.Router()

router.post("/upload-image", handleImageUpload)
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct)
router.get("/get", fetchAllProducts);

export default router