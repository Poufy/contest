//Import dependencies
const express = require("express");
const app = express();
const morgan = require("morgan");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
const mongoose = require("mongoose");
const mongoUrl = require("./config");
//Importing routes
const teamRoute = require("./api/routes/team");
// const landingPageRoute = require("./api/routes/landingPage")

//Establishing a connection with the mongodb server.
mongoose.connect(mongoUrl.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on("open", open => {
  console.log("Connected to mongo server.");
});

//funnel all requests through morgan for logging on the console.
app.use(morgan("dev"));

//Retaining sessions.
app.use(cookieParser("secret"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

//This is like body-parser.urlencoded which allows us to extract data from requests as they come
//like name = req.body.name
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

//To prevent CORS errors
//We need to append headers before the response is sent back to the client
//These headers tell the browser that we allow a client has a different origin from our server to get the response.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  //* here means every origin is allowed, You can restrict this to specific ips like 'http:/website.com
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  //The options request which is an HTTP method is always sent first and once by the browser
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

//Any request to the http server will direct us to the Action folder first hence in action.js our get path is only /
app.get("/", function(req, res) {
  res.render("index", { expressFlash: req.flash("nameError") });
});
app.get("/success", function(req, res) {
  res.render("success");
});
app.get("/404", function(req, res) {
  res.render("404");
});
app.use("/api/teams", teamRoute);

//if you reach this line that means no router in products or orders was able to handle the request therefore we catch an error here
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  //forward the error
  next(error);
});

//So now this line handles error thrown by the previous block or any request that reaches this line.
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("404");
});
module.exports = app;
