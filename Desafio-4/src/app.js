import express from 'express';
import cartsRouter from './routes/carts.router.js';
import productRouter from'./routes/products.router.js';
import { __dirname } from './utils.js';
import {engine} from 'express-handlebars';
import { Server } from 'socket.io';
import viewRouter from './routes/views.router.js'
import {manager} from './ProductManager.js'



const app = express();
const port = 8070;

app.use (express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine('handlebars', engine());
app.set('view engine','handlebars');
app.set ('views', __dirname +"/views");

app.use("/api/products", productRouter);
app.use("/api/cart", cartsRouter );
app.use("/api/views", viewRouter )

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  const productosOld = await manager.getProducts();

  socket.emit("productsInitial", productosOld);

  socket.on("addProduct", async (product) => {
    const producto = await manager.addProduct(product);

    const productosActualizados = await manager.getProducts();

    socket.emit("productUpdate", productosActualizados);

    console.log(product);
  });

  socket.on("deleteProduct", async (productId) => {
    const productosOld = await manager.getProducts();

    const producto = await manager.deleteProductById(+productId);

    const productosActualizados = await manager.getProducts();

    socket.emit("updateProduct", productosActualizados);

    
  });


});



