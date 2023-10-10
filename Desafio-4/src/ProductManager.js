import { existsSync, promises } from "fs";


class ProductManager { 
    constructor() {
        this.path = "products.json";
      }
   
    async getProducts() {
        
        try {
        
            if (existsSync(this.path)){
                const productsFile= await promises.readFile(this.path, 'utf-8');
                const productData = JSON.parse(productsFile);
                return productData

            }else {
                return []
            }
        }
        catch (error) {
            return error
        }
    }

    //validateCode(code){
     //   return this.product.find(product => product.code === code )
    //}
    async addProduct (product){
        try {

            const products = await this.getProducts()
            const {title,description,status,price,thumbmail, code, stock, category} = product 
            if (!title || !description || !status|| !price || !code|| !stock || !category) {
                console.log("Agregar todos los campos")
                return
            }

            

            
            let id ;
            if(!products.length){
                id = 1
            } else {
                id = products[products.length-1].id + 1;
            }
            
            const isCodeAlreadyAdded = products.some((prod)=> prod.code === code)
            if (isCodeAlreadyAdded) {
                console.log("Warning! The product code already exists")
                return
            }
            
            const newProduct = {id, ...product, status: true}

            products.push(newProduct)


            await promises.writeFile(this.path, JSON.stringify(products))
            console.log('Producto añadido')
            return newProduct
        }
        catch (error) {
            console.log(error)
            return error
        }
    }



    async getProductById(id) {
        try {
            
            const products = await this.getProducts()

            
            const productSearched = products.find((p) => p.id === id);            
            if (productSearched) {                
                return productSearched

            }else {                
                return 'Product not found'                
            }   
        }
        catch (error) {
            return error
        }
    }    
    
   
    async updateProduct(id, obj) {
        try {            
           
            const products = await this.getProducts()            

            
            const prodIndex = products.findIndex(p=> p.id == id)
            
            
            if (prodIndex !== -1) {
                const updatedProduct = {...products[prodIndex], ...obj}
                products.splice(prodIndex, 1, updatedProduct) 
                   
                       
                await promises.writeFile(this.path, JSON.stringify(products))
                return updatedProduct
            }            
            }
        catch (error) {
            return error
        }
    }

    
    
    async deleteProduct(id) {
        try {
            
            const products = await this.getProducts()

            
            const idExists = products.find(p=> p.id === id)  

            
           
            if (idExists){
                const newArrayProducts = products.filter(p=> p.id !== id)
                await promises.writeFile(this.path, JSON.stringify(newArrayProducts))
                return idExists            
            }             
            }
        catch (error) {
            return error
        }
    }


}

          export const manager = new ProductManager("../products.json");  
        
        