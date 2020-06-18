const path = require("path");
const fs = require("fs-extra");
const md5 = require('md5');

const { Image } = require("../models/");
const { Comment } = require('../models/')

const { randomNumber } = require("../helpers/libs.js");

const ctrl = {};

ctrl.Index = async(req, res) => {
  const id = req.params.image_id;
  const image = await Image.findById({_id: id});
  //console.log(image);
  res.json({image});
};

ctrl.Create = (req, res) => {
  const saveImage = async () => {
    /*

    1.-Create a Name Random
    |>1.5 Check the random number, if it is equal to the previous one, run
    2.-Get img Temp Path
    3.-Extract te Extension of Image
    4.-URL to copy the Image whit extension

    5.-Verify the extension
    |
    |->else remove files and return the Status code 500 (internalServer) and message
    6.-Save URL

    7.-Save into Schema of Mongoose
    8.-Svae into DB

    */

    const imgURL = randomNumber();
    const ext = path.extname(req.file.originalname).toLowerCase();

    const images = await Image.find({ filename: imgURL + ext });

    if (images.length > 0) {
      saveImage();
      return;
    }

    //console.log(req.file);
    const imgTempPath = req.file.path;

    const targetPath = path.resolve(`src/public/upload/${imgURL}${ext}`);

    const title = req.body.title;
    const description = req.body.description;

    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif") {
      await fs.rename(imgTempPath, targetPath);
      const newImg = new Image({
        title,
        filename: imgURL + ext,
        description,
        directory: path.join(`/public/upload/${imgURL}${ext}`)
      });
      newImg.id = newImg._id;
      const imgSaved = await newImg.save();

      res.json({ Message: "Image Uploaded" });
    } else {
      await fs.unlink(imgTempPath);
      res.json({ Error: "Only Images are Allowed" });
    }
  };
  saveImage();
};

ctrl.Like = (req, res) => {};
ctrl.Comment = async(req, res) => {
  const image = await Image.findById({_id: req.params.image_id});
  if(image){
    const newComment = await new Comment(req.body);
    newComment.gravatar = md5(newComment.email)
    newComment.image_id = image._id;

    await newComment.save();

    res.send("Comment Created");
  }


  res.send("Posted")
};

ctrl.Delete = async(req, res) => {
  const {directory} = req.body;
  const id = req.params.image_id;
  const reds = await Image.remove({_id:id});
  fs.unlink(directory);
  res.json({reds});
};

ctrl.Download = (req, res) => {
  res.download(path.join(__dirname, "../public/img/logo.png"), (error) =>
    console.error(error)
  );
};

ctrl.Download = (req, res) => {
  res.download(path.join(__dirname, "../public/img/logo.png"), (error) =>
    console.error(error)
  );
};
ctrl.Download = (req, res) => {
  res.download(path.join(__dirname, "../public/img/logo.png"), (error) =>
    console.error(error)
  );
};

ctrl.getImages = async(req, res) => {
 const images = await Image.find().sort({timestamp: -1});
 
 res.json({images})
}

module.exports = ctrl;