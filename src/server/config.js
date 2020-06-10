const cors = require("cors");
const path = require("path");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const multer = require("multer");
const express = require("express");
const routes = require("../routes/index.routes.js");
const errorHandler = require("errorhandler");
const dotenv = require('dotenv');
dotenv.config();

module.exports = (app) => {
  //Settings
  app.set("port", process.env.PORT || 5000);
  app.set("views", path.join(__dirname, "../views"));
  app.engine(
    ".hbs",
    exphbs({
      defaultLayout: "main",
      partialsDir: path.join(app.get("views"), "partials"),
      layoutsDir: path.join(app.get("views"), "layouts"),
      extname: ".hbs",
      helpers: require("./helpers.js"),
    })
  );
  app.set("view engine", ".hbs");

  //middlewares

  const corsOptions = {
    origin: process.env.CORS_HOST,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(
    multer({ dest: path.join(__dirname, "../public/upload/temp") }).single(
      "image"
    )
  );
  app.use(express.urlencoded( {extended: false} ));

  //Routes
  routes(app);

  //Static Files
  app.use('/public', express.static(path.join(__dirname,'../public')))

  //Errors
  if('dev' === app.get('env')){
    app.use(errorHandler)
  }

  return app;
};
