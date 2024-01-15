import  express  from "express";
import cookieParser from "cookie-parser";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import cookieRouter from "./routes/cookie.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import usersRouter from "./routes/users.router.js"
import session from "express-session";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js";
import { errorMiddleware } from "./middleware/errors.middleware.js";
import {manager} from "./DAL/dao/products.dao.js"
import MongoStore from 'connect-mongo'
import passport from "passport";
import config from "./config.js"
const URI = config.mongo_uri
const PORT = config.port

//DB
import "./config/configDB.js";
import "./passport.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
//cookies
app.use(cookieParser("SecretCookie"));



// sessions
/* const URI = "mongodb+srv://julianbarrera26:G1fxY25230LPwfa0@cluster0.wp6vatq.mongodb.net/ecommerce?retryWrites=true&w=majority";*/ 
app.use(
  session({
   store: new MongoStore({
      mongoUrl: config.mongo_uri,
    }),
    secret: "secretSession",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
  );


//passport
/* app.use(flash()); */
app.use(passport.initialize());
app.use(passport.session());




// handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// routes
app.use("/", viewsRouter);
app.use("/api/cookie", cookieRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartsRouter);
app.use("/api/users", usersRouter)

app.use(errorMiddleware);







app.listen(PORT, () => {
  console.log("Escuchando al puerto 8080");
});

app.get('/home', async (req, res) => {
  res.status(200).render('home', { products: products })
})

app.get('/products', async (req, res) => {
  res.status(200).render('products', { stylesheet: 'products' })
})

app.get('/carts/:cid', async (req, res) => {
  res.status(200).render('carts', { stylesheet: 'carts' })
})

app.get('/realtimeproducts', async (req, res) => {
  const products = await manager.getProducts()
  res.status(200).render('realtimeproducts', { products: products })
})