import express from "express";
import cookieParser from "cookie-parser";
import { __dirname } from "./utils.js";
import handlebars from 'express-handlebars';
import viewsRouter from "./routes/views.router.js";
import cookieRouter from "./routes/cookie.router.js";
import session from "express-session";
import fileStore from "session-file-store";
const FileStore = fileStore(session);
import MongoStore from "connect-mongo";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("SecretCookie"));

//app.use(session({store: new FileStore ({ path: __dirname + "/sessions",}),
 //   secret: "secretSession",cookie: { maxAge: 60000 }, }) );
const URI = "mongodb+srv://julianbarrera26:G1fxY25230LPwfa0@cluster0.wp6vatq.mongodb.net/session?retryWrites=true&w=majority";
 app.use(
    session({
      store: new MongoStore({
        mongoUrl: URI,
      }),
      secret: "secretSession",
      cookie: { maxAge: 60000 },
    })
  );


// handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// routes
app.use("/", viewsRouter);
app.use("/api/cookie", cookieRouter);


app.listen(8080, () => {
    console.log("Escuchando al puerto 8080");
  });