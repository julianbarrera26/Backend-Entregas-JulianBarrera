import {cartsModel} from "../../db/models/carts.model.js"
class CartsManager {

    async createCart() {
        const newCart = { products: [] };
        const response = await cartsModel.create(newCart);
        return response;
      }
    async getCarts () {
        try {
            const carts = await cartsModel.find();
            return carts;
        } catch (err) {
            console.error('Error al obtener los carritos:', err.message);
            return [];
        }
    };


    async getCartById(cid){
       
        try {
            const cart = await cartsModel.findById(cid)

            return cart;
        } catch (err) {
            console.error('Error al obtener el carrito por ID:', err.message);
            return err;
        }
    };

    async addCart  (products) {
        try {
            let cartData = {};
            if (products && products.length > 0) {
                cartData.products = products;
            }
    
            const cart = await cartsModel.create(cartData);
            return cart;
        } catch (err) {
            console.error('Error al crear el carrito:', err.message);
            return err;
        }
    };


    async addProductInCart(cid,pid) {
        const cart = await cartsModel.findById(cid);
    
        const productIndex = cart.products.findIndex((p) =>
          p.products.equals(pid)
        );
    
        if (productIndex === -1) {
          cart.products.push({ product: pid, quantity: 1 });
        } else {
          cart.products[productIndex].quantity++;
        }
        return cart.save();
      }
    
        async deleteProductInCart  (cid, products) {
            try {
                return await cartsModel.findOneAndUpdate(
                    { _id: cid },
                    { products },
                    { new: true })
    
            } catch (err) {
                return err
            }
        }
            
        async updateOneProduct  (cid, products) {
        
            const cart = await cartsModel.updateOne(
                { _id: cid },
                {products});
            await cartsModel.findOne({ _id: cid });
            return cart.save();
        }
    
    }
    

export const cartManager = new CartsManager();