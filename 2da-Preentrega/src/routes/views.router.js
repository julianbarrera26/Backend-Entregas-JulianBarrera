import { Router } from "express";
import { productsManager } from "../dao/mongoDB/productsManagerMongo.js";
import { cartManager } from "../dao/mongoDB/cartManagerMongo.js";

const router = Router();

router.get("/",async(req,res)=>{
    const listadeproductos=await productsManager.getProductsView()
    res.render("home",{listadeproductos})
})

router.get("/products",(req,res)=>{
res.render("products")
})

router.get('/api/views/products/:id', async (req, res) => {  
    try {
        const { id } = req.params
        const product = await productsManager.getProductById(id)              
        res.render('product', { product: product.toObject(), style: "productDetail" });           
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  });

router.get("/", (req, res) => {
    res.render("chat");
});

router.get('/api/views/cart/:cid', async (req, res) => {  
    try {
      const { cid } = req.params
      const response = await cartManager.getCartById(cid)
      const array = response.products.map(doc => doc.toObject());    
      res.render('cart', {cartProductList: array,  style: "cart" })
  }
  catch (error){
      res.status(500).json({ message: error.message });
  }
  })
export default router;