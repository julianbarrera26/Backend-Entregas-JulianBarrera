import { Router } from "express";
import { productsManager } from "../dao/mongoDB/productsManagerMongo.js";

const router = Router();

router.get("/",async(req,res)=>{
    const listadeproductos=await productsManager.getProductsView()
    res.render("home",{listadeproductos})
})

router.get("/products",(req,res)=>{
res.render("products")
})

router.get("/", (req, res) => {
    res.render("chat");
});
export default router;