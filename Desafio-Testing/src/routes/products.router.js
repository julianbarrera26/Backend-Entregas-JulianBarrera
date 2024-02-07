import { Router } from "express";
import { findProds, findProductById, createProduct, deleteOneProduct, updateProduct, productMocksController } from '../controllers/products.controller.js';

const router = Router();
router.get("/", findProds);
router.get('/:pid', findProductById)
router.post("/", createProduct);
router.delete("/:pid", deleteOneProduct);
router.put("/:pid", updateProduct);
router.get('/mock/mockingproducts', productMocksController);



export default router