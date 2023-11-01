import mongoose from "mongoose";

const cartCollection = 'carts';

const cartsSchema = new mongoose.Schema({

    products: {
        type:[
            {
                products:{
                    type: mongoose.Types.ObjectId,
                    ref: 'products'
                },
                quantity:{
                    type: Number,
                    _id: false,
                }
                    
            }
        ],
        default:[]
    }
});




export const cartsModel = mongoose.model(cartCollection, cartsSchema);