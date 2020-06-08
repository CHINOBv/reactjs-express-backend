const mongoose = require("mongoose");
const { database } = require("./keys.js");

mongoose.set('useUnifiedTopology', true);

mongoose.connect( database.URI, {
  useNewUrlParser: true
})
  .then((DB) => console.log("DB Is Connected"))
  .catch(error => console.error(error))