import mongoose from "mongoose";
import config from "../config.js"
const URI = config.mongo_uri
/*const URI = "mongodb+srv://julianbarrera26:G1fxY25230LPwfa0@cluster0.wp6vatq.mongodb.net/ecommerce?retryWrites=true&w=majority";*/

mongoose
.connect(URI)
.then(()=> console.log ("Conectado a DB"))
.catch((error)=> console.log (error));