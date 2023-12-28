import { Router } from "express";
import { findProds, findProductById, createProduct, deleteOneProduct, updateProduct } from '../controllers/products.controller.js';

const router = Router();
router.get("/", findProds);
router.get('/:pid', findProductById)
router.post("/", createProduct);
router.delete("/:pid", deleteOneProduct);
router.put("/:pid", updateProduct);



export default router