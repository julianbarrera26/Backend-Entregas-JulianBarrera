import { Router } from "express";
import { productsManager } from "../dao/mongoDB/productsManagerMongo.js";
import { cartManager } from "../dao/mongoDB/cartManagerMongo.js";

const router = Router();

router.get("/login", (req, res) => {  
  if (req.session.passport){
    return res.redirect('/home')
  }  
  res.render("login", {style: "login"});  
});


router.get("/signup", (req, res) => {  
  if (req.session.passport){
    return res.redirect('/home')
  }   
  res.render("signup", {style: "signup"});
});




router.get("/home", async (req, res) => {  
  res.status(200).render('products', { stylesheet: 'products' })
});


router.get("/restaurar", (req, res) => {
  res.render("restore", {style: "restore"});
});


router.get("/error", (req, res) => {
  res.render("error", {style: "error"});
});







router.get('/home/:id', async (req, res) => {  
  try {
      const { id } = req.params
      const product = await productsManager.findById(id)              
      res.render('product', { product: product.toObject(), style: "productDetail" });           
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});



router.get('/cart/:cid', async (req, res) => {  
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