const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    _id: { type: String, require: true },
    category_id: { type: String, require: true },
    title: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: Number, require: true },
    description: { type: String, require: true },
    in_stock: { type: String, require: true },
  }
);

module.exports = mongoose.model("productsModel", productsSchema);