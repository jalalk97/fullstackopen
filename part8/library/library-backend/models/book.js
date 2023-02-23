const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
const { model, Schema } = require("mongoose");

const schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    type: Schema.Types.ObjectId,
    ref: "Author",
    autopopulate: true,
  },
  genres: [{ type: String }],
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("Book", schema);
schema.plugin(require("mongoose-unique-validator"));
schema.plugin(require("mongoose-autopopulate"));

module.exports = model("Book", schema);
