import { Router } from "express";
import { cartsManager } from "../CartsManager.js";

const router = Router();
    
 router.post ('/', async (req,res)=>{
    try{
    const newCart = cartsManager.createCart();
    res.status(201).json({message:'Carrito creado', cart: newCart});
    }catch(error){
        res.status(500).json({message:error.message});
    }

 });

 router.get('/:idCart', async(req,res)=>{
    const cartId = req.params.cartId;
    try {
        const cart = await cartsManager.getCartById(+cartId);
        if (!cart) {
          return res.status(404).json({ message: "carrito not found" });
        }
        res.status(200).json({ message: "carrito found", cart });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }

 });

 router.post ('/:idCart/product/idProduct', async (req,res)=>{
    const { cid, pid } = req.params;
    const { quantify } = req.body;
    try {
      await cartsManager.addProductToCart(+cid,+pid,quantify);
      res.status(200).json({ message: "Product Agregado", product: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

 });
  export default router;