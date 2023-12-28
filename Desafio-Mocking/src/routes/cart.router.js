import { Router } from "express";
import { createACart, findCart, addProductToCart, deleteFromCart, updateProducts, updateProdQuantity, deleteAllProductsCart } from "../controllers/carts.controller.js";
import { purchase } from "../services/carts.service.js";
import { rollUserVerify } from "../middleware/rollVerify.js";

const router = Router();


router.post('/', createACart)
router.get('/:cid', findCart)
router.post('/:cid/products/:pid', rollUserVerify, addProductToCart)
router.delete('/:cid/products/:pid', rollUserVerify,  deleteFromCart)
router.put('/:cid', updateProducts)
router.put('/:cid/products/:pid', updateProdQuantity)
router.delete('/:cid', deleteAllProductsCart)
router.get("/:idCart/purchase", purchase);


export default router