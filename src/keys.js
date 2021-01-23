const dotenv = require("dotenv");
dotenv.config();
const URI = `${process.env.HOST_DB}`;
//console.log(URI)
module.exports ={
  database: {
    URI:`${URI}`
  }
}
