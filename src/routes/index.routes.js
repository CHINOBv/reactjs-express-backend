const express = require("express");
const router = express.Router();

const home = require("../controllers/home.js");
const image = require('../controllers/image.js');

module.exports = app =>{

  router.get('/', home.Index);
  router.get('/images/:image_id', image.Index);
  router.post('/images', image.Create);
  router.post('/images/:image_id/like', image.Like);
  router.post('/images/:image_id/comment', image.Comment);
  router.delete('/images/:image_id/delete', image.Delete);
  router.get('/image/download', image.Download);
  router.get('/images', image.getImages);

  app.use(router);
};