import express from 'express';
import { __dirname } from './utils.js';
import {engine} from 'express-handlebars';
import {Server} from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import { messagesManager } from "./dao/mongoDB/messajeManagerMongo.js";



//DB
import "./db/configDB.js";

const app = express();
const port = 8081;

app.use (express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine('handlebars', engine());
app.set('view engine','handlebars');
app.set ('views', __dirname +"/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter );
app.use("/", viewsRouter )

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);
  socket.on("newUser", (user) => {
    socket.broadcast.emit("userConnected", user);
    socket.emit("connected");
  });
  socket.on("message", async(infoMessage) => {
    await messagesManager.createOne(infoMessage);
    const allMessages = await messagesManager.findAll()
    socketServer.emit("chat", allMessages);
  });
});