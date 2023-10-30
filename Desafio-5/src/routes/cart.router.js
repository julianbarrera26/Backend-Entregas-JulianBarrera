import { Router } from "express";
import { cartManager } from "../dao/mongoDB/cartManagerMongo.js";


const router = Router();

router.post('/:cid', async (req, res)=>{
    try {        
        const response = await cartManager.createCart()
        res.status(200).json({message: 'Cart created', cart: response })
    }
    catch (error){
        res.status(500).json({ message: error.message });
    }
})



router.post('/:cid/products/:pid', async (req, res) =>{    
    try{
        const {cid, pid} = req.params        
        const response = await cartManager.addProductToCart(cid, pid)        
        res.status(200).json({message: "Product added to cart", productAdded: response})        
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
})




router.get('/:cid', async (req, res)=>{
    try {
        const { cid } = req.params
        const response = await cartManager.getCartProducts(cid)        
        res.status(200).json({message: 'Cart founded', cartProducts: response.products })
    }
    catch (error){
        res.status(500).json({ message: error.message });
    }
})



export default router