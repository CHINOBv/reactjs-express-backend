const dotenv = require("dotenv");
dotenv.config();
const URI = `${process.env.HOST_DB}/${process.env.NAME_DB}`;
//console.log(URI)
module.exports ={
  database: {
    URI:`mongodb://${URI}`
  }
}