import {existsSync, promises} from 'fs';


class ProductManager { 
    constructor(path) {
        if (path) {
            this.path = path;
        } else {
            console.log(`El archivo ${path} no existe.`);
        }
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
            const {title,description,price,thumbmail, code, stock} = product 
            if (!title || !description || !price || !thumbmail || !stock || !code) {
                console.log("Agregar todos los campos")
                return
            }

            
            const products = await this.getProducts()

            
            let id 
            if(!products.length){
                id = 1
            } else {
                id = products[products.length-1].id + 1
            }
            

            const isCodeAlreadyAdded = products.some((prod)=> prod.code === code)
            if (isCodeAlreadyAdded) {
                console.log("El codigo del producto ya existe ")
                return
            }

            
            const newProduct = {id, ...product}

            products.push(newProduct)


            await fs.promises.writeFile(this.path, JSON.stringify(products))
            console.log('Producto añadido')
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
    
    async createProduct(product) {
        try{
            const products = await this.getProducts({})
            let id
            if(!products.length){
                id = 1;
            }else{
                id = products [products.length-1].id + 1;
            }
            const newProduct = {id, ...product, status: true};
            products.push ({newProduct});
            await fs.promises.writeFile(this.path,JSON.stringify(products));
        }catch(error){
            return error
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
        const products = await this.getProducts();
    

        const index = products.findIndex((product) => product.id === id);
    
        if (index === -1) {
            return 'Product no existe';
        }
    
        
        products[index] = { ...products[index], ...updatedProduct };
    
        
        await fs.promises.writeFile(this.path, JSON.stringify(products));
    
        
        return products[index];
        } catch (error) {
            return error;
        }
    }
    
    
    async deleteProduct(id) {
        try {
        const products = await this.getProducts();
    
    
        const updatedProducts = products.filter((product) => product.id !== id);
    
        if (products.length === updatedProducts.length) {
            
            return 'Producto eliminado';
        }
    
        
        await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts));
    
    
        return 'Producto eliminado';
        } catch (error) {
        return error;
        }
    }     


}
    const product1={title: 'iPhone',
    description: 'Un teléfono iPhone',
    price: 2500,
    thumbmail: 'imagen',
    code: 'code-01',
    stock: 10,};

    const product2={
        title: 'Samsung',
        description: 'Un teléfono Samsung',
        price: 2500,
        thumbmail: 'imagen',
        code: 'code-02',
        stock: 10,

    };



async function test() {

        const manager = new ProductManager("products.json");
        //await manager.createProduct(product1);
        //await manager.createProduct(product2);

 }
    //    await productManager.createProduct({
    //        title: 'iPhone',
     //       description: 'Un teléfono iPhone',
      //      price: 2500,
     //       thumbnail: 'imagen',
      //      code: 'code-01',
      //      stock: 10,
     //   });
        
      //  await productManager.createProduct({
      //      title: 'Samsung',
      //      description: 'Un teléfono Samsung',
      //      price: 2500,
       //     thumbnail: 'imagen',
      //      code: 'code-02',
      //      stock: 10,
       // });
        
       // console.log(await productManager.getProductById(1));
       // }
        
       //test();
        
        
        
        //await productManager.updateProduct(1, {
            //title: '',
           // price: ,
          //});
          
          // Eliminar un producto por ID
          //await productManager.deleteProduct(2);
          export const manager = new ProductManager("./data/myprods.json");  
        
        