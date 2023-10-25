import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({  
    products: [{
        pid: {
            type: Number,
            required: true,        
        },
    quantity: {
        type: Number  
    }      
    }]
});

export const cartsModel = mongoose.model("Carts", cartsSchema);