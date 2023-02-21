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

schema.plugin(require("mongoose-unique-validator"));

module.exports = model("Author", schema);
