import { Router } from "express";
import { cartManager } from "../dao/mongoDB/cartManagerMongo.js";
import { productsManager } from "../dao/mongoDB/productsManagerMongo.js"


const router = Router();

router.post("/", async (req, res) => {
    const cart = await cartManager.createCart();
    res.json({ cart });
  });



  router.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await cartManager.addProductInCart(cid, pid);
    res.json({ cart });
  });


router.put('/:cid', async (req, res) => {
 try {
     const { cid } = req.params;
     const { products } = req.body;

     for (const product of products) {
         const checkId = await productsManager.getProductById(product._id);

         if (!checkId) {
             return res.status(404).send({ status: 'error', message: `The ID product: ${product._id} not found` });
         }
     }


     const checkIdCart = await cartManager.getCartById(cid);
     if (!checkIdCart) {
         return res.status(404).send({ status: 'error', message: `The ID cart: ${cid} not found` });
     }

     const cart = await cartManager.updateProductsInCart(cid, products);
     return res.status(200).send({ status: 'success', payload: cart });
 } catch (error) {
     console.log(error);
     return res.status(500).send({ status: 'error', message: 'An error occurred while processing the request' });
 }
});


router.delete('/:cid/product/:pid', async (req, res) => {
 try {
   
     const { cid, pid } = req.params;

     const checkIdProduct = await productsManager.getProductById(pid);
     if (!checkIdProduct) {
         return res.status(404).send({ status: 'error', message: `Product with ID: ${pid} not found` });
     }


     const checkIdCart = await cartManager.getCartById(cid);
     if (!checkIdCart) {
         return res.status(404).send({ status: 'error', message: `Cart with ID: ${cid} not found` });
     }

    
     const findProductIndex = checkIdCart.products.findIndex((product) => product._id.toString() === pid);
     if (findProductIndex === -1) {
         return res.status(404).send({ status: 'error', message: `Product with ID: ${pid} not found in cart` });
     }


     checkIdCart.products.splice(findProductIndex, 1);

     const updatedCart = await cartManager.deleteProductInCart(cid, checkIdCart.products);

     return res.status(200).send({ status: 'success', message: `Deleted product with ID: ${pid}`, cart: updatedCart });
 } catch (error) {
     console.log(error);
     return res.status(500).send({ status: 'error', message: 'An error occurred while processing the request' });
 }
});



  router.delete('/:cid', async (req, res) => {
   try {
     const { cid } = req.params;
     const cart = await cartManager.getCartById(cid);
 
     if (!cart) {
       return res.status(404).send({ message: `Cart with ID: ${cid} not found` });
     }
 
     if (cart.products.length === 0) {
       return res.status(404).send({ message: 'The cart is already empty' });
     }
 
     cart.products = [];
 
     await cartManager.updateOneProduct(cid, cart.products);
 
     return res.status(200).send({
       status: 'success',
       message: `The cart with ID: ${cid} was emptied correctly`,
       cart: cart,
     });
   } catch (error) {
     console.log(error);
     return res.status(500).send({ message: 'An error occurred while processing the request' });
   }
 });



router.get("/", async(req,res)=>{
    const carrito=await cartManager.getCarts()
    res.json({carrito})
 })


 router.get("/:cid",async(req,res)=>{
    const{cid}=req.params
      const carritofound = await cartManager.getCartById(cid)
      res.json({status:"success",carritofound})
  })
  



export default router