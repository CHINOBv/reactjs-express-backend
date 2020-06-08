const express = require('express');
const config = require("./server/config.js");
require("./db.js");

const app = config(express(),express);

app.listen(app.get('port'), () => {
  console.log("Server Its Runing On Port: "+ app.get('port'));
});