const path = require("path");
const fs = require("fs-extra");
const { Image } = require("../models/");

const { randomNumber } = require("../helpers/libs.js");

const ctrl = {};

ctrl.Index = (req, res) => {};

ctrl.Create = async (req, res) => {
  /*

  1.-Create a Name Random
  2.-Get img Temp Path
  3.-Extract te Extension of Image
  4.-URL to copy the Image whit extension

  5.-Verify the extension
  6.-Save URL

  */

  const imgURL = randomNumber();
  const imgTempPath = req.file.path;
  const ext = path.extname(req.file.originalname).toLowerCase();
  const targetPath = path.resolve(`src/public/upload/${imgURL}${ext}`);

  const title = req.body.title;
  const description = req.body.description;

  if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif") {
    await fs.rename(imgTempPath, targetPath);
    const newImg = new Image({
      title,
      filename: imgURL + ext,
      description,
    });
    const imgSaved = await newImg.save();
    console.log(imgSaved);
  }

  res.send("LL");
};
ctrl.Like = (req, res) => {};
ctrl.Comment = (req, res) => {};

ctrl.Delete = (req, res) => {};

module.exports = ctrl;
