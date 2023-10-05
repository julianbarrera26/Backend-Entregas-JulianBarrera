import { Router } from "express";
import {manager} from "../ProductManager.js";

const router = Router();
router.get("/", async (req, res) => {
    let products = await manager.getProducts(req.query);
  
    res.render("home", {
      products: products,
    });
  });
  
  router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts");
});

export default router;