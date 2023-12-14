import mongoose from "mongoose";

const URI = "";

mongoose
.connect(URI)
.then(()=> console.log ("Conectado a DB"))
.catch((error)=> console.log (error));