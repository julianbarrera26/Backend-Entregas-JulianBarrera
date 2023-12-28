import { Schema, model } from "mongoose";

const ticketCollection = 'tickets'

const ticketSchema = new  Schema({
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
})

export default model(ticketCollection, ticketSchema)