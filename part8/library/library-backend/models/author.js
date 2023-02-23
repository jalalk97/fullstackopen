const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
const { model, Schema } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("Author", schema);
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
      autopopulate: true,
    },
  ],
});

schema.plugin(require("mongoose-unique-validator"));
schema.plugin(require("mongoose-autopopulate"));

module.exports = model("Author", schema);
