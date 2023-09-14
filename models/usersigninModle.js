const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersigninSchema = new Schema(
  {

    email: { type: String, require: true },
    password: { type: String, require: true },
  }
);

module.exports = mongoose.model("userSigninModel", usersigninSchema);