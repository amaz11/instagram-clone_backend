//Require Packeage
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
require("jsonwebtoken");
require("dotenv").config();
const app = express();

//Router
const authentication = require("./router/authentication");
const postRoute = require("./router/postRoute");

// Database
require("./db/db");

//Middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
    allowedHeaders: "Content-Type, Accept",
  })
);

//API
app.use("/", authentication);
app.use("/post-api", postRoute);
app.use(require("./router/userRoute"));

// Port
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`http://localhost:9000/`);
});
