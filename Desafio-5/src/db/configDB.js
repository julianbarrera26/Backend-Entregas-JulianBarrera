import mongoose from "mongoose";

const URI = "mongodb+srv://julianbarrera26:G1fxY25230LPwfa0@cluster0.wp6vatq.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => console.log("Conectado a la DB"))
  .catch((error) => console.log(error));