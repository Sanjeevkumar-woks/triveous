const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const oredrsSchema = new Schema(
  {
    _id: { type: String, require: true },
    email: { type: String, require: true },
    products: { type: Array, require: true },
    total: { type: Number, require: true },
  },  { timestamps: true }
);

module.exports = mongoose.model("ordersModel", oredrsSchema);