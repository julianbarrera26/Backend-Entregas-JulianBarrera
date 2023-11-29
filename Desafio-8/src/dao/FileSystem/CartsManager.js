import fs from 'fs';
import {manager} from './ProductManager.js';

class CartManager { 
    constructor(path) {
        if (fs.existsSync(path)) {
            this.path = path;
        } else {
            console.log(`El archivo ${path} no existe.`);
        }
    }
   
    async getCarts() {
        try {
        
            if (fs.existsSync(this.path)){
                const cartsFile= await fs.promises.readFile(this.path, 'utf-8');
                const cartData = JSON.parse(cartsFile);
                return  cartData;

            }else {
                return []
            }
        }
        catch (error) {
            return error
        }
    }

    //validateCode(code){
     //   return this.Cart.find(Cart => Cart.code === code )
    //}
    async addProductToCart (idCart,idProduct){
        const cart = await this.getCartById (idCart)
        if (!cart){
            throw new Error ('there is no cart with this id')
        }
        const product = await manager.getProductById (idProduct) 
        if (!product) {
            throw new Error ('there is no product with this id')
        }
        const productIndex = cart.products.findIndex(p=>p.id === idProduct)
        if (productIndex === -1) {
            const newProduct = {id:idProduct,quantify:1}
            cart.products.push(newProduct);
        } else{
            cart.products[productIndex].quantify++;
        }
    }



    async getCartById(id) {
        try {
            
            const carts = await this.getCarts()

            
            const cartSearched = carts.find((p) => p.id === id);            
            if (cartSearched) {                
                return  cartSearched

            }else {                
                return 'Cart not found'                
            }   
        }
        catch (error) {
            return error
        }
    }    
    
    async createCart() {
        try{
            const carts = await this.getCarts()
            let id
            if(!carts.length){
                id = 1;
            }else{
                id = carts [carts.length-1].id + 1;
            }
            const newCart = {id, products: [] };
            carts.push ({newCart});
            await fs.promises.writeFile(this.path,JSON.stringify(cartsarts));
        }catch(error){
            return error
        }
    }

}
//const product1={title: 'iPhone',
//description: 'Un teléfono iPhone',
//price: 2500,
//thumbmail: 'imagen',
//code: 'code-01',
//stock: 10,};

//async function test ( ) {
//    const cartsManager = new CartManager ("carts.json");
   // await cartsManager.createCart(product1);
//}

//test();


export const cartsManager = new CartManager();