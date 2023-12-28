import { cManager } from "../DAL/dao/carts.dao.js"


export const createNewCart = () => {
    const carts = cManager.createCart();
    return carts;
};

export const findCartById = (id) => {
    const cart = cManager.getCartProducts(id);
    return cart;
};


export const addProduct = (cid,pid) => {
    const prod = cManager.addProductToCart(cid,pid);
    return prod;
};

export const deleteOneFromCart = (cid,pid) => {
    const cart = cManager.deleteProduct(cid,pid);
    return cart;
};


export const updateAllProducts = (cid, arr) => {
    const prods = cManager.updateAllProducts(cid, arr);
    return prods;
};

export const updateQuantity = (cid, pid, quantity) => {
    const prod = cManager.updateProductQuantity(cid, pid, quantity);
    return prod;
};

export const deleteAllProductsInCart = (cid) => {
    const cart = cManager.deleteAllProducts(cid);
    return cart;
};

export const purchase = async (idCart) => {
    // suficiente stock => restarlo del stock *
    // stock insuficiente => no agregar el prod a la compra final
    // generar un ticket
    // devolver arreglo prod si compra no exitosa
    // carrito debe tener al final solo productos que no se compraron
    const cart = await cartsDao.getCart(idCart);
    const products = cart.products;
    let availableProducts = [];
    let unavailableProducts = [];
    let totalAmount = 0;
    for (let item of products) {
      if (item.product.stock >= item.quantity) {
        // disponible
        availableProducts.push(item);
        item.product.stock -= item.quantity;
        await item.product.save();
        totalAmount += item.quantity * item.product.price;
      } else {
        //no disponible
        unavailableProducts.push(item);
      }
    }
  
    cart.products = unavailableProducts;
    await cart.save();
    if (availableProducts.length) {
      const ticket = {
        code: uuidv4(),
        purchase_datetime: new Date(),
        amount: totalAmount,
        purchaser: "julianbarrera26@gmail.com",
      };
      await ticketsDao.createTicket(ticket);
      return { availableProducts, totalAmount };
    }
    return { unavailableProducts };
  };