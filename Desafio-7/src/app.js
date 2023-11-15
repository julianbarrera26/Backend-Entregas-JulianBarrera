import express from "express";
import cookieParser from "cookie-parser";
import { __dirname } from "./utils.js";
import handlebars from 'express-handlebars';
import viewsRouter from "./routes/views.router.js";
import productsRouter from "../../Desafio-7/src/routes/products.router.js";
import cartsRouter from "../../Desafio-7/src/routes/cart.router.js";
import cookieRouter from "./routes/cookie.router.js";
import session from "express-session";
import sessionsRouter from "./routes/sessions.router.js";
import "./db/configDB.js"
import fileStore from "session-file-store";
const FileStore = fileStore(session);
import MongoStore from "connect-mongo";
import "./passport.js";
import passport from "passport";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("SecretCookie"));

//app.use(session({store: new FileStore ({ path: __dirname + "/sessions",}),
 //   secret: "secretSession",cookie: { maxAge: 60000 }, }) );
const URI = "mongodb+srv://julianbarrera26:G1fxY25230LPwfa0@cluster0.wp6vatq.mongodb.net/ecommerce?retryWrites=true&w=majority";
 app.use(
    session({
      store: new MongoStore({
        mongoUrl: URI,
      }),
      secret: "secretSession",
      cookie: { maxAge: 60000 },
    })
  );


//passport
app.use(passport.initialize());
app.use(passport.session());

// handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// routes
app.use("/", viewsRouter);
app.use("/api/cookie", cookieRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter );
app.use("/api/sessions", sessionsRouter)


app.listen(8080, () => {
    console.log("Escuchando al puerto 8080");
  });