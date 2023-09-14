const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    _id: { type: String, require: true },
    name: { type: String, require: true },
    image: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("categoryModel", categorySchema);