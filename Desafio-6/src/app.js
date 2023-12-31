import express from "express";
import cookieParser from "cookie-parser";
import { __dirname } from "./utils.js";
import handlebars from 'express-handlebars';
import viewsRouter from "./routes/views.router.js";
import cookieRouter from "./routes/cookie.router.js";
import session from "express-session";
import sessionsRouter from "./routes/sessions.router.js";
import "./db/configDB.js"
import fileStore from "session-file-store";
const FileStore = fileStore(session);
import MongoStore from "connect-mongo";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser("SecretCookie"));

//app.use(session({store: new FileStore ({ path: __dirname + "/sessions",}),
 //   secret: "secretSession",cookie: { maxAge: 60000 }, }) );
const URI = "";
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
app.use("/api/sessions", sessionsRouter);


app.listen(8080, () => {
    console.log("Escuchando al puerto 8080");
  });