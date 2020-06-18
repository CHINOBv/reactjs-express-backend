const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { ObjectId } = Schema;
const path = require('path');

const CommentSchema = new Schema({
  image_id: ObjectId,
  gravatar: String,
  name: String,
  email: String,
  comment: String,
  timestamp: {type: Date, default: Date.now()}
});

module.exports = model('Comment', CommentSchema);