import { Schema, model } from "mongoose";



const ticketSchema = new mongoose.Schema({
    code: {
        type: String
    },
    purchase_datetime: {
        type:  Date,
    },
    amount:{
        type: Number,
        required: true
    },
    purchaser:{
        type: String,
        required: true
    }
});

export const ticketsModel = mongoose.model("ticket", ticketSchema);
