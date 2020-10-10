var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var adminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    token: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

var Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
