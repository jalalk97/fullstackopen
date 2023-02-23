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
