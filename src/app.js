const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
// const MongoStore = require("connect-mongo");
require("./db/mongoose");

// const userRouter = require("./routers/user");
const linksRouter = require("./routers/links");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// app.use(userRouter);
app.use(linksRouter);

const port = process.env.PORT;

app.get("*", (req, res) => {
  res.status(404).send({ message: "Page Not Found" });
});
app.listen(port, () => {
  console.log(`Server Up and runing on Port: ${port}`);
});
