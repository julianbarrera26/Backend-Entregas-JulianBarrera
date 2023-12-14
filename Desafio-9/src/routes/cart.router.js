import { Router } from "express";
import { createACart, findCart, addProductToCart, deleteFromCart, updateProducts, updateProdQuantity, deleteAllProductsCart } from "../controllers/carts.controller.js";


const router = Router();


router.post('/', createACart)
router.get('/:cid', findCart)
router.post('/:cid/products/:pid', addProductToCart)
router.delete('/:cid/products/:pid', deleteFromCart)
router.put('/:cid', updateProducts)
router.put('/:cid/products/:pid', updateProdQuantity)
router.delete('/:cid', deleteAllProductsCart)



export default router