const cors = require("cors");
const path = require("path");
const exphbs = require("express-handlebars");
module.exports = (app,express) => {

  //Settings
  app.set('port', process.env.PORT || 5000);
  app.set("views", path.join(__dirname,"views"));
  app.engine(".hbs", exphbs({
    defaultLayout: 'main',
    partialsDir: path.join(app.get('views'),'partials'),
    layoutsDir: path.join(app.get('views','layouts')),
    extname: '.hbs',
    helpers: require("./helpers.js")
  }))
  //middlewares

  app.use(cors());
  app.use(express.json())

  //Routes

  //Errors

  return app;
};
