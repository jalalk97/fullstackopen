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
    type: Schema.Types.ObjectId,
    ref: "Author",
    autopopulate: true,
  },
  genres: [{ type: String }],
});

schema.plugin(require("mongoose-unique-validator"));
schema.plugin(require("mongoose-autopopulate"));

module.exports = model("Book", schema);
