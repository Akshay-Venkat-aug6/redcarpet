var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phoneno:{
      type: Number,
      maxlength: 10
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    role:{
      type: String,
      required: true,
      enum: ['customer', 'agent']
    },
    token: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

var User = mongoose.model("user", userSchema);

module.exports = User;
