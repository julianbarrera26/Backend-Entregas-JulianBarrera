import { Router } from "express";
import {manager} from "../ProductManager.js";

const router = Router ();

router.get('/', async(req, res) => {
    try {
      const products = await manager.getProduct(req.query);
      if (!products.length){
        return res.status(200).json({ message: "no product" });
      }
      res.status(200).json({ message: "Product found", products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  router.get("/:idProduct", async (req, res) => {
    const { idProduct } = req.params;
    try {
      const product = await manager.getProductById(+idProduct);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "User found", product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.post("/", async (req, res) => {
    const { title, descripcion, precio } = req.body;
    if (!title || !descripcion || !precio) {
      return res.status(400).json({ message: "Some data is missing" });
    }
    try {
      const response = await manager.createProduct(req.body);
      res.status(200).json({ message: "Product created", product: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.delete("/:idProduct", async (req, res) => {
    const { idProduct } = req.params;
    try {
      const response = await manager.deleteProduct(+idProduct);
      if (!response) {
        return res
          .status(404)
          .json({ message: " no product found with that id" });
      }
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.put("/:idProduct", async (req, res) => {
    const { idProduct } = req.params;
    try {
      const response = await manager.updateProduct(+idProduct, req.body);
      if (!response) {
        return res
          .status(404)
          .json({ message: "Product not found with the id provided" });
      }
      res.status(200).json({ message: "Product updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  export default router;