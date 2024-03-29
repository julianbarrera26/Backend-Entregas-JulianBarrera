import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({  
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    unique: true, 
  },
  age: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  cart:{
    type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Carts"}],
    default : [],
  },
  role: {
    type: String,
    enum: ["admin", "user", "premium"],
    default: "user",
  },
});

export const usersModel = mongoose.model("Users", usersSchema);