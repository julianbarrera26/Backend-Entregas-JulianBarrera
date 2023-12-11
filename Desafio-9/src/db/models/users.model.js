import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  first_name:{
    type: String,
    required: true
},
last_name:{
    type: String,
    required: true
},
age:{
    type: Number,
    required: false
},
roll:{
    type: String,
    required: true,
    default: "USER",
},
email:{
    type: String,
    required: false,
    unique: true
},
password:{
    type: String,
    required: true
}
})

export const usersModel = mongoose.model("Users", usersSchema);