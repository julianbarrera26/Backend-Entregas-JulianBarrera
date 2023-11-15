import { Router } from "express";
import { productsManager } from "../dao/mongoDB/productsManagerMongo.js";

const router = Router();


router.get("/", async (req, res) => {
    const {limit, page, category, status, sort} = req.query;
    // const {category} = req.params;
    try {
        let product = await productsManager.findAll(page, limit, category, status, sort)
        // console.log('products.routes.js', product)
        const productExist = () => {
            if (Boolean(product.docs)) return 'success'
            else return 'error'
        }
        res.send({
            status: productExist(),
            payload: product.docs,
            totalDocs: product.totalDocs, 
            limit: product.limit, 
            totalPages: product.totalPages, 
            page: product.page, 
            pagingCounter: product.pagingCounter, 
            hasPrevPage: product.hasPrevPage,
            hasNextPage: product.hasNextPage,
            prevLink: product.prevPage,
            nextLink: product.nextPage
        })

    } catch (error) {
        res.status(500).send(error.message)
    }
});




router.get('/:id', async (req, res) => {
    try{
        const {id} = req.params
        const productById = await productsManager.getProductById(id)        
        res.status(200).json({ message: "Product found", productById });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }        
})




router.post("/", async (req, res) => {
    try {
        const createdProduct = await productsManager.createOne(req.body);
        res.status(200)
        .json({ message: "Product created", product: createdProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  });



router.delete("/:idProduct", async (req, res) => {
    const { idProduct } = req.params;
    try {
        await productsManager.deleteOne(idProduct);
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.put("/:idProduct", async (req, res) => {
    const { idProduct } = req.params;
    try {
        await productsManager.updateOne(idProduct, req.body);
        res.status(200).json({ message: "Product updated"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  });



export default router